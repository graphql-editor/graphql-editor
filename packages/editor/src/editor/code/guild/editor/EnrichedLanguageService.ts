import { GraphQLEditorWorker } from "graphql-editor-worker";
import { GraphQLSchema } from "graphql";
import {
  LanguageService,
  getRange,
  IPosition as GraphQLPosition,
  ContextToken,
} from "graphql-language-service";
import * as monaco from "monaco-editor";
import {
  BridgeOptions,
  coreDefinitionSource,
  coreDiagnosticsSource,
  coreHoverSource,
  DecorationsSource,
  DefinitionSource,
  DiagnosticsSource,
  HoverSource,
  toGraphQLPosition,
  toMonacoRange,
  removeFalsey,
  cutUnnecessary,
} from "./utils";
import { mergeSDLs } from "graphql-js-tree";

// TODO: cache decorations and diagnostics
// const lastHandledForDocument = "";

export class EnrichedLanguageService extends LanguageService {
  async getNodeAtPosition(
    schema: GraphQLSchema,
    document: string,
    position: GraphQLPosition
  ): Promise<ContextToken | null> {
    if (schema) {
      const token = await GraphQLEditorWorker.getTokenAtPosition(
        document,
        position
      );
      if (token) {
        return token;
      }
    }

    return null;
  }
  public async buildBridgeForProviders<
    T extends { lineNumber: number; column: number }
  >(
    model: monaco.editor.ITextModel,
    position: T
  ): Promise<null | BridgeOptions> {
    const graphQLPosition = toGraphQLPosition(position);
    const document = model.getValue();
    const schema = await this.getSchema();

    if (!schema) {
      return null;
    }

    const tokenAtPosition = await this.getNodeAtPosition(
      schema,
      document,
      graphQLPosition
    );

    if (!tokenAtPosition) {
      return null;
    }

    return {
      languageService: this,
      position: graphQLPosition,
      document,
      schema,
      token: tokenAtPosition,
      model,
    };
  }

  getDefinitionProvider(
    rawSources: DefinitionSource[]
  ): monaco.languages.DefinitionProvider {
    const sources = [...rawSources, coreDefinitionSource];

    return {
      provideDefinition: async (model, position) => {
        const bridge = await this.buildBridgeForProviders(
          model,
          position
        ).catch(() => {
          //noop
        });

        if (!bridge) {
          return [];
        }

        const nestedArrays = (
          await Promise.all(sources.map((source) => source.forNode(bridge)))
        ).filter(Boolean) as unknown as monaco.languages.Location[][];

        const items = ([] as monaco.languages.Location[]).concat(
          ...nestedArrays
        );

        return items;
      },
    };
  }

  getHoverProvider(rawSources: HoverSource[]): monaco.languages.HoverProvider {
    const sources = [...rawSources, coreHoverSource];
    return {
      provideHover: async (model, position) => {
        const info = await this.buildBridgeForProviders(model, position).catch(
          () => {
            //noop
          }
        );

        if (!info) {
          return;
        }

        const contents = await Promise.all(
          sources.map(async (source) => {
            try {
              return await source.forNode(info);
            } catch (e) {
              return null;
            }
          })
        );

        return {
          contents: contents.filter<monaco.IMarkdownString>(removeFalsey),
          range: toMonacoRange(
            getRange(
              {
                column: info.position.character,
                line: info.position.line + 1,
              },
              info.document
            )
          ),
        };
      },
    };
  }

  private async handleDecorations(
    decorationSources: DecorationsSource[],
    model: monaco.editor.ITextModel,
    monacoInstance: typeof monaco,
    editorInstance: monaco.editor.IStandaloneCodeEditor
  ): Promise<void> {
    for (const source of decorationSources) {
      source.forDocument({
        monaco: monacoInstance,
        editor: editorInstance,
        document: model.getValue(),
        model,
        languageService: this,
      });
    }
  }

  private async handleDiagnostics(
    rawDiagnosticsSources: DiagnosticsSource[],
    model: monaco.editor.ITextModel,
    monacoInstance: typeof monaco,
    libraries?: string
  ): Promise<void> {
    const diagnosticsSources = [
      ...rawDiagnosticsSources,
      coreDiagnosticsSource,
    ];
    const nestedArrays = (
      await Promise.all(
        diagnosticsSources.map(async (source) => {
          let c = model.getValue().toString();
          try {
            if (libraries) {
              const result = mergeSDLs(model.getValue().toString(), libraries);
              if (result.__typename === "error") {
                return [
                  {
                    message:
                      "Cannot merge nodes: " +
                      result.errors
                        .map(
                          (e) => `${e.conflictingNode}.${e.conflictingField}`
                        )
                        .join(","),
                    endColumn: 1000,
                    endLineNumber: 19999,
                    startColumn: 0,
                    startLineNumber: 0,
                    severity: monaco.MarkerSeverity.Warning,
                  },
                ];
              } else {
                c = [c, cutUnnecessary(c, libraries)].join("\n");
              }
            }
            const s = await source.forDocument({
              languageService: this,
              model,
              document: c,
            });
            return s;
          } catch (e) {
            return null;
          }
        })
      )
    ).filter(removeFalsey);

    const markerData = ([] as monaco.editor.IMarkerData[]).concat(
      ...nestedArrays
    );
    monacoInstance.editor.setModelMarkers(model, "graphql", markerData);
  }

  getModelChangeHandler(
    libraries?: string
  ): (
    editorInstance: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco,
    diagnosticsSources: DiagnosticsSource[],
    decorationsSources: DecorationsSource[]
  ) => void {
    return async (
      editorInstance,
      monacoInstance,
      diagnosticsSources,
      decorationsSources
    ) => {
      const model = editorInstance.getModel();

      if (!model) {
        return;
      }

      await Promise.all([
        this.handleDiagnostics(
          diagnosticsSources,
          model,
          monacoInstance,
          libraries
        ),
        this.handleDecorations(
          decorationsSources,
          model,
          monacoInstance,
          editorInstance
        ),
      ]);
    };
  }

  trySchema(sdl: string): Promise<GraphQLSchema | null> {
    // XX-DOTAN: In case of an issue with the schema parsing, we'll get the error through
    // the Marker, and we can safely ignore it here.
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return this.setSchema(sdl).then(() => this.getSchema());
  }
}
