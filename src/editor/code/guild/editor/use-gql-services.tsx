import React from 'react';
import * as monaco from 'monaco-editor';
import {
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  EditorAction,
  HoverSource,
} from './utils';
import { EnrichedLanguageService } from './EnrichedLanguageService';
import { GraphQLError, GraphQLSchema } from 'graphql';
import { Workers } from '@/worker';
import { EditorError } from '@/validation';
import { monacoSetDecorations } from '@/editor/code/monaco/decorations';
import { useTheme } from '@/state/containers';
import {
  CompletionItem,
  ContextTokenForCodeMirror,
  getAutocompleteSuggestions,
  IRange,
  Maybe,
} from 'graphql-language-service';

export type SchemaEditorApi = {};

export type SchemaServicesOptions = {
  schema?: string;
  libraries?: string;
  gql?: string;
  hoverProviders?: HoverSource[];
  definitionProviders?: DefinitionSource[];
  diagnosticsProviders?: DiagnosticsSource[];
  decorationsProviders?: DecorationsSource[];
  actions?: EditorAction[];
  select?: (name?: Maybe<string>) => void;
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

export const useGqlServices = (options: SchemaServicesOptions = {}) => {
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
      const onChangeDisposable = editorRef.onDidChangeModelContent(() =>
        handler(
          editorRef,
          monacoRef,
          options.diagnosticsProviders || [],
          options.decorationsProviders || [],
        ),
      );

      const completionProviderDisposable =
        monacoRef.languages.registerCompletionItemProvider('graphql', {
          provideCompletionItems: async (
            model: monaco.editor.IReadOnlyModel,
            position: monaco.Position,
            _context: monaco.languages.CompletionContext,
            _token: monaco.CancellationToken,
          ) => {
            const bridge = await languageService.buildBridgeForProviders(
              model,
              position,
            );
            if (bridge) {
              const suggestions = getAutocompleteSuggestions(
                bridge.schema,
                bridge.document,
                bridge.position,
                bridge.token as ContextTokenForCodeMirror,
              );
              return {
                suggestions: suggestions.map((s) => toCompletion(s)),
              };
            }
            return { suggestions: [] };
          },
        });

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
        completionProviderDisposable && completionProviderDisposable.dispose();
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
  };
};

export function toMonacoRange(range: IRange): monaco.IRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  };
}
export function toCompletion(
  entry: CompletionItem,
  range?: IRange,
): monaco.languages.CompletionItem {
  const results: monaco.languages.CompletionItem = {
    label: entry.label,
    insertText: entry.insertText ?? entry.label,
    sortText: entry.sortText,
    filterText: entry.filterText,
    documentation: entry.documentation,
    detail: entry.detail,
    //@ts-ignore
    range: range ? toMonacoRange(range) : undefined,
    kind: entry.kind!,
  };

  if (entry.command) {
    results.command = { ...entry.command, id: entry.command.command };
  }

  return results;
}

export enum CompletionItemKind {
  Text = 1,
  Method = 2,
  Function = 3,
  Constructor = 4,
  Field = 5,
  Variable = 6,
  Class = 7,
  Interface = 8,
  Module = 9,
  Property = 10,
  Unit = 11,
  Value = 12,
  Enum = 13,
  Keyword = 14,
  Snippet = 15,
  Color = 16,
  File = 17,
  Reference = 18,
  Folder = 19,
  EnumMember = 20,
  Constant = 21,
  Struct = 22,
  Event = 23,
  Operator = 24,
  TypeParameter = 25,
}

export function toCompletionItemKind(
  kind: CompletionItemKind,
): monaco.languages.CompletionItemKind {
  return kind in kindMap
    ? kindMap[kind]
    : monaco.languages.CompletionItemKind.Text;
}

const kindMap: Record<CompletionItemKind, monaco.languages.CompletionItemKind> =
  {
    [CompletionItemKind.Text]: monaco.languages.CompletionItemKind.Text,
    [CompletionItemKind.Method]: monaco.languages.CompletionItemKind.Method,
    [CompletionItemKind.Function]: monaco.languages.CompletionItemKind.Function,
    [CompletionItemKind.Constructor]:
      monaco.languages.CompletionItemKind.Constructor,
    [CompletionItemKind.Field]: monaco.languages.CompletionItemKind.Field,
    [CompletionItemKind.Variable]: monaco.languages.CompletionItemKind.Variable,
    [CompletionItemKind.Class]: monaco.languages.CompletionItemKind.Class,
    [CompletionItemKind.Interface]:
      monaco.languages.CompletionItemKind.Interface,
    [CompletionItemKind.Module]: monaco.languages.CompletionItemKind.Module,
    [CompletionItemKind.Property]: monaco.languages.CompletionItemKind.Property,
    [CompletionItemKind.Unit]: monaco.languages.CompletionItemKind.Unit,
    [CompletionItemKind.Value]: monaco.languages.CompletionItemKind.Value,
    [CompletionItemKind.Enum]: monaco.languages.CompletionItemKind.Enum,
    [CompletionItemKind.Keyword]: monaco.languages.CompletionItemKind.Keyword,
    [CompletionItemKind.Snippet]: monaco.languages.CompletionItemKind.Snippet,
    [CompletionItemKind.Color]: monaco.languages.CompletionItemKind.Color,
    [CompletionItemKind.File]: monaco.languages.CompletionItemKind.File,
    [CompletionItemKind.Reference]:
      monaco.languages.CompletionItemKind.Reference,
    [CompletionItemKind.Folder]: monaco.languages.CompletionItemKind.Folder,
    [CompletionItemKind.EnumMember]:
      monaco.languages.CompletionItemKind.EnumMember,
    [CompletionItemKind.Constant]: monaco.languages.CompletionItemKind.Constant,
    [CompletionItemKind.Struct]: monaco.languages.CompletionItemKind.Struct,
    [CompletionItemKind.Event]: monaco.languages.CompletionItemKind.Event,
    [CompletionItemKind.Operator]: monaco.languages.CompletionItemKind.Operator,
    [CompletionItemKind.TypeParameter]:
      monaco.languages.CompletionItemKind.TypeParameter,
  };
