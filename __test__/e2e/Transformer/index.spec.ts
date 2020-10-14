import { TransformSchema } from '../../../src/Transformer';
import { GraphQLTransform } from '../../schemas';
import { transformerCRUD } from './index.graphql.transform';
describe('Test GraphQL Transformer', () => {
  it('Should create CRUD inputs and produce resolvers on query and mutation', () => {
    const schema = TransformSchema({ schema: GraphQLTransform, transformers: [transformerCRUD] });
    console.log(schema);
    expect(schema).toContain('input CreatePost');
    expect(schema).toContain('input UpdatePost');
    expect(schema).toContain('input DetailsPost');
    expect(schema).toContain('post: PostQuery');
    expect(schema).toContain('post: PostMutation');
  });
});
