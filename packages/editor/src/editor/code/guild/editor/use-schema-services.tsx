import React, { useEffect, useRef, useState } from "react";
import type * as monaco from "monaco-editor";
import {
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  EditorAction,
  HoverSource,
  validationMerge,
} from "./utils";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { emptyLocation, locToRange } from "./utils";
import { GraphQLEditorWorker } from "graphql-editor-worker";
import { monacoSetDecorations } from "@/editor/code/monaco/decorations";
import { useTheme, useTreesState } from "@/state/containers";
import { findCurrentNodeName } from "@/editor/code/guild/editor/onCursor";
import { Maybe } from "graphql-language-service";
import { PassedSchema } from "@/Models";
import { EditorError } from "graphql-editor-worker/lib/validation";

export type SchemaEditorApi = {
  jumpToType(typeName: string): void;
  deselect(): void;
  jumpToError(rowNumber: number): void;
  editor?: monaco.editor.IStandaloneCodeEditor;
};

export type SchemaServicesOptions = {
  schema?: PassedSchema;
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  onContentChange?: (v: monaco.editor.IModelContentChangedEvent) => void;
  actions?: EditorAction[];
  select?: (
    name?:
      | Maybe<string>
      | Maybe<{ operation: "Query" | "Mutation" | "Subscription" }>
  ) => void;
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService
  ) => void;
  sharedLanguageService?: EnrichedLanguageService;
  keyboardShortcuts?: (
    editorInstance: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco
  ) => monaco.editor.IActionDescriptor[];
};

const cursorIndex = {
  index: -1,
};

