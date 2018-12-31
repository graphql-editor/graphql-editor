import { codeGenerators } from '../src';
import { empty } from './mockNodes';

test('Should serialize to GraphQL', () => {
  const result = codeGenerators.graphql.serializeSchema(empty.nodes, empty.links, empty.tabs);
  expect(result.code).toBe('');
});
