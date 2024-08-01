import React from "react";
import type {
  CancellationToken,
  editor,
  languages,
  IRange as MonacoIRange,
  Position,
} from "monaco-editor";
import {
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  EditorAction,
  HoverSource,
} from "./utils";
import { EnrichedLanguageService } from "./EnrichedLanguageService";
import { GraphQLError, GraphQLSchema } from "graphql";
import { GraphQLEditorWorker } from "graphql-editor-worker";
import { monacoSetDecorations } from "@/editor/code/monaco/decorations";
import { useTheme } from "@/state/containers";
import {
  CompletionItem,
  ContextTokenForCodeMirror,
  getAutocompleteSuggestions,
  IRange,
  Maybe,
} from "graphql-language-service";
import { PassedSchema } from "@/Models";
import { EditorError } from "graphql-editor-worker/lib/validation";
import { CompletionItemInsertTextRule, CompletionItemKindEnum } from "@/enums";

export type SchemaServicesOptions = {
  schema?: PassedSchema;
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
    languageService: EnrichedLanguageService
  ) => void;
  sharedLanguageService?: EnrichedLanguageService;
  keyboardShortcuts?: (
    editorInstance: editor.IStandaloneCodeEditor,
    monacoInstance: any
  ) => editor.IActionDescriptor[];
};

const compileSchema = ({
  schema,
  libraries,
}: {
  schema: string;
  libraries?: string;
}) => {
  return [schema, libraries || ""].join("\n");
};

export const useGqlServices = (options: SchemaServicesOptions = {}) => {
  const [editorRef, setEditor] =
    React.useState<editor.IStandaloneCodeEditor | null>(null);
  const [internalCodeErrors, setInternalCodeErrors] = React.useState<
    EditorError[]
  >([]);
  const [decorationIds, setDecorationIds] = React.useState<string[]>([]);
  const [monacoRef, setMonaco] = React.useState<any | null>(null);
  const { theme } = useTheme();
  const languageService = React.useMemo(
    () =>
      options.sharedLanguageService ||
      new EnrichedLanguageService({
        schemaString: options.schema
          ? compileSchema({
              libraries: options.schema.libraries,
              schema: options.schema.code,
            })
          : undefined,
        schemaConfig: {
          buildSchemaOptions: {
            assumeValid: true,
            assumeValidSDL: true,
          },
        },
      }),
    [
      options.schema?.libraries,
      options.schema?.code,
      options.sharedLanguageService,
    ]
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

      const handler = languageService.getModelChangeHandler();
      handler(
        editorRef,
        monacoRef,
        options.diagnosticsProviders || [],
        options.decorationsProviders || []
      );
      const completionProviderDisposable =
        monacoRef.languages.registerCompletionItemProvider("graphql", {
          provideCompletionItems: async (
            model: editor.IReadOnlyModel,
            position: Position,
            _context: languages.CompletionContext,
            _token: CancellationToken
          ) => {
            const bridge = await languageService
              .buildBridgeForProviders(model, position)
              .catch(() => {
                //noop
              });
            if (bridge) {
              const suggestions = getAutocompleteSuggestions(
                bridge.schema as GraphQLSchema,
                bridge.document,
                bridge.position,
                bridge.token as ContextTokenForCodeMirror
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
          "graphql",
          languageService.getDefinitionProvider(
            options.definitionProviders || []
          )
        );

      const hoverDisposable = monacoRef.languages.registerHoverProvider(
        "graphql",
        languageService.getHoverProvider(options.hoverProviders || [])
      );
      return () => {
        completionProviderDisposable && completionProviderDisposable.dispose();
        hoverDisposable && hoverDisposable.dispose();
        definitionProviderDisposable && definitionProviderDisposable.dispose();
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
  ]);

  React.useEffect(() => {
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
    codeErrors: internalCodeErrors,
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
        GraphQLEditorWorker.validate(
          currentValue,
          options.schema?.libraries
        ).then((errors) => {
          setInternalCodeErrors(errors);
        });
      }
    },
  };
};

export function toMonacoRange(range: IRange): MonacoIRange {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  };
}
export function toCompletion(
  entry: CompletionItem,
  range?: IRange
): languages.CompletionItem {
  const results: languages.CompletionItem = {
    label: entry.label,
    insertText: entry.insertText ?? entry.label,
    insertTextRules: CompletionItemInsertTextRule.InsertAsSnippet,
    sortText: entry.sortText,
    filterText: entry.filterText,
    documentation: entry.documentation,
    detail: entry.detail,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
  kind: CompletionItemKind
): CompletionItemKindEnum {
  return kind in kindMap ? kindMap[kind] : CompletionItemKindEnum.Text;
}

const kindMap: Record<CompletionItemKind, CompletionItemKindEnum> = {
  [CompletionItemKind.Text]: CompletionItemKindEnum.Text,
  [CompletionItemKind.Method]: CompletionItemKindEnum.Method,
  [CompletionItemKind.Function]: CompletionItemKindEnum.Function,
  [CompletionItemKind.Constructor]: CompletionItemKindEnum.Constructor,
  [CompletionItemKind.Field]: CompletionItemKindEnum.Field,
  [CompletionItemKind.Variable]: CompletionItemKindEnum.Variable,
  [CompletionItemKind.Class]: CompletionItemKindEnum.Class,
  [CompletionItemKind.Interface]: CompletionItemKindEnum.Interface,
  [CompletionItemKind.Module]: CompletionItemKindEnum.Module,
  [CompletionItemKind.Property]: CompletionItemKindEnum.Property,
  [CompletionItemKind.Unit]: CompletionItemKindEnum.Unit,
  [CompletionItemKind.Value]: CompletionItemKindEnum.Value,
  [CompletionItemKind.Enum]: CompletionItemKindEnum.Enum,
  [CompletionItemKind.Keyword]: CompletionItemKindEnum.Keyword,
  [CompletionItemKind.Snippet]: CompletionItemKindEnum.Snippet,
  [CompletionItemKind.Color]: CompletionItemKindEnum.Color,
  [CompletionItemKind.File]: CompletionItemKindEnum.File,
  [CompletionItemKind.Reference]: CompletionItemKindEnum.Reference,
  [CompletionItemKind.Folder]: CompletionItemKindEnum.Folder,
  [CompletionItemKind.EnumMember]: CompletionItemKindEnum.EnumMember,
  [CompletionItemKind.Constant]: CompletionItemKindEnum.Constant,
  [CompletionItemKind.Struct]: CompletionItemKindEnum.Struct,
  [CompletionItemKind.Event]: CompletionItemKindEnum.Event,
  [CompletionItemKind.Operator]: CompletionItemKindEnum.Operator,
  [CompletionItemKind.TypeParameter]: CompletionItemKindEnum.TypeParameter,
};
