import { buildSchema, validateSchema, parse, GraphQLError } from "graphql";
import { validateSDL } from "graphql/validation/validate";
import { mergeSDLs } from "graphql-js-tree";

export interface EditorError {
  type: "error";
  text: string;
  row?: number;
  column?: number;
  position?: number;
  libraryError?: string;
}

const GraphQLErrorToEditorErrors = (e: GraphQLError): EditorError[] => [
  ...(e.locations || []).map(
    (l) =>
      ({
        column: l.column,
        row: l.line - 2,
        position: 1,
        text: e.message,
        type: "error",
      } as EditorError)
  ),
];

const validateSDLErrors = (s: string): EditorError[] => {
  const schema = parse(s);
  const errors = validateSDL(schema);
  return errors.map(GraphQLErrorToEditorErrors).flat(1);
};

const validateTypes = (s: string): EditorError[] => {
  const schema = buildSchema(s);
  const errors = validateSchema(schema);
  return errors.map(GraphQLErrorToEditorErrors).flat(1);
};

/**
 * Extend code with library and remember library line size to move the error later
 */
const moveErrorsByLibraryPadding = (libraries: string) => {
  const libraryPadding = libraries.split("\n").length;
  return (error: EditorError): EditorError => {
    return {
      ...error,
      row: (error.row || 0) - libraryPadding,
    };
  };
};

const allowMultipleDirectivesAtLocation = (s: string) => {
  return !s.match(new RegExp(/directive(.*)can only be used once/));
};
export const catchSchemaErrors = (
  schema: string,
  libraries = ""
): EditorError[] => {
  const paddingFunction = moveErrorsByLibraryPadding(libraries);
  try {
    let code = schema;
    if (libraries) {
      const mergeResult = mergeSDLs(schema, libraries);
      if (mergeResult.__typename === "error") {
        return mergeResult.errors.map((e) => ({
          type: "error",
          text: `There is a conflict with library schema on Type.field: ${e.conflictingNode}.${e.conflictingField}`,
        }));
      }
      code = mergeResult.sdl;
    }
    const errors = validateSDLErrors(code);

    if (errors.length > 0) {
      return errors
        .filter((e) => allowMultipleDirectivesAtLocation(e.text))
        .map(paddingFunction);
    }
    return validateTypes(code).map(paddingFunction);
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "columnNumber" in error &&
      "lineNumber" in error &&
      "message" in error
    ) {
      const e = error as {
        lineNumber: number;
        columnNumber: number;
        message: string;
      };
      return [
        paddingFunction({
          text: e.message as string,
          type: "error",
          column: 0,
          row: 0,
        } as EditorError),
      ];
    }
    const er = error as GraphQLError;
    return GraphQLErrorToEditorErrors(er).map(paddingFunction);
  }
  return [];
};
