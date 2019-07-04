import { buildASTSchema, buildClientSchema, introspectionQuery, parse, printSchema } from 'graphql';
import { Diagram, Link, Node, Old, Serializer } from 'graphsource';
import { EditorNodeDefinition, ParserTree } from '../Models';
import { OperationType } from '../Models/Spec';
import { NodesToTree } from '../NodesToTree';
import { Parser } from '../Parser';
import { TreeToFaker } from '../TreeToFaker';
import { TreeToNodes } from '../TreeToNodes';
import { TreeToTS } from '../TreeToTS';
import { Definitions } from './definitions';
/**
 * Class for controlling the state of diagram and exposing schema functions
 *
 * @export
 * @class GraphController
 */
export class GraphController {
  /**
   * Strip schema keyword from schema - useful in schema stitch
   *
   * @static
   * @memberof GraphController
   * @param {string} schema
   * @returns {string}
   */
  static getGraphqlWithoutRootSchema = (schema: string): string => {
    const basicDefinitions = Definitions.generate([]);
    const tree = TreeToNodes.resolveTree(Parser.parse(schema), basicDefinitions);
    const nodes = tree.nodes.map((n) => ({
      ...n,
      options: n.options.filter((no) => !(no in OperationType))
    }));
    return NodesToTree.parse(nodes, tree.links);
  }
  public definitions?: EditorNodeDefinition[];
  public stitchDefinitions: EditorNodeDefinition[] = [];
  public schema = '';
  public stichesCode = '';
  private nodes: Node[] = [];
  private stitchNodes: { nodes: Node[]; links: Link[] } = { nodes: [], links: [] };
  private diagram?: Diagram;
  private passSchema?: (schema: string, stitches?: string) => void;
  private passDiagramErrors?: (errors: string) => void;
  private onSerialize?: (schema: string) => void;
  setDOMElement = (element: HTMLElement) => {
    this.diagram = new Diagram(element, {
      disableLinkOperations: true
    });
    this.diagram.setSerialisationFunction(this.serialise);
    this.generateBasicDefinitions();
  }
  generateBasicDefinitions = () => {
    this.definitions = Definitions.generate([]);
    this.diagram!.setDefinitions(this.definitions);
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
  setReadOnly = (isReadOnly: boolean) => {
    this.diagram!.setReadOnly(isReadOnly);
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
    if (schema.length === 0) {
      this.resetGraph();
      return;
    }
    this.definitions = Definitions.generate(this.stitchNodes.nodes).concat(this.stitchDefinitions!);
    const result = TreeToNodes.resolveTree(
      Parser.parse(
        schema + this.stichesCode,
        this.stitchNodes.nodes.filter((n) => n.definition.root).map((n) => n.name)
      ),
      this.definitions
    );
    this.diagram!.setDefinitions(this.definitions);
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
  serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }) => {
    this.nodes = nodes;
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
        console.log(error);
        this.passDiagramErrors(error.message);
      }
      return;
    }
  }
  loadStitches = (schema: string) => {
    if (!schema) {
      return;
    }
    let basicDefinitions = Definitions.generate([]);
    this.stichesCode = schema;
    this.stitchNodes = TreeToNodes.resolveTree(Parser.parse(this.stichesCode), basicDefinitions);
    basicDefinitions = Definitions.generate(this.stitchNodes.nodes);
    const rememberBasicDefinitions = [...basicDefinitions];
    this.stitchNodes = TreeToNodes.resolveTree(Parser.parse(this.stichesCode), basicDefinitions);
    this.stitchDefinitions = basicDefinitions.filter(
      (bd) => !rememberBasicDefinitions.find((rbd) => rbd.id === bd.id)
    );
  }
  getAutocompletelibrary = () => TreeToTS.resolveTree(Parser.parse(this.stichesCode + this.schema));
  getFakerLibrary = () => TreeToFaker.resolveTree(Parser.parse(this.stichesCode + this.schema));
}
