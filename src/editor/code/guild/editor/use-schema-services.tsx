import React from "react";
import type * as monaco from 'monaco-editor';
import { DecorationsSource, DefinitionSource, DiagnosticsSource, EditorAction, HoverSource } from "./utils";
import { EnrichedLanguageService } from './EnrichedLanguageService';
import { GraphQLError, GraphQLSchema, isInterfaceType, isObjectType } from "graphql";
import { emptyLocation, locToRange } from "./utils";

export type SchemaEditorApi = {
  jumpToType(typeName: string): void;
  jumpToField(typeName: string, fieldName: string): void;
  deselect(): void;
};

export type SchemaServicesOptions = {
  schema?: string;
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  actions?: EditorAction[];
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

export const useSchemaServices = (options: SchemaServicesOptions = {}) => {
  const [editorRef, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [monacoRef, setMonaco] = React.useState<typeof monaco | null>(null);
  const languageService = React.useMemo(
    () =>
    options.sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: options.schema,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      }),
    [options.sharedLanguageService]
  );

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
                position
              );

              if (bridge) {
                action.onRun({ editor: editorRef, monaco: monacoRef, bridge });
              }
            }
          },
        });
      }

      const handler = languageService.getModelChangeHandler();
      handler(editorRef, monacoRef, options.diagnosticsProviders || [], options.decorationsProviders || []);

      const onChangeDisposable = editorRef.onDidChangeModelContent(() =>
        handler(
          editorRef,
          monacoRef,
          options.diagnosticsProviders || [],
          options.decorationsProviders || []
        )
      );

      const definitionProviderDisposable =
        monacoRef.languages.registerDefinitionProvider(
          'graphql',
          languageService.getDefinitionProvider(options.definitionProviders || [])
        );

      const hoverDisposable = monacoRef.languages.registerHoverProvider(
        'graphql',
        languageService.getHoverProvider(options.hoverProviders || [])
      );

      return () => {
        hoverDisposable && hoverDisposable.dispose();
        definitionProviderDisposable && definitionProviderDisposable.dispose();
        onChangeDisposable && onChangeDisposable.dispose();
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [editorRef, monacoRef]);

  return {
    setEditor,
    setMonaco,
    editorRef,
    monacoRef,
    languageService,
    setSchema: (newValue: string) => languageService.trySchema(newValue),
    editorApi: {
      jumpToType: (typeName: string) => {
        languageService.getSchema().then((schema) => {
          if (schema) {
            const type = schema.getType(typeName);

            if (type?.astNode?.loc) {
              const range = locToRange(type.astNode.loc);
              editorRef?.setSelection(range);
              editorRef?.revealPositionInCenter(
                { column: 0, lineNumber: range.startLineNumber },
                0
              );
            }
          }
        });
      },
      jumpToField: (typeName: string, fieldName: string) => {
        languageService.getSchema().then((schema) => {
          if (schema) {
            const type = schema.getType(typeName);

            if (type && (isObjectType(type) || isInterfaceType(type))) {
              const field = type.getFields()[fieldName];

              if (field?.astNode?.loc) {
                const range = locToRange(field.astNode.loc);
                editorRef?.setSelection(range);
                editorRef?.revealPositionInCenter(
                  { column: 0, lineNumber: range.startLineNumber },
                  0
                );
              }
            }
          }
        });
      },
      deselect: () => editorRef?.setSelection(emptyLocation),
    } as SchemaEditorApi
  };
} 