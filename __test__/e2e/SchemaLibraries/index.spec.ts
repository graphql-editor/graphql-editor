import { catchSchemaErrors } from '../../../src/validation';
import { GraphQLBlog, GraphQLPost, GraphQLScalars, GraphQLStorage } from '../../schemas';
describe('Test schema libraries', () => {
  it('Should validate schema with stitches', () => {
    const errors = catchSchemaErrors(`
        ${GraphQLScalars}
        ${GraphQLStorage}
        ${GraphQLPost}
        ${GraphQLBlog}`);
    expect(errors.length).toBe(0);
  });
});
