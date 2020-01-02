import { buildSchema, validateSchema, parse, GraphQLError } from 'graphql';
import { validateSDL } from 'graphql/validation/validate';

export interface EditorError {
  row: number;
  column: number;
  type: 'error';
  text: string;
  position: number;
}

const GraphQLErrorToEditorErrors = (e: GraphQLError): EditorError[] => [
  ...(e.locations || []).map(
    (l) =>
      ({
        column: l.column,
        row: l.line - 1,
        position: 1,
        text: e.message,
        type: 'error',
      } as EditorError),
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
  const libraryPadding = libraries.split('\n').length;
  return (error: EditorError): EditorError => {
    return {
      ...error,
      row: error.row - libraryPadding,
    };
  };
};

export const catchSchemaErrors = (schema: string, libraries: string = ''): EditorError[] => {
  const s = libraries + '\n' + schema;
  const paddingFunction = moveErrorsByLibraryPadding(libraries);
  try {
    const errors = validateSDLErrors(s);
    if (errors.length > 0) {
      return errors.map(paddingFunction);
    }
    try {
      return validateTypes(s).map(paddingFunction);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    const er = error as GraphQLError;
    return GraphQLErrorToEditorErrors(er).map(paddingFunction);
  }
  return [];
};
