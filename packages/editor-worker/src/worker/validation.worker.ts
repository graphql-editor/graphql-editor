import {
  NumberNode,
  calcDimensions,
  sortNodesTs,
  storeCoordinates,
} from "@/tsAlgo";
import { catchSchemaErrors, EditorError } from "@/validation";
import {
  Parser,
  ParserField,
  ParserTree,
  TreeToGraphQL,
  mergeTrees,
} from "graphql-js-tree";
import { getTokenAtPosition, IPosition } from "graphql-language-service";
const ctx: Worker = self as any;

export type WorkerEvents = {
  validate: {
    args: {
      schema: string;
      libraries?: string;
    };
    returned: EditorError[];
  };
  parse: {
    args: {
      tree: ParserTree;
    };
    returned: string;
  };
  parseSchema: {
    args: {
      schema: string;
      libraries?: string;
    };
    returned: ParserTree;
  };
  token: {
    args: {
      document: string;
      position: Pick<IPosition, "character" | "line">;
    };
    returned: string;
  };
  simulateSort: {
    args: {
      nodes: ParserField[];
      options: {
        existingNumberNodes?: NumberNode[];
        iterations?: number;
        ignoreAlphaCalculation?: boolean;
        alpha?: number;
      };
    };
    returned: {
      nodes: NumberNode[];
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
};

const receive =
  <T extends keyof WorkerEvents>(
    key: T,
    fn: (args: WorkerEvents[T]["args"]) => WorkerEvents[T]["returned"]
  ) =>
  (message: MessageEvent) => {
    const m = message.data;
    if (m.event === key)
      try {
        const data = fn(m);
        postMessage({
          data,
          event: key,
          id: m.id,
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          postMessage({
            error: error.message,
            event: key,
            id: m.id,
          });
        }
      }
  };

ctx.addEventListener("message", (message) => {
  receive("validate", (args) => catchSchemaErrors(args.schema, args.libraries))(
    message
  );
  receive("parse", (args) =>
    TreeToGraphQL.parse({
      nodes: args.tree.nodes
        .filter((n) => !n.fromLibrary)
        .map((n) => ({
          ...n,
          args: n.args.filter((a) => !a.fromLibrary),
          directives: n.directives.filter((a) => !a.fromLibrary),
        })),
    })
  )(message);
  receive("parseSchema", (args) => {
    const mtress = mergeTrees(
      Parser.parse(args.schema),
      args.libraries ? Parser.parse(args.libraries) : { nodes: [] }
    );
    if (mtress.nodes) {
      return mtress;
    }
    throw new Error("No nodes to parse");
  })(message);
  receive("token", (args) =>
    JSON.stringify(
      getTokenAtPosition(args.document, args.position as IPosition)
    )
  )(message);
  receive("simulateSort", (args) => {
    const sorted = sortNodesTs(args);
    if (sorted.alpha === 0) {
      return {
        nodes: sorted.numberNodes,
        ...calcDimensions(sorted.numberNodes),
      };
    }

    const iterations =
      sorted.alpha === 1
        ? args.options.iterations || 200
        : Math.max(
            1,
            Math.round(sorted.alpha * (args.options.iterations || 200))
          );
    storeCoordinates(
      sorted.numberNodes,
      sorted.connections,
      iterations,
      sorted.alpha
    );
    return {
      nodes: sorted.numberNodes,
      ...calcDimensions(sorted.numberNodes),
    };
  })(message);
});
