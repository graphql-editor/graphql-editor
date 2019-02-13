import { Diagram, Node, Link } from 'graphsource';
import { TreeToNodes } from '../TreeToNodes';
import { Parser } from '../Parser';
import { NodesToTree } from '../NodesToTree';
import { EditorNodeDefinition, ParsingFunction } from '../Models';
import { TreeToTS } from '../TreeToTS';
import { Definitions } from './definitions';
import { TreeToFaker } from '../TreeToFaker';
import { GraphQLSchema, buildClientSchema, introspectionQuery } from 'graphql';


export class GraphController {
  diagram?: Diagram;
  public definitions?: EditorNodeDefinition[];
  passSchema?: (schema: string) => void;
  parser = new Parser();
  currentParsingFunction: ParsingFunction = ParsingFunction.graphql;
  setDOMElement = (element: HTMLElement) => {
    this.diagram = new Diagram(element);
    this.loadDefinitions();
  };
  setParsingFunction = (f: ParsingFunction) => {
    this.currentParsingFunction = f;
    this.diagram!.requestSerialise();
  };
  load = (schema: string) => {
    const result = TreeToNodes.resolveTree(this.parser.parse(schema), this.definitions!);
    this.diagram!.setDefinitions(this.definitions!);
    this.diagram!.setNodes(result.nodes, true);
    this.serialise({
      nodes: result.nodes,
      links: result.links
    });
    this.diagram!.setLinks(result.links);
  };
  static getSchemaFromURL = async (url: string): Promise<GraphQLSchema> => {
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
  setPassSchema = (fn: (schema: string) => void) => (this.passSchema = fn);
  serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }) =>
    this.passSchema &&
    this.passSchema(
      {
        [ParsingFunction.graphql]: () => NodesToTree.parse(nodes, links),
        [ParsingFunction.typescript]: () =>
          TreeToTS.resolveTree(this.parser.parse(NodesToTree.parse(nodes, links))),
        [ParsingFunction.faker]: () =>
          TreeToFaker.resolveTree(this.parser.parse(NodesToTree.parse(nodes, links)))
      }[this.currentParsingFunction]()
    );
  loadDefinitions = () => {
    this.definitions = Definitions.generate();

    this.diagram!.setDefinitions(this.definitions);
    this.diagram!.setSerialisationFunction(this.serialise);
  };
}
