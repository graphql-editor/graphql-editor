import { TreeToGraphQL } from 'graphql-zeus';
import { TransformerDef } from '../../../src/Transformer';

export const transformerCRUD: TransformerDef = {
  transformer: ({ field, operations }) => `
      input Create${field.name}{
          ${TreeToGraphQL.parse({ nodes: field.args! })}
      }
      input Update${field.name}{
          ${TreeToGraphQL.parse({ nodes: field.args! })}
      }
      input Details${field.name}{
          id: String!
      }
      type ${field.name}Query{
          list: [${field.name}!]!
          getByDetails(details: Details${field.name}): ${field.name}
      }
      type ${field.name}Mutation{
          create( ${field.name[0].toLowerCase() + field.name.slice(1)}: Create${field.name} ): String!
          update( ${field.name[0].toLowerCase() + field.name.slice(1)}: Update${field.name}, details: Details${
    field.name
  } ): String!
          remove( details: Details${field.name} ): String!
      }
      extend type ${operations.query?.name || 'Query'}{
          ${field.name[0].toLowerCase() + field.name.slice(1)}: ${field.name}Query
      }
      extend type ${operations.mutation?.name || 'Mutation'}{
          ${field.name[0].toLowerCase() + field.name.slice(1)}: ${field.name}Mutation
      }
      `,
  directiveName: 'model',
};
