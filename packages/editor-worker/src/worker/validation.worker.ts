import { NumberNode, sortNodesTs, storeCoordinates } from '@/tsAlgo';
import { catchSchemaErrors, EditorError } from '@/validation';
import {
  Parser,
  ParserField,
  ParserTree,
  TreeToGraphQL,
} from 'graphql-js-tree';
import { getTokenAtPosition, IPosition } from 'graphql-language-service';
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
      position: Pick<IPosition, 'character' | 'line'>;
    };
    returned: string;
  };
  simulateSort: {
    args: {
      nodes: ParserField[];
      options: {
        existingNumberNodes?: NumberNode[];
        iterations?: number;
      };
    };
    returned: NumberNode[];
  };
};

const receive =
  <T extends keyof WorkerEvents>(
    key: T,
    fn: (args: WorkerEvents[T]['args']) => WorkerEvents[T]['returned'],
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

ctx.addEventListener('message', (message) => {
  receive('validate', (args) => catchSchemaErrors(args.schema, args.libraries))(
    message,
  );
  receive('parse', (args) => TreeToGraphQL.parse(args.tree))(message);
  receive('parseSchema', (args) =>
    Parser.parse(args.schema, [], args.libraries),
  )(message);
  receive('token', (args) =>
    JSON.stringify(
      getTokenAtPosition(args.document, args.position as IPosition),
    ),
  )(message);
  receive('simulateSort', (args) => {
    const sorted = sortNodesTs(args);
    storeCoordinates(
      sorted.numberNodes,
      sorted.connections,
      args.options.iterations,
    );
    return sorted.numberNodes;
  })(message);
});
