import { buildASTSchema, buildClientSchema, introspectionQuery, parse, printSchema } from 'graphql';
import { Diagram, Link, Node, NodeUtils, Old, Serializer } from 'graphsource';
import { TempSchema } from '../editor/TempSchema';
import { EditorNodeDefinition, ParserTree } from '../Models';
import { NodesToTree } from '../NodesToTree';
import { Parser } from '../Parser';
import { TreeToFaker } from '../TreeToFaker';
import { TreeToNodes } from '../TreeToNodes';
import { TreeToTS } from '../TreeToTS';
import { Definitions } from './definitions';
export class GraphController {
  public definitions?: EditorNodeDefinition[];
  public stitchDefinitions: EditorNodeDefinition[] = [];
  public schema = '';
  public stichesCode = '';
  private nodes: Node[] = [];
  private links: Link[] = [];
  private diagram?: Diagram;
  private passSchema?: (schema: string, stitches?: string) => void;
  private passDiagramErrors?: (errors: string) => void;
  private onSerialize?: (schema: string) => void;
  private parser = new Parser();
  setDOMElement = (element: HTMLElement) => {
    this.diagram = new Diagram(element);
    this.loadDefinitions();
  }
  isEmpty = () => {
    return this.nodes.length === 0;
  }
  resizeDiagram = () => {
    this.diagram!.autoResize();
  }
  setOnSerialise = (f: (schema: string) => void) => {
    this.onSerialize = f;
  }
  load = (nodes: Node[], links: Link[]) => {
    this.diagram!.setNodes(nodes, true);
    this.diagram!.setLinks(links);
    this.diagram!.zeroDiagram();
    this.serialise({
      nodes,
      links
    });
  }
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
    if (this.passSchema) {
      this.passSchema('', this.stichesCode);
    }
  }
  loadGraphQL = (schema: string) => {
    this.loadDefinitions();
    if (schema.length === 0) {
      this.resetGraph();
      return;
    }
    let stitchNodes: {
      nodes: Node[];
      links: Link[];
    } = {
      nodes: [],
      links: []
    };
    if (this.stichesCode) {
      stitchNodes = TreeToNodes.resolveTree(this.parser.parse(this.stichesCode), this.definitions!);
    }

    const result = TreeToNodes.resolveTree(
      this.parser.parse(
        schema + this.stichesCode,
        stitchNodes.nodes.filter((n) => n.definition.root).map((n) => n.name)
      ),
      this.definitions!
    );

    this.load(result.nodes, result.links);
  }
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
  }
  loadSerialized = (serializedDiagram: ParserTree) => {
    const deserialized = TreeToNodes.resolveTree(serializedDiagram, this.definitions!);
    this.load(deserialized.nodes, deserialized.links);
  }
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
  }
  setPassSchema = (fn: (schema: string, stitches?: string) => void) => (this.passSchema = fn);
  setPassDiagramErrors = (fn: (errors: string) => void) => (this.passDiagramErrors = fn);
  generateFromAllParsingFunctions = () => {
    const graphql = NodesToTree.parse(this.nodes, this.links);
    this.schema = graphql;
    const tree = this.parser.parse(graphql);
    const faker = TreeToFaker.resolveTree(tree);
    const project = this.saveSerialized();
    return {
      graphql,
      faker,
      project
    };
  }
  serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }) => {
    this.nodes = nodes;
    this.links = links;
    const graphQLSchema = NodesToTree.parse(nodes, links);
    try {
      buildASTSchema(parse(graphQLSchema + this.stichesCode));
      this.schema = graphQLSchema;
      if (this.onSerialize) {
        this.onSerialize(graphQLSchema);
      }
      if (this.passSchema) {
        this.passSchema(graphQLSchema, this.stichesCode);
      }
    } catch (error) {
      if (this.passDiagramErrors) {
        this.passDiagramErrors(error.message);
      }
      return;
    }
  }
  loadStitches = (schema: string = TempSchema) => {
    this.stichesCode = schema;
    const result = TreeToNodes.resolveTree(this.parser.parse(schema), Definitions.generate());
    this.stitchDefinitions = result.nodes
      .filter((n) => n.definition.root)
      .map((n) =>
        NodeUtils.createObjectDefinition(
          this.definitions!.find((d) => d.type === n.definition.type)!,
          n.name
        )
      )
      .reduce((a, b) => [...a!, ...b!]);
  }
  getAutocompletelibrary = () =>
    TreeToTS.resolveTree(this.parser.parse(NodesToTree.parse(this.nodes, this.links)))
  loadDefinitions = () => {
    this.definitions = Definitions.generate();
    this.diagram!.setDefinitions(this.definitions);
    this.diagram!.setSerialisationFunction(this.serialise);
  }
  private saveSerialized = () => {
    const graphql = NodesToTree.parse(this.nodes, this.links);
    this.schema = graphql;
    const tree = this.parser.parse(graphql);
    return JSON.stringify(tree);
  }
}
