import React from 'react';
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
import { Workers } from '@/worker';
import { EditorError } from '@/validation';
import { monacoSetDecorations } from '@/editor/code/monaco/decorations';
import { useTheme } from '@/state/containers';
import { findCurrentNodeName } from '@/editor/code/guild/editor/onCursor';
import { Maybe } from 'graphql-language-service';

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

export const useSchemaServices = (options: SchemaServicesOptions = {}) => {
  const [editorRef, setEditor] =
    React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [codeErrors, setCodeErrors] = React.useState<EditorError[]>([]);
  const [decorationIds, setDecorationIds] = React.useState<string[]>([]);
  const [monacoRef, setMonaco] = React.useState<typeof monaco | null>(null);
  const { theme } = useTheme();
  const languageService = React.useMemo(
    () =>
      options.sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: options.schema
          ? compileSchema({ ...options, schema: options.schema })
          : undefined,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      }),
    [options, options.schema],
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

      const onCursorChangeDisposable = editorRef.onDidChangeCursorPosition(
        (e) => {
          if (!options.select) return;
          const model = editorRef.getModel();
          if (model) {
            languageService
              .buildBridgeForProviders(model, e.position)
              .then((bridge) => {
                if (bridge && options.select) {
                  const {
                    token: { state },
                  } = bridge;
                  const n = findCurrentNodeName(state);
                  options.select(n);
                }
              })
              .catch((e) => {});
          }
        },
      );

      const onChangeDisposable = editorRef.onDidChangeModelContent(() =>
        handler(
          editorRef,
          monacoRef,
          options.diagnosticsProviders || [],
          options.decorationsProviders || [],
        ),
      );

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
        onCursorChangeDisposable && onCursorChangeDisposable.dispose();
        hoverDisposable && hoverDisposable.dispose();
        definitionProviderDisposable && definitionProviderDisposable.dispose();
        onChangeDisposable && onChangeDisposable.dispose();
      };
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [editorRef, monacoRef, options]);

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
        Workers.validate(currentValue, options.libraries).then((errors) => {
          setCodeErrors(errors);
        });
      }
    },
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
                0,
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
