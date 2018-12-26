import { GraphQLSchema, buildClientSchema, introspectionQuery } from 'graphql';

export const getSchemaFromURL = async (url: string): Promise<GraphQLSchema> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: introspectionQuery })
  });
  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(JSON.stringify(errors, null, 2));
  }
  const schema = buildClientSchema(data);
  return schema;
};
