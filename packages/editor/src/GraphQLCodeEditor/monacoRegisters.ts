import { Monaco } from "@monaco-editor/react";
import { DocumentNode, GraphQLSchema, validate } from "graphql";
import {
  getAutocompleteSuggestions,
  Position,
  getHoverInformation,
  GraphQLDocumentMode,
} from "graphql-language-service";

export const registerMonaco = (monaco: Monaco, schema: GraphQLSchema) => {
  // Register completion provider
  monaco.languages.registerCompletionItemProvider("graphql", {
    provideCompletionItems: (model, position) => {
      const text = model.getValue();
      const lines = text.split("\n");
      const currentLineText = lines[position.lineNumber - 1].trim();

      try {
        const suggestions = getAutocompleteSuggestions(
          schema,
          text,
          new Position(position.lineNumber - 1, position.column - 1),
          undefined,
          undefined,
          { mode: GraphQLDocumentMode.TYPE_SYSTEM }
        );
        const range = new monaco.Range(
          position.lineNumber,
          1,
          position.lineNumber,
          currentLineText.length + 1
        );

        return {
          suggestions: [
            ...suggestions.map((sug) => ({
              label: sug.label,
              kind: monaco.languages.CompletionItemKind.Text,
              insertText: sug.insertText || sug.label,
              documentation: sug.documentation && {
                value: sug.documentation,
              },
              range,
            })),
            {
              label: "type",
              kind: monaco.languages.CompletionItemKind.Keyword,
              insertText: "type ${1:TypeName} {\n\t$0\n}",
              insertTextRules:
                monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
              documentation: "Define a new type",
              range,
            },
          ],
        };
      } catch (e) {
        console.error("Error in getting suggestions:", e);
        return { suggestions: [] };
      }
    },
  });

  // Register hover provider
  monaco.languages.registerHoverProvider("graphql", {
    provideHover: (model, position) => {
      const text = model.getValue();
      const posInDoc = {
        line: position.lineNumber - 1,
        character: position.column - 1,
      };

      try {
        const hoverInfo = getHoverInformation(
          schema,
          text,
          new Position(posInDoc.line, posInDoc.character)
        );

        return hoverInfo
          ? {
              range: new monaco.Range(
                position.lineNumber,
                position.column,
                position.lineNumber,
                position.column
              ),
              contents: [{ value: hoverInfo.toString() }],
            }
          : null;
      } catch (e) {
        console.error("Error in providing hover:", e);
        return null;
      }
    },
  });
};

export const initMonaco = (monaco: Monaco) => {
  // Register the language if not already done
  monaco.languages.register({ id: "graphql" });

  // Define a basic tokenizer (kept simple for demonstration)
  monaco.languages.setMonarchTokensProvider("graphql", {
    keywords: [
      "type",
      "query",
      "mutation",
      "subscription",
      "schema",
      "extend",
      "scalar",
      "implements",
      "interface",
      "union",
      "enum",
      "input",
      "directive",
      "on",
      "fragment",
    ],
    tokenizer: {
      root: [
        [/[{}]/, "delimiter.bracket"],
        [/\b(?:[A-Z][a-zA-Z0-9]*)\b/, "type.identifier"],
        [
          /\b(?:_?\b[a-zA-Z_][a-zA-Z0-9_]*)\b/,
          {
            cases: {
              "@keywords": "keyword",
              "@default": "identifier",
            },
          },
        ],
        [/[ \t\r\n]+/, "white"],
        [/".*?"/, "string"],
        [/'*?'/, "string"],
        [/[()]/, "@brackets"],
        [/[;,.]/, "delimiter"],
        [/#[^\n]*/, "comment"],
      ],
    },
  });
};

export const validateMonaco = (
  monaco: Monaco,
  parsedSchema: GraphQLSchema,
  documentNode: DocumentNode
) => {
  try {
    const errors = validate(parsedSchema, documentNode);
    const markers = errors.map((error) => ({
      severity: monaco.MarkerSeverity.Error,
      startLineNumber: error.locations?.[0].line || 0,
      startColumn: error.locations?.[0].column || 0,
      endLineNumber: error.locations?.[0].line || 0,
      endColumn: (error.locations?.[0].column || 1) + 1,
      message: error.message,
    }));
    const model = monaco.editor.getModels().at(0);
    if (!model) return;
    monaco.editor.setModelMarkers(model, "graphql", markers);
  } catch (e) {
    console.error("Error in validation:", e);
  }
};
