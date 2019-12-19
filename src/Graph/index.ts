import { buildASTSchema, parse } from 'graphql';
import { OperationType, Parser, ParserTree, Utils, Value } from 'graphql-zeus';
import { Diagram, DiagramEvents, Link, Node, Old, Serializer } from 'graphsource';
import { ScreenPosition } from 'graphsource/lib/IO/ScreenPosition';
import { EditorNodeDefinition } from '../Models';
import { NodesToTree } from '../NodesToTree';
import { TreeToNodes } from '../TreeToNodes';
import { Definitions } from './definitions';
import { theme } from './theme';
/**
 * Class for controlling the state of diagram and exposing schema functions
 */
export class GraphController {
  /**
   * Strip schema keyword from schema - useful in schema stitch
   */
  static getGraphqlWithoutRootSchema = (schema: string): string => {
    const basicDefinitions = Definitions.generate([]);
    const tree = TreeToNodes.resolveTree(Parser.parse(schema), basicDefinitions);
    const nodes = tree.nodes.map((n) => ({
      ...n,
      options: n.options.filter((no) => !(no in OperationType)),
    }));
    return NodesToTree.parse(nodes, tree.links);
  };

  static flatNodeInputs = (node: Node): Node[] =>
    node.inputs ? [...node.inputs, node.inputs.map(GraphController.flatNodeInputs)].flat(Infinity) : ([] as Node[]);
  public definitions?: EditorNodeDefinition[];
  public stitchDefinitions: EditorNodeDefinition[] = [];
  public schema = '';
  public stichesCode = '';
  public nodes: Node[] = [];
  public selectedNodes: Node[] = [];
  private stitchNodes: { nodes: Node[]; links: Link[] } = { nodes: [], links: [] };
  private diagram?: Diagram;
  private passSelectedNodes?: (nodes: Node[]) => void;
  private passSchema?: (schema: string, stitches?: string) => void;
  private passDiagramErrors?: (errors: string) => void;
  private onSerialize?: (schema: string) => void;
  private reloadSchema?: boolean;
  private nodeCreated?: boolean;
  /**
   * Set DOM element which holds diagram
   */
  setDOMElement = (element: HTMLElement): void => {
    this.diagram = new Diagram(element, {
      disableLinkOperations: true,
      drawingDistance: {
        nodeArrows: 0.5,
        nodeOptions: 0.5,
        nodeTitle: 0.5,
        nodeType: 0.5,
        detailedLinks: 0.9,
      },
      theme,
    });
    this.diagram.on(DiagramEvents.LinkCreated, this.onCreateLink);
    this.diagram.on(DiagramEvents.NodeCreated, this.onCreateNode);
    this.diagram.on(DiagramEvents.NodeSelected, this.onSelectNode);
    this.diagram.on(DiagramEvents.DataModelChanged, this.serialise);
    this.generateBasicDefinitions();
  };
  /**
   * Generate basic defintions for GraphQL like type,input,directive etc..
   */
  generateBasicDefinitions = () => {
    this.definitions = Definitions.generate([]);
    this.diagram!.setDefinitions(this.definitions);
  };
  /**
   * Checks if graph is empty
   */
  isEmpty = (): boolean => {
    return this.nodes.length === 0;
  };
  /**
   * Call diagram resize
   */
  resizeDiagram = (): void => {
    this.diagram!.autoResize();
  };
  /**
   * Set function to be called on serialise
   */
  setOnSerialise = (f: (schema: string) => void) => {
    this.onSerialize = f;
  };

