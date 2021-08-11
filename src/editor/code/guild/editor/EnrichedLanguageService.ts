import { GraphQLSchema } from 'graphql';
import {
  LanguageService,
  getRange,
  IPosition as GraphQLPosition,
  ContextToken,
  getTokenAtPosition,
} from 'graphql-language-service';
import type * as monaco from 'monaco-editor';
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
} from './utils';

export class EnrichedLanguageService extends LanguageService {
  async getNodeAtPosition(
    schema: GraphQLSchema,
    document: string,
    position: GraphQLPosition,
  ): Promise<ContextToken | null> {
    if (schema) {
      const token = getTokenAtPosition(document, position);

      if (token) {
        return token;
      }
    }

    return null;
  }

  public async buildBridgeForProviders(
    model: monaco.editor.ITextModel,
    position: monaco.Position,
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
      graphQLPosition,
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
    rawSources: DefinitionSource[],
  ): monaco.languages.DefinitionProvider {
    const sources = [...rawSources, coreDefinitionSource];

    return {
      provideDefinition: async (model, position) => {
        const bridge = await this.buildBridgeForProviders(model, position);

        if (!bridge) {
          return [];
        }

        const nestedArrays = ((
          await Promise.all(sources.map((source) => source.forNode(bridge)))
        ).filter(Boolean) as any) as monaco.languages.Location[][];

        const items = ([] as monaco.languages.Location[]).concat(
          ...nestedArrays,
        );

        return items;
      },
    };
  }

  getHoverProvider(rawSources: HoverSource[]): monaco.languages.HoverProvider {
    const sources = [...rawSources, coreHoverSource];
    return {
      provideHover: async (model, position) => {
        const info = await this.buildBridgeForProviders(model, position);

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
          }),
        );

        return {
          contents: contents.filter<monaco.IMarkdownString>(removeFalsey),
          range: toMonacoRange(
            getRange(
              {
                column: info.position.character,
                line: info.position.line + 1,
              },
              info.document,
            ),
          ),
        };
      },
    };
  }

  private async handleDecorations(
    decorationSources: DecorationsSource[],
    model: monaco.editor.ITextModel,
    monacoInstance: typeof monaco,
    editorInstance: monaco.editor.IStandaloneCodeEditor,
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
  ): Promise<void> {
    const diagnosticsSources = [
      ...rawDiagnosticsSources,
      coreDiagnosticsSource,
    ];

    const nestedArrays = (
      await Promise.all(
        diagnosticsSources.map(async (source) => {
          try {
            return await source.forDocument({
              languageService: this,
              model,
              document: model.getValue().toString(),
            });
          } catch (e) {
            return null;
          }
        }),
      )
    ).filter(removeFalsey);

    const markerData = ([] as monaco.editor.IMarkerData[]).concat(
      ...nestedArrays,
    );

    monacoInstance.editor.setModelMarkers(model, 'graphql', markerData);
  }

  getModelChangeHandler(): (
    editorInstance: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco,
    diagnosticsSources: DiagnosticsSource[],
    decorationsSources: DecorationsSource[],
  ) => void {
    return async (
      editorInstance,
      monacoInstance,
      diagnosticsSources,
      decorationsSources,
    ) => {
      const model = editorInstance.getModel();

      if (!model) {
        return;
      }

      await Promise.all([
        this.handleDiagnostics(diagnosticsSources, model, monacoInstance),
        this.handleDecorations(
          decorationsSources,
          model,
          monacoInstance,
          editorInstance,
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