export const useSchemaServices = (options: SchemaServicesOptions) => {
  const [editorRef, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [internalCodeErrors, setInternalCodeErrors] = useState<EditorError[]>(
    []
  );
  const [decorationIds, setDecorationIds] = useState<string[]>([]);
  const [monacoRef, setMonaco] = useState<typeof monaco | null>(null);
  const { tree, selectedNodeId } = useTreesState();
  const isExternal = useRef(false);
  const { theme } = useTheme();
  // move to worker
  const languageService = React.useMemo(() => {
    return (
      options.sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: options.schema?.code
          ? options.schema.libraries
            ? validationMerge(options.schema.code, options.schema.libraries)
            : options.schema.code
          : undefined,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      })
    );
  }, [options.schema?.libraries, options.schema?.code]);

  const selectNodeUnderCursor = async <
    T extends { lineNumber: number; column: number }
  >(
    model: monaco.editor.ITextModel,
    e: T,
    currentSelectedNode?: string
  ) => {
    // move to worker
    languageService
      .buildBridgeForProviders(model, e)
      .then((bridge) => {
        if (bridge && options.select) {
          const {
            token: { state },
          } = bridge;
          const n = findCurrentNodeName(state);
          if (n !== currentSelectedNode) {
            options.select(n);
          }
        }
      })
      .catch(() => {
        //noop
      });
  };

  useEffect(() => {
    if (tree.schema) {
      const model = editorRef?.getModel();
      if (model) {
        const p = model?.getPositionAt(cursorIndex.index);
        selectNodeUnderCursor(model, p, selectedNodeId?.value?.name);
      }
    }
  }, [tree]);

  useEffect(() => {
    if (options.schema?.source !== "code") {
      const model = editorRef?.getModel();
      model?.setValue(options.schema?.code || "");
    }
  }, [options.schema]);

  useEffect(() => {
    if (monacoRef && editorRef) {
      if (options.keyboardShortcuts) {
        for (const action of options.keyboardShortcuts(editorRef, monacoRef)) {
          editorRef.addAction(action);
        }
      }
      for (const action of options.actions || []) {
        editorRef.addAction({
          id: action.id,
          label: action.label,
          keybindings: action.keybindings,
          contextMenuGroupId: action.contextMenuGroupId || "navigation",
          contextMenuOrder: action.contextMenuOrder,
          run: async (editor) => {
            const model = editor.getModel();
            const position = editor.getPosition();

            if (model && position) {
              const bridge = await languageService
                .buildBridgeForProviders(model, position)
                .catch(() => {
                  //noop
                });

              if (bridge) {
                action.onRun({ editor: editorRef, monaco: monacoRef, bridge });
              }
            }
          },
        });
      }

      const handler = languageService.getModelChangeHandler(
        options.schema?.libraries
      );
      handler(
        editorRef,
        monacoRef,
        options.diagnosticsProviders || [],
        options.decorationsProviders || []
      );

      const onSelectCursor = (
        e: monaco.editor.ICursorSelectionChangedEvent
      ) => {
        if (e.source === "api") return false;
        if (e.selection.startLineNumber !== e.selection.endLineNumber) return;
        if (e.selection.startColumn !== e.selection.endColumn) return;
        if (e.reason === 3) {
          cursorIndex.index =
            editorRef.getModel()?.getOffsetAt({
              column: e.selection.startColumn,
              lineNumber: e.selection.startLineNumber,
            }) || -1;
        }
        if (e.reason === 0) return;
        if (!options.select) return;
        const model = editorRef.getModel();
        if (model) {
          // move to worker
          selectNodeUnderCursor(
            model,
            {
              column: e.selection.startColumn,
              lineNumber: e.selection.startLineNumber,
            },
            selectedNodeId?.value?.name
          );
        }
      };
      const cursorSelectionDisposable =
        editorRef.onDidChangeCursorSelection(onSelectCursor);

      const definitionProviderDisposable =
        monacoRef.languages.registerDefinitionProvider(
          "graphql",
          languageService.getDefinitionProvider(
            options.definitionProviders || []
          )
        );

      const hoverDisposable = monacoRef.languages.registerHoverProvider(
        "graphql",
        languageService.getHoverProvider(options.hoverProviders || [])
      );

      const liveDisposable = editorRef.onDidChangeModelContent((e) => {
        if (isExternal.current === false) {
          options.onContentChange?.(e);
        } else {
          isExternal.current = false;
        }
      });

      return () => {
        hoverDisposable && hoverDisposable.dispose();
        definitionProviderDisposable && definitionProviderDisposable.dispose();
        cursorSelectionDisposable && cursorSelectionDisposable.dispose();
        liveDisposable && liveDisposable.dispose();
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [
    editorRef,
    monacoRef,
    options.keyboardShortcuts,
    options.actions,
    options.diagnosticsProviders,
    options.decorationsProviders,
    options.definitionProviders,
    options.hoverProviders,
    options.select,
    options.schema,
    selectedNodeId?.value?.id,
  ]);

  const receive = (e: monaco.editor.IModelContentChangedEvent) => {
    isExternal.current = true;
    editorRef?.getModel()?.applyEdits(e.changes);
  };

  useEffect(() => {
    if (internalCodeErrors && editorRef && monacoRef) {
      setDecorationIds(
        monacoSetDecorations(theme)({
          codeErrors: internalCodeErrors,
          decorationIds,
          m: monacoRef,
          monacoGql: editorRef,
        })
      );
    }
  }, [editorRef, monacoRef, internalCodeErrors]);

  return {
    receive,
    codeErrors: internalCodeErrors,
    setEditor,
    setMonaco,
    editorRef,
    monacoRef,
    languageService,
    setSchema: (newValue: string) => {
      const fullSchema = options.schema?.libraries
        ? validationMerge(newValue, options.schema?.libraries)
        : newValue;
      return languageService.trySchema(fullSchema);
    },
    onValidate: () => {
      const currentValue = editorRef?.getModel()?.getValue();
      if (currentValue) {
        GraphQLEditorWorker.validate(
          currentValue,
          options.schema?.libraries
        ).then((errors) => {
          setInternalCodeErrors(errors);
        });
      }
    },
    editorApi: {
      jumpToType: async (typeName: string) => {
        try {
          const schema =
            languageService.schema || (await languageService.getSchema());
          if (schema) {
            const type = schema.getType(typeName);
            if (type?.astNode?.loc) {
              const range = locToRange(type.astNode.loc);
              editorRef?.revealPositionInCenter(
                { column: 0, lineNumber: range.startLineNumber },
                0
              );
            }
          }
        } catch (error) {
          //noop
        }
      },
      deselect: () => {
        editorRef?.setSelection(emptyLocation);
      },
      jumpToError: (lineNumber: number) => {
        editorRef?.setSelection({
          startLineNumber: lineNumber,
          endLineNumber: lineNumber,
          endColumn: 1000,
          startColumn: 0,
        });
        editorRef?.revealPositionInCenter(
          {
            column: 0,
            lineNumber: lineNumber,
          },
          0
        );
      },
    } as SchemaEditorApi,
  };
};
