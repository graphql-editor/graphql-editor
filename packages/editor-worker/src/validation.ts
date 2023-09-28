import { buildSchema, validateSchema, parse, GraphQLError } from "graphql";
import { validateSDL } from "graphql/validation/validate";
import { mergeSDLs } from "graphql-js-tree";

export type GlobalGraphQLError = {
  __typename: "global";
  text: string;
};

export type LocalGraphQLError = {
  __typename: "local";
  error: GraphQLError;
};

export type EditorError = GlobalGraphQLError | LocalGraphQLError;

const validateSDLErrors = (s: string) => {
  const schema = parse(s);
  const errors = validateSDL(schema);
  return errors;
};

const validateTypes = (s: string) => {
  const schema = buildSchema(s);
  const errors = validateSchema(schema);
  return errors;
};

/**
 * Extend code with library and remember library line size to move the error later
 */
const moveErrorsByLibraryPadding = (libraries: string) => {
  const libraryPadding = libraries.split("\n").length;
  const libraryLength = libraries.length;
  return (error: LocalGraphQLError): LocalGraphQLError => {
    return {
      ...error,
      error: {
        ...error.error,
        locations: error.error.locations?.map((l) => ({
          ...l,
          line: l.line - libraryPadding,
        })),
        positions: error.error.positions?.map((p) => p - libraryLength),
      },
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
          text: `There is a conflict with library schema on Type.field: ${e.conflictingNode}.${e.conflictingField}`,
          __typename: "global",
        }));
      }
      code = mergeResult.sdl;
    }
    const errors = validateSDLErrors(code);

    if (errors.length > 0) {
      return errors
        .filter((e) => allowMultipleDirectivesAtLocation(e.message))
        .map((e) => {
          return paddingFunction({
            __typename: "local",
            error: e,
          });
        });
    }
    return validateTypes(code).map((e) => {
      return paddingFunction({
        __typename: "local",
        error: e,
      });
    });
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
        {
          __typename: "global",
          text: e.message as string,
        },
      ];
    }
    const er = error as GraphQLError;
    return [{ __typename: "local", error: er }];
  }
  return [];
};
