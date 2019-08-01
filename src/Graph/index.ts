import { buildASTSchema, parse } from 'graphql';
import { OperationType, Parser, ParserTree, TreeToTS, Utils } from 'graphql-zeus';
import { Diagram, DiagramEvents, Link, Node, Old, Serializer } from 'graphsource';
import { EditorNodeDefinition } from '../Models';
import { NodesToTree } from '../NodesToTree';
import { TreeToFaker } from '../TreeToFaker';
import { TreeToNodes } from '../TreeToNodes';
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
   * @param schema
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
  private reloadSchema?: boolean;
  private nodeCreated?: boolean;
  /**
   * Set DOM element which holds diagram
   *
   * @param element DOM element
   */
  setDOMElement = (element: HTMLElement): void => {
    this.diagram = new Diagram(element, {
      disableLinkOperations: true,
      drawingDistance: {
        nodeArrows: 0.5,
        nodeOptions: 0.5,
        nodeTitle: 0.5,
        nodeType: 0.5,
        detailedLinks: 0.9
      }
    });
    this.diagram.on(DiagramEvents.LinkCreated, this.onCreateLink);
    this.diagram.on(DiagramEvents.NodeCreated, this.onCreateNode);
    this.diagram.on(DiagramEvents.DataModelChanged, this.serialise);
    this.generateBasicDefinitions();
  }
  /**
   * Generate basic defintions for GraphQL like type,input,directive etc..
   *
   * @memberof GraphController
   */
  generateBasicDefinitions = () => {
    this.definitions = Definitions.generate([]);
    this.diagram!.setDefinitions(this.definitions);
  }
  /**
   * Checks if graph is empty
   *
   * @returns {boolean}
   * @memberof GraphController
   */
  isEmpty = (): boolean => {
    return this.nodes.length === 0;
  }
  /**
   * Call diagram resize
   *
   * @memberof GraphController
   */
  resizeDiagram = (): void => {
    this.diagram!.autoResize();
  }
  /**
   * Set function to be called on serialise
   *
   * @param f function to be called
   * @memberof GraphController
   */
  setOnSerialise = (f: (schema: string) => void) => {
    this.onSerialize = f;
  }
  /**
   * Function to control editable state of diagram
   *
   * @memberof GraphController
   * @param isReadOnly pass if diagram is readonly
   */
  setReadOnly = (isReadOnly: boolean) => {
    this.diagram!.setReadOnly(isReadOnly);
  }
  /**
   * Reset Graph clearing all the nodes and links from it
   *
   * @memberof GraphController
   */
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
  /**
   * Load GraphQL code and convert it to diagram nodes
   *
   * @param schema
   * @returns
   * @memberof GraphController
   */
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
  /**
   * Load from serialized ParserTree
   *
   * @param serializedDiagram
   * @memberof GraphController
   */
  loadSerialized = (serializedDiagram: ParserTree) => {
    const deserialized = TreeToNodes.resolveTree(serializedDiagram, this.definitions!);
    this.load(deserialized.nodes, deserialized.links);
  }
  /**
   * Get schema from URL and load it to graph
   *
   * @param url GraphQL schema url
   * @param [header] additional header
   */
  getSchemaFromURL = async (url: string, header?: string): Promise<void> => {
    const schema = await Utils.getFromUrl(url, header);
    this.loadGraphQL(schema);
  }
  setPassSchema = (fn: (schema: string, stitches?: string) => void) => (this.passSchema = fn);
  setPassDiagramErrors = (fn: (errors: string) => void) => (this.passDiagramErrors = fn);
  /**
   * Load stitches code to Graph controller
   *
   * @param schema stitches code in GraphQL
   */
  loadStitches = (schema: string): void => {
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
  /**
   * Returns generated string for typescript library
   *
   * @returns {string}
   */
  getAutocompletelibrary = (): string =>
    TreeToTS.resolveTree(Parser.parse(this.stichesCode + this.schema))
  /**
   * Returns generated string for faker library
   *
   * @returns {string}
   */
  getFakerLibrary = (): string =>
    TreeToFaker.resolveTree(Parser.parse(this.stichesCode + this.schema))
  /**
   * Load nodes and links into diagram
   *
   * @param nodes
   * @param links
   */
  private load = (nodes: Node[], links: Link[]) => {
    this.diagram!.setNodes(nodes, true);
    this.diagram!.setLinks(links);
    this.diagram!.zeroDiagram();
    this.serialise({
      nodes,
      links
    });
  }
  /**
   * Serialise nodes to GraphQL
   *
   * @private
   * @param} { nodes, links }
   * @returns
   */
  private serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }): void => {
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
      if (this.nodeCreated) {
        this.nodeCreated = false;
        this.reloadSchema = false;
      }
      if (this.reloadSchema) {
        this.reloadSchema = false;
        this.loadGraphQL(graphQLSchema);
      }
    } catch (error) {
      if (this.passDiagramErrors) {
        // tslint:disable
        console.log(error);
        // tslint:enable
        this.passDiagramErrors(error.message);
      }
      return;
    }
  }
  /**
   * Fired on new link creation
   */
  private onCreateLink = () => {
    this.reloadSchema = true;
  }
  /**
   * Fired on new node creation
   */
  private onCreateNode = () => {
    this.nodeCreated = true;
  }
}
