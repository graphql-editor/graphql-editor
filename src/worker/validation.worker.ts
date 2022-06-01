import { catchSchemaErrors } from '@/validation';
import { ParserTree, TreeToGraphQL } from 'graphql-js-tree';
const ctx: Worker = self as any;
ctx.addEventListener('message', (message) => {
  const m = message.data as
    | {
        event: 'validate';
        code: string;
        libraries?: string;
      }
    | {
        event: 'parse';
        tree: ParserTree;
      };
  if (m.event === 'validate') {
    postMessage({
      data: catchSchemaErrors(m.code, m.libraries),
      event: m.event,
    });
  }
  if (m.event === 'parse') {
    postMessage({
      data: TreeToGraphQL.parse(m.tree),
      event: m.event,
    });
  }
  //@ts-ignore
});
