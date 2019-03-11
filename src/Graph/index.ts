import { Diagram, Node, Link, Serializer, Old } from 'graphsource';
import { TreeToNodes } from '../TreeToNodes';
import { Parser } from '../Parser';
import { NodesToTree } from '../NodesToTree';
import { EditorNodeDefinition, ParsingFunction, ParserTree } from '../Models';
import { TreeToTS } from '../TreeToTS';
import { Definitions } from './definitions';
import { TreeToFaker } from '../TreeToFaker';
import { introspectionQuery, buildClientSchema, printSchema, parse } from 'graphql';
export class GraphController {
  private nodes: Node[] = [];
  private links: Link[] = [];
  private diagram?: Diagram;
  public definitions?: EditorNodeDefinition[];
  private passSchema?: (schema: string) => void;
  private onSerialize?: (schema: string) => void;
  private parser = new Parser();
  private currentParsingFunction: ParsingFunction = ParsingFunction.graphql;
  setDOMElement = (element: HTMLElement) => {
    this.diagram = new Diagram(element);
    this.loadDefinitions();
  };
  isEmpty = () => {
    return this.nodes.length === 0;
  };
  resizeDiagram = () => {
    this.diagram!.autoResize();
  };
  setParsingFunction = (f: ParsingFunction) => {
    this.currentParsingFunction = f;
    this.diagram!.requestSerialise();
  };
  setOnSerialise = (f: (schema: string) => void) => {
    this.onSerialize = f;
  };
  load = (nodes: Node[], links: Link[]) => {
    this.diagram!.setNodes(nodes, true);
    this.diagram!.setLinks(links);
    this.diagram!.zeroDiagram();
    this.serialise({
      nodes,
      links
    });
  };
  resetGraph = () => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    this.diagram!.setNodes(nodes);
    this.diagram!.setLinks(links);
    this.diagram!.zeroDiagram();
    this.serialise({
      nodes,
      links
    });
    this.passSchema && this.passSchema('');
  };
  loadGraphQL = (schema: string) => {
    this.loadDefinitions();
    if (schema.length === 0) {
      this.resetGraph();
      return;
    }
    const result = TreeToNodes.resolveTree(this.parser.parse(schema), this.definitions!);
    this.load(result.nodes, result.links);
  };
  loadOldFormat = (serializedDiagram: string) => {
    const deserializedOldVersion = Old.deserialize(JSON.parse(serializedDiagram));
    const deserialized = Serializer.deserialize(
      {
        nodes: deserializedOldVersion.nodes,
        links: deserializedOldVersion.links
      },
      this.definitions!
    );
    this.load(deserialized.nodes, deserialized.links);
    return deserialized;
  };
  loadSerialized = (serializedDiagram: ParserTree) => {
    const deserialized = TreeToNodes.resolveTree(serializedDiagram, this.definitions!);
    this.load(deserialized.nodes, deserialized.links);
  };
  saveSerialized = () => {
    const graphql = NodesToTree.parse(this.nodes, this.links);
    const tree = this.parser.parse(graphql);
    return JSON.stringify(tree);
  };
  getSchemaFromURL = async (url: string, header?: string): Promise<void> => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    if (header) {
      const [key, val] = header.split(':').map((k) => k.trim());
      if (!val) {
        throw new Error('Incorrect Header');
      }
      headers[key] = val;
    }
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query: introspectionQuery })
    });
    const { data, errors } = await response.json();
    if (errors) {
      throw new Error(JSON.stringify(errors, null, 2));
    }
    const c = buildClientSchema(data);
    this.loadGraphQL(printSchema(c));
  };
  setPassSchema = (fn: (schema: string) => void) => (this.passSchema = fn);
  generateFromAllParsingFunctions = () => {
    const graphql = NodesToTree.parse(this.nodes, this.links);
    const tree = this.parser.parse(graphql);
    const faker = TreeToFaker.resolveTree(tree);
    const project = this.saveSerialized();
    return {
      graphql,
      faker,
      project
    };
  };
  serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }) => {
    this.nodes = nodes;
    this.links = links;
    const graphQLSchema = NodesToTree.parse(nodes, links);
    try {
      parse(graphQLSchema);
    } catch (error) {
      console.warn(`Schema incorrect:${error}`);
      return;
    }
    this.onSerialize && this.onSerialize(graphQLSchema);
    this.passSchema &&
      this.passSchema(
        {
          [ParsingFunction.graphql]: () => graphQLSchema,
          [ParsingFunction.typescript]: () =>
            TreeToTS.resolveTree(this.parser.parse(graphQLSchema)),
          [ParsingFunction.faker]: () => TreeToFaker.resolveTree(this.parser.parse(graphQLSchema))
        }[this.currentParsingFunction]()
      );
  };
  getAutocompletelibrary = () =>
    TreeToTS.resolveTree(this.parser.parse(NodesToTree.parse(this.nodes, this.links)));
  loadDefinitions = () => {
    this.definitions = Definitions.generate();
    this.diagram!.setDefinitions(this.definitions);
    this.diagram!.setSerialisationFunction(this.serialise);
  };
}
