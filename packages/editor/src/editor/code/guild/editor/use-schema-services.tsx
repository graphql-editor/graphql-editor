import React, { useRef } from 'react';
import type * as monaco from 'monaco-editor';
import {
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  EditorAction,
  HoverSource,
} from './utils';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import {
  GraphQLError,
  GraphQLSchema,
  isInterfaceType,
  isObjectType,
} from 'graphql';
import { emptyLocation, locToRange } from './utils';
import { GraphQLEditorWorker } from 'graphql-editor-worker';
import { EditorError } from '@/validation';
import { monacoSetDecorations } from '@/editor/code/monaco/decorations';
import { useTheme, useTreesState } from '@/state/containers';
import { findCurrentNodeName } from '@/editor/code/guild/editor/onCursor';
import { Maybe } from 'graphql-language-service';
import { moveCursor } from '@/editor/code/guild/editor/onCursor/compare';

export type SchemaEditorApi = {
  jumpToType(typeName: string): void;
  jumpToField(typeName: string, fieldName: string): void;
  deselect(): void;
  jumpToError(rowNumber: number): void;
};

export type SchemaServicesOptions = {
  schema?: string;
  libraries?: string;
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  actions?: EditorAction[];
  select?: (
    name?:
      | Maybe<string>
      | Maybe<{ operation: 'Query' | 'Mutation' | 'Subscription' }>,
  ) => void;
  onBlur?: (value: string) => void;
  onLanguageServiceReady?: (languageService: EnrichedLanguageService) => void;
  onSchemaChange?: (schema: GraphQLSchema, sdl: string) => void;
  onSchemaError?: (
    errors: [GraphQLError],
    sdl: string,
    languageService: EnrichedLanguageService,
  ) => void;
  sharedLanguageService?: EnrichedLanguageService;
  keyboardShortcuts?: (
    editorInstance: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco,
  ) => monaco.editor.IActionDescriptor[];
};

const compileSchema = ({
  schema,
  libraries,
}: {
  schema: string;
  libraries?: string;
}) => {
  return [schema, libraries || ''].join('\n');
};

const cursorIndex = {
  index: -1,
};

