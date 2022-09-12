import { catchSchemaErrors, EditorError } from '@/validation';
import { Parser, ParserTree, TreeToGraphQL } from 'graphql-js-tree';
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
};

const receive =
  <T extends keyof WorkerEvents>(
    key: T,
    fn: (args: WorkerEvents[T]['args']) => WorkerEvents[T]['returned'],
  ) =>
  (message: MessageEvent) => {
    const m = message.data;
    if (m.event === key)
      postMessage({
        data: fn(m),
        event: key,
      });
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
});
