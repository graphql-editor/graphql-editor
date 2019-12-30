import { GraphQLPost, GraphQLScalars, GraphQLStorage, GraphQLBlog } from '../../schemas';
import { GraphController } from '../../../src/Graph';
import { TreeToNodes } from '../../../src/TreeToNodes';
import { Definitions } from '../../../src/Graph/definitions';
import { Parser } from 'graphql-zeus';

jest.mock('graphsource');
jest.mock('../../../src/TreeToNodes');
jest.mock('../../../src/Graph/definitions');
const defaultResolveTree = { nodes: [], links: [] };
TreeToNodes.resolveTree = jest.fn().mockReturnValue(defaultResolveTree);
Definitions.generate = jest.fn().mockReturnValue([]);
describe('Test Graph methods', () => {
  const schemaLibrary = `
    ${GraphQLScalars}
    ${GraphQLStorage}
    ${GraphQLPost}
    `;
  it('Loads GraphQL libraries', () => {
    const graph = new GraphController();
    graph.setDOMElement(document.createElement('div'));
    graph.loadLibraries(schemaLibrary);
    expect(graph.librariesCode).toBe(schemaLibrary);
    expect(graph.stitchDefinitions).toBeTruthy();
    expect(TreeToNodes.resolveTree).toBeCalledWith(Parser.parse(schemaLibrary), []);
  });
  it('Loads GraphQL and libraries', () => {
    const graph = new GraphController();
    graph.setDOMElement(document.createElement('div'));
    graph.loadLibraries(schemaLibrary);
    graph.loadGraphQL(GraphQLBlog);
    expect(graph.nodes).toBeTruthy();
  });
});
