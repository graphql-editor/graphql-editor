import { Parser, ParserTree, Value, TreeToGraphQL } from 'graphql-zeus';
import { Diagram, Link } from 'graphsource';
import { EditorNodeDefinition, EditorNode, PassedSchema } from '../Models';
import { NodesToTree } from '../NodesToTree';
import { TreeToNodes } from '../TreeToNodes';
import { Definitions } from './definitions';
import { theme } from './theme';
import { Workers } from '../worker';
/**
 * Class for controlling the state of diagram and exposing schema functions
 */
export class GraphController {
  /**
   * Strip schema keyword from schema - useful in schema stitch
   */
  static getGraphqlWithoutRootSchema = (schema: string): string => {
    const tree = Parser.parse(schema);
    tree.nodes.map((n) => ({
      ...n,
      type: {
        ...n.type,
        operations: undefined,
      },
    }));
    return TreeToGraphQL.parse(tree);
  };

  public definitions: EditorNodeDefinition[] = [];
  public stitchDefinitions: EditorNodeDefinition[] = [];
  public schema = '';
  public librariesCode: string | undefined;
  public nodes: EditorNode[] = [];
  public selectedNodes: EditorNode[] = [];
  private libraryNodes: { nodes: EditorNode[]; links: Link[] } = { nodes: [], links: [] };
  public diagram?: Diagram;
  private passSelectedNodes?: (nodes: EditorNode[]) => void;
  private passSchema?: (props: PassedSchema) => void;
  private passDiagramErrors?: (errors: string) => void;
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
    this.diagram.eventBus.on('LinkCreated', this.onCreateLink);
    this.diagram.eventBus.on('NodeCreated', this.onCreateNode);
    this.diagram.eventBus.on('NodeSelected', this.onSelectNode);
    this.diagram.eventBus.on('DataModelChanged', this.serialise);
    this.generateBasicDefinitions();
  };
  /**
   * Generate basic defintions for GraphQL like type,input,directive etc..
   */
  generateBasicDefinitions = () => {
    this.definitions = Definitions.generate([]);
    if (!this.diagram) {
      throw new Error(`Cannot run generateBasicDefinitions as diagram is not ready`);
    }
    this.diagram.setDefinitions(this.definitions);
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
    if (!this.diagram) {
      throw new Error(`Cannot run resizeDiagram as diagram is not ready`);
    }
    this.diagram.autoResize();
  };
  /**
   * Set function to pass currently selected nodes
   */
  setPassSelectedNodes = (f: (nodes: EditorNode[]) => void) => {
    this.passSelectedNodes = f;
  };
  /**
   * Function to control editable state of diagram
   */
  setReadOnly = (isReadOnly: boolean) => {
    if (!this.diagram) {
      throw new Error(`Cannot run setReadOnly as diagram is not ready`);
    }
    this.diagram.setReadOnly(isReadOnly);
  };
  /**
   * Move grpah to 0,0
   */
  zeroGraph = () => {
    if (!this.diagram) {
      throw new Error(`Cannot run zeroGraph as diagram is not ready`);
    }
    this.diagram.zeroDiagram();
  };
  /**
   * Reset Graph clearing all the nodes and links from it
   */
  resetGraph = () => {
    const nodes: EditorNode[] = [];
    const links: Link[] = [];
    this.definitions = Definitions.generate(this.libraryNodes.nodes).concat(this.stitchDefinitions);
    if (!this.diagram) {
      throw new Error(`Cannot run resetGraph as diagram is not ready`);
    }
    this.diagram.setNodes(nodes);
    this.diagram.setLinks(links);
    this.diagram.setDefinitions(this.definitions);
    this.serialise({
      nodes,
      links,
    });
    if (this.passSchema) {
      this.passSchema({
        code: '',
        libraries: this.librariesCode,
      });
    }
    this.diagram?.forceRender();
  };
  /**
   * Reset stitches code
   */
  resetStitches = () => {
    this.libraryNodes.nodes = [];
    this.libraryNodes.links = [];
    this.stitchDefinitions = [];
  };
  loadGraphQLAndLibraries = ({
    schema,
    libraries,
    forceZero,
  }: {
    schema: string;
    libraries: string;
    forceZero?: boolean;
  }) => {
    if (this.schema === schema) {
      if (libraries === this.librariesCode) {
        return;
      }
    }
    this.loadLibraries(libraries);
    this.loadGraphQL(schema, forceZero);
  };
  /**
   * Load GraphQL code and convert it to diagram nodes
   */
  loadGraphQL = (schema: string, forceZero?: boolean) => {
    const zeroGraph = this.schema.length === 0 && !!schema;
    this.definitions = Definitions.generate(this.libraryNodes.nodes).concat(this.stitchDefinitions);
    if (!this.diagram) {
      throw new Error(`Cannot run loadGraphQL as diagram is not ready`);
    }
    this.diagram.setDefinitions(this.definitions);
    if (schema.length === 0) {
      this.resetGraph();
      return;
    }
    if (this.librariesCode) {
      const excludeLibraryNodesFromDiagram = Parser.parse(this.librariesCode);
      const parsedResult = Parser.parse(schema, [], this.librariesCode);
      const filteredResult: ParserTree = {
        nodes: parsedResult.nodes.filter(
          (n) =>
            !excludeLibraryNodesFromDiagram.nodes.find((eln) => eln.name === n.name && eln.data.type === n.data.type),
        ),
      };
      const result = TreeToNodes.resolveTree(filteredResult, this.definitions);
      this.diagram.setDefinitions(this.definitions);
      this.load(result.nodes, result.links);
    } else {
      const parsedResult = Parser.parse(schema);
      const result = TreeToNodes.resolveTree(parsedResult, this.definitions);
      this.diagram.setDefinitions(this.definitions);
      this.load(result.nodes, result.links);
    }
    if (zeroGraph || forceZero) {
      this.zeroGraph();
    } else {
      this.diagram?.forceRender();
    }
  };
  /**
   * Load stitches code to Graph controller
   */
  loadLibraries = (schema: string): void => {
    this.librariesCode = schema;
    if (schema.length === 0) {
      this.libraryNodes = {
        nodes: [],
        links: [],
      };
      this.stitchDefinitions = [];
      return;
    }
    let basicDefinitions = Definitions.generate([]);
    this.libraryNodes = TreeToNodes.resolveTree(Parser.parse(this.librariesCode), basicDefinitions);
    basicDefinitions = Definitions.generate(this.libraryNodes.nodes);
    const rememberBasicDefinitions = [...basicDefinitions];
    this.libraryNodes = TreeToNodes.resolveTree(Parser.parse(this.librariesCode), basicDefinitions);
    this.stitchDefinitions = basicDefinitions.filter((bd) => !rememberBasicDefinitions.find((rbd) => rbd.id === bd.id));
  };
  centerOnNodeByID = (id: string) => {
    const node = this.nodes.find((n) => n.id === id);
    if (!this.diagram) {
      throw new Error(`Cannot run centerOnNodeByID as diagram is not ready`);
    }
    if (!node) {
      throw new Error('Cannot center on that node as it doesnt exist');
    }
    this.diagram.selectNode(node);
    this.diagram.centerOnNode(node);
    this.selectedNodes = [node];
  };

  /**
   * Load from serialized ParserTree
   *
   * @param serializedDiagram
   * @memberof GraphController
   */
  loadSerialized = (serializedDiagram: ParserTree) => {
    const deserialized = TreeToNodes.resolveTree(serializedDiagram, this.definitions);
    this.load(deserialized.nodes, deserialized.links);
  };
  setPassSchema = (fn: (props: PassedSchema) => void) => (this.passSchema = fn);
  setPassDiagramErrors = (fn: (errors: string) => void) => (this.passDiagramErrors = fn);
  screenShot = async () => {
    if (!this.diagram) {
      throw new Error(`Cannot run screenShot as diagram is not ready`);
    }
    return this.diagram.screenShot();
  };
  /**
   * Load nodes and links into diagram
   *
   * @param nodes
   * @param links
   */
  private load = (nodes: EditorNode[], links: Link[]) => {
    if (!this.diagram) {
      throw new Error(`Cannot run load as diagram is not ready`);
    }
    this.diagram.setNodes(nodes, true);
    this.diagram.setLinks(links);
    this.serialise({
      nodes,
      links,
    });
  };
  /**
   * Serialise nodes to GraphQL
   */
  private serialise = ({ nodes, links }: { nodes: EditorNode[]; links: Link[] }) => {
    this.nodes = nodes;
    let graphQLSchema = '';
    if (nodes.length === 0) {
      this.schema = graphQLSchema;
      if (this.passSchema) {
        this.passSchema({
          code: graphQLSchema,
          libraries: this.librariesCode,
        });
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
      Workers.validate(graphQLSchema, this.librariesCode).then((errors) => {
        if (errors.length > 0) {
          if (this.passDiagramErrors) {
            this.passDiagramErrors(errors.map((e) => e.text).join('\n\n'));
          }
          return;
        }
        this.schema = graphQLSchema;
        if (this.passSchema) {
          this.passSchema({
            code: graphQLSchema,
            libraries: this.librariesCode,
          });
        }
        if (this.nodeCreated) {
          this.nodeCreated = false;
          this.reloadSchema = false;
        }
        if (this.reloadSchema) {
          this.reloadSchema = false;
          this.loadGraphQL(graphQLSchema);
        }
      });
    } catch (error) {
      if (this.passDiagramErrors) {
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
  private onSelectNode = ({ selectedNodes }: { selectedNodes: EditorNode[] }) => {
    this.selectedNodes = selectedNodes;
    if (this.passSelectedNodes) {
      this.passSelectedNodes(this.selectedNodes);
    }
  };
}
