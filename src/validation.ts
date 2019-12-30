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

export const catchSchemaErrors = (s: string): EditorError[] => {
  try {
    const errors = validateSDLErrors(s);
    if (errors.length > 0) {
      return errors;
    }
    try {
      return validateTypes(s);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    const er = error as GraphQLError;
    return GraphQLErrorToEditorErrors(er);
  }
  return [];
};