export const useSchemaServices = (
  options: Omit<SchemaServicesOptions, 'schema'> & {
    schemaObj: {
      code?: string;
      isFromLocalChange?: boolean;
    };
  } = { schemaObj: {} },
) => {
  const [editorRef, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [codeErrors, setCodeErrors] = React.useState<EditorError[]>([]);
  const [decorationIds, setDecorationIds] = React.useState<string[]>([]);
  const [monacoRef, setMonaco] = React.useState<typeof monaco | null>(null);
  const previousSchema = usePrevious(options.schemaObj.code);
  const { tree, selectedNodeId } = useTreesState();
  const { theme } = useTheme();
  // move to worker
  const languageService = React.useMemo(() => {
    return (
      options.sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: options.schemaObj.code
          ? compileSchema({ ...options, schema: options.schemaObj.code })
          : undefined,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      })
    );
  }, [options.libraries, options.schemaObj.code]);

  const selectNodeUnderCursor = async <
    T extends { lineNumber: number; column: number },
  >(
    model: monaco.editor.ITextModel,
    e: T,
    currentSelectedNode?: string,
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
            console.log('SELECTING', n, currentSelectedNode);
            options.select(n);
          }
        }
      })
      .catch((e) => {});
  };

  React.useEffect(() => {
    const model = editorRef?.getModel();
    if (!model || !editorRef || options.schemaObj.isFromLocalChange) return;
    moveCursor({
      cursorIndex,
      editorRef,
      newText: options.schemaObj.code || '',
      previousText: previousSchema || '',
    });
  }, [options.schemaObj.code]);

  React.useEffect(() => {
    if (tree.schema) {
      const model = editorRef?.getModel();
      if (model) {
        const p = model?.getPositionAt(cursorIndex.index);
        selectNodeUnderCursor(model, p, selectedNodeId?.value?.name);
      }
    }
  }, [tree]);

  React.useEffect(() => {
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
          contextMenuGroupId: action.contextMenuGroupId || 'navigation',
          contextMenuOrder: action.contextMenuOrder,
          run: async (editor) => {
            const model = editor.getModel();
            const position = editor.getPosition();

            if (model && position) {
              const bridge = await languageService.buildBridgeForProviders(
                model,
                position,
              );

              if (bridge) {
                action.onRun({ editor: editorRef, monaco: monacoRef, bridge });
              }
            }
          },
        });
      }

      const handler = languageService.getModelChangeHandler();
      handler(
        editorRef,
        monacoRef,
        options.diagnosticsProviders || [],
        options.decorationsProviders || [],
      );

      const onSelectCursor = (
        e: monaco.editor.ICursorSelectionChangedEvent,
      ) => {
        console.log(e);
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
            selectedNodeId?.value?.name,
          );
        }
      };
      const cursorSelectionDisposable =
        editorRef.onDidChangeCursorSelection(onSelectCursor);

      const definitionProviderDisposable =
        monacoRef.languages.registerDefinitionProvider(
          'graphql',
          languageService.getDefinitionProvider(
            options.definitionProviders || [],
          ),
        );

      const hoverDisposable = monacoRef.languages.registerHoverProvider(
        'graphql',
        languageService.getHoverProvider(options.hoverProviders || []),
      );

      return () => {
        hoverDisposable && hoverDisposable.dispose();
        definitionProviderDisposable && definitionProviderDisposable.dispose();
        cursorSelectionDisposable && cursorSelectionDisposable.dispose();
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
    selectedNodeId?.value?.id,
  ]);

  React.useEffect(() => {
    if (codeErrors && editorRef && monacoRef) {
      setDecorationIds(
        monacoSetDecorations(theme)({
          codeErrors,
          decorationIds,
          m: monacoRef,
          monacoGql: editorRef,
        }),
      );
    }
  }, [editorRef, monacoRef, codeErrors]);

  return {
    codeErrors,
    setEditor,
    setMonaco,
    editorRef,
    monacoRef,
    languageService,
    setSchema: (newValue: string) => {
      const fullSchema = compileSchema({ ...options, schema: newValue });
      return languageService.trySchema(fullSchema);
    },
    onValidate: () => {
      const currentValue = editorRef?.getModel()?.getValue();
      if (currentValue) {
        GraphQLEditorWorker.validate(currentValue, options.libraries).then(
          (errors) => {
            setCodeErrors(errors);
          },
        );
      }
    },
    editorApi: {
      jumpToType: async (typeName: string) => {
        const schema =
          languageService.schema || (await languageService.getSchema());
        if (schema) {
          const type = schema.getType(typeName);
          if (type?.astNode?.loc) {
            const range = locToRange(type.astNode.loc);
            editorRef?.revealPositionInCenter(
              { column: 0, lineNumber: range.startLineNumber },
              0,
            );
          }
        }
      },
      jumpToField: (typeName: string, fieldName: string) => {
        languageService.getSchema().then((schema) => {
          if (schema) {
            const type = schema.getType(typeName);

            if (type && (isObjectType(type) || isInterfaceType(type))) {
              const field = type.getFields()[fieldName];

              if (field?.astNode?.loc) {
                const range = locToRange(field.astNode.loc);
                editorRef?.revealPositionInCenter(
                  { column: 0, lineNumber: range.startLineNumber },
                  0,
                );
              }
            }
          }
        });
      },
      deselect: () => editorRef?.setSelection(emptyLocation),
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
          0,
        );
      },
    } as SchemaEditorApi,
  };
};
function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  React.useEffect(() => {
    ref.current = value; //assign the value of ref to the argument
  }, [value]); //this code will run when the value of 'value' changes
  return ref.current; //in the end, return the current ref value.
}
