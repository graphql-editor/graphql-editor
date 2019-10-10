import { buildASTSchema, parse } from 'graphql';
import { OperationType, Parser, ParserTree, Utils, Value } from 'graphql-zeus';
import {
  DefaultDiagramTheme,
  Diagram,
  DiagramEvents,
  Link,
  Node,
  Old,
  Serializer
} from 'graphsource';
import { Colors } from '../Colors';
import { CodeSearchQuery } from '../editor/CodeSearch';
import { EditorNodeDefinition } from '../Models';
import { NodesToTree } from '../NodesToTree';
import { TreeToNodes } from '../TreeToNodes';
import { Definitions } from './definitions';
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
      options: n.options.filter((no) => !(no in OperationType))
    }));
    return NodesToTree.parse(nodes, tree.links);
  }
  public definitions?: EditorNodeDefinition[];
  public stitchDefinitions: EditorNodeDefinition[] = [];
  public schema = '';
  public stichesCode = '';
  private nodes: Node[] = [];
  private links: Link[] = [];
  private stitchNodes: { nodes: Node[]; links: Link[] } = { nodes: [], links: [] };
  private diagram?: Diagram;
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
        detailedLinks: 0.9
      },
      theme: {
        ...DefaultDiagramTheme,
        node: {
          ...DefaultDiagramTheme.node,
          spacing: {
            ...DefaultDiagramTheme.node.spacing
          }
        },
        description: {
          ...DefaultDiagramTheme.description
        },
        menu: {
          ...DefaultDiagramTheme.menu,
          category: {
            ...DefaultDiagramTheme.menu.category,
            fontSize: '12px'
          }
        },
        help: {
          ...DefaultDiagramTheme.help
        },
        colors: {
          ...DefaultDiagramTheme.colors,
          background: Colors.grey[8],
          help: {
            ...DefaultDiagramTheme.colors.help,
            title: Colors.yellow[0]
          },
          port: {
            ...DefaultDiagramTheme.colors.port,
            background: Colors.grey[6]
          },
          link: {
            ...DefaultDiagramTheme.colors.link,
            main: Colors.grey[2]
          },
          node: {
            ...DefaultDiagramTheme.colors.node,
            background: Colors.grey[7],
            type: Colors.grey[0],
            hover: {
              type: Colors.main[0]
            },
            types: {
              type: Colors.main[0],
              union: Colors.main[0],
              input: Colors.main[0],
              scalar: Colors.main[0],
              interface: Colors.main[0],
              enum: Colors.main[0],
              directive: Colors.main[0],
              String: Colors.green[0],
              Int: Colors.green[0],
              Boolean: Colors.green[0],
              ID: Colors.green[0],
              Float: Colors.green[0]
            },
            options: {
              required: Colors.red[0],
              array: Colors.yellow[0]
            }
          }
        }
      }
    });
    this.diagram.on(DiagramEvents.LinkCreated, this.onCreateLink);
    this.diagram.on(DiagramEvents.NodeCreated, this.onCreateNode);
    this.diagram.on(DiagramEvents.DataModelChanged, this.serialise);
    this.generateBasicDefinitions();
  }
  /**
   * Generate basic defintions for GraphQL like type,input,directive etc..
   */
  generateBasicDefinitions = () => {
    this.definitions = Definitions.generate([]);
    this.diagram!.setDefinitions(this.definitions);
  }
  /**
   * Checks if graph is empty
   */
  isEmpty = (): boolean => {
    return this.nodes.length === 0;
  }
  /**
   * Call diagram resize
   */
  resizeDiagram = (): void => {
    this.diagram!.autoResize();
  }
  /**
   * Set function to be called on serialise
   */
  setOnSerialise = (f: (schema: string) => void) => {
    this.onSerialize = f;
  }
  /**
   * Function to control editable state of diagram
   */
  setReadOnly = (isReadOnly: boolean) => {
    this.diagram!.setReadOnly(isReadOnly);
  }
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
      links
    });
    if (this.passSchema) {
      this.passSchema('', this.stichesCode);
    }
  }
  /**
   * Reset stitches code
   */
  resetStitches = () => {
    this.stitchNodes.nodes = [];
    this.stitchNodes.links = [];
    this.stitchDefinitions = [];
  }
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
        this.stitchNodes.nodes.filter((n) => n.definition.root).map((n) => n.name)
      ),
      this.definitions
    );
    this.diagram!.setDefinitions(this.definitions);
    this.load(result.nodes, result.links);
  }
  searchAndCenterNode(query: CodeSearchQuery) {
    if (query.subject && query.parent) {
      const subjects = this.nodes.filter(
        (node) => node.name.toLowerCase() === query.subject!.toLowerCase()
      );
      const parentNodes = this.nodes.filter(
        (node) => node.name.toLowerCase() === query.parent!.toLowerCase()
      );
      const matchingPairs = parentNodes.reduce<Node[]>((acc, currentParentNode) => {
        const matchingSubject = subjects.find(
          (subject) =>
            !!this.links.find(
              (link) => link.o.id === subject.id && link.i.id === currentParentNode.id
            )
        );
        if (matchingSubject) {
          acc.push(matchingSubject);
        }
        return acc;
      }, []);

      if (matchingPairs.length) {
        const [subject] = matchingPairs;
        this.diagram!.selectNode(subject);
        this.diagram!.centerOnNode(subject);
      }
      return;
    }

    if (query.subject) {
      const foundNodes = this.nodes.filter(
        (node) => node.name.toLowerCase() === query.subject!.toLowerCase()
      );
      if (this.diagram && foundNodes.length) {
        this.diagram!.selectNode(foundNodes[0]);
        this.diagram!.centerOnNode(foundNodes[0]);
      }
    }
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
   */
  getSchemaFromURL = async (url: string, header?: string): Promise<void> => {
    const schema = await Utils.getFromUrl(url, header);
    this.loadGraphQL(schema);
  }
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
    this.stitchDefinitions = basicDefinitions.filter(
      (bd) => !rememberBasicDefinitions.find((rbd) => rbd.id === bd.id)
    );
  }
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
   */
  private serialise = ({ nodes, links }: { nodes: Node[]; links: Link[] }): void => {
    this.nodes = nodes;
    this.links = links;
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
        (n) =>
          n.name.length === 0 &&
          n.definition.data &&
          (n.definition.data as any).type !== Value.StringValue
      );
      if (unNamedNode) {
        throw new Error(
          `Every node should have a name. Please fill in a name and click enter or defocus`
        );
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