  /**
   * Set function to pass currently selected nodes
   */
  setPassSelectedNodes = (f: (nodes: Node[]) => void) => {
    this.passSelectedNodes = f;
  };
  /**
   * Function to control editable state of diagram
   */
  setReadOnly = (isReadOnly: boolean) => {
    this.diagram!.setReadOnly(isReadOnly);
  };
  /**
   * Reset Graph clearing all the nodes and links from it
   */
  resetGraph = () => {
    const nodes: Node[] = [];
    const links: Link[] = [];
    this.definitions = Definitions.generate(this.stitchNodes.nodes).concat(this.stitchDefinitions!);
    this.diagram!.setNodes(nodes);
    this.diagram!.setLinks(links);
    this.diagram!.setDefinitions(this.definitions);
    this.diagram!.zeroDiagram();
    this.serialise({
      nodes,
      links,
    });
    if (this.passSchema) {
      this.passSchema('', this.stichesCode);
    }
  };
  /**
   * Reset stitches code
   */
  resetStitches = () => {
    this.stitchNodes.nodes = [];
    this.stitchNodes.links = [];
    this.stitchDefinitions = [];
  };
  /**
   * Load GraphQL code and convert it to diagram nodes
   */
  loadGraphQL = (schema: string) => {
    this.definitions = Definitions.generate(this.stitchNodes.nodes).concat(this.stitchDefinitions!);
    this.diagram!.setDefinitions(this.definitions);
    if (schema.length === 0) {
      this.resetGraph();
      return;
    }
    const result = TreeToNodes.resolveTree(
      Parser.parse(
        schema + this.stichesCode,
        this.stitchNodes.nodes.filter((n) => n.definition.root).map((n) => n.name),
      ),
      this.definitions,
    );
    this.diagram!.setDefinitions(this.definitions);
    this.load(result.nodes, result.links);
  };
  centerOnNodeByID = (id: string) => {
    const node = this.nodes.find((n) => n.id === id)!;
    this.diagram!.selectNode(node);
    this.diagram!.centerOnNode(node);
    this.selectedNodes = [node];
  };

  loadOldFormat = (serializedDiagram: string) => {
    const deserializedOldVersion = Old.deserialize(JSON.parse(serializedDiagram));
    const deserialized = Serializer.deserialize(
      {
        nodes: deserializedOldVersion.nodes,
        links: deserializedOldVersion.links,
      },
      this.definitions!,
    );
    this.load(deserialized.nodes, deserialized.links);
    return deserialized;
  };
  /**
   * Load from serialized ParserTree
   *
   * @param serializedDiagram
   * @memberof GraphController
   */
  loadSerialized = (serializedDiagram: ParserTree) => {
    const deserialized = TreeToNodes.resolveTree(serializedDiagram, this.definitions!);
    this.load(deserialized.nodes, deserialized.links);
  };
  /**
   * Get schema from URL and load it to graph
   */
  getSchemaFromURL = async (url: string, header?: string): Promise<void> => {
    const schema = await Utils.getFromUrl(url, header);
    this.loadGraphQL(schema);
  };
  setPassSchema = (fn: (schema: string, stitches?: string) => void) => (this.passSchema = fn);
  setPassDiagramErrors = (fn: (errors: string) => void) => (this.passDiagramErrors = fn);
  /**
   * Load stitches code to Graph controller
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
    this.stitchDefinitions = basicDefinitions.filter((bd) => !rememberBasicDefinitions.find((rbd) => rbd.id === bd.id));
  };
  screenShot = async () => this.diagram!.screenShot();
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
      links,
    });
  };
  /**
   * Serialise nodes to GraphQL
   */
  private serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }): void => {
    this.nodes = nodes;
    let graphQLSchema = '';
    if (nodes.length === 0) {
      this.schema = graphQLSchema;
      if (this.onSerialize) {
        this.onSerialize(graphQLSchema);
      }
      if (this.passSchema) {
        this.passSchema(graphQLSchema, this.stichesCode);
      }
      return;
    }
    graphQLSchema = NodesToTree.parse(nodes, links);
    try {
      const unNamedNode = this.nodes.find(
        (n) => n.name.length === 0 && n.definition.data && (n.definition.data as any).type !== Value.StringValue,
      );
      if (unNamedNode) {
        throw new Error(`Every node should have a name. Please fill in a name and click enter or defocus`);
      }
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
  };
  /**
   * Fired on new link creation
   */
  private onCreateLink = () => {
    this.reloadSchema = true;
  };
  /**
   * Fired on new node creation
   */
  private onCreateNode = () => {
    this.nodeCreated = true;
  };
  private onSelectNode = ([_, nodes]: [ScreenPosition, Node[]]) => {
    this.selectedNodes = nodes;
    if (this.passSelectedNodes) {
      this.passSelectedNodes(this.selectedNodes);
    }
  };
}
