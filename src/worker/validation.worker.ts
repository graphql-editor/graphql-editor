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
    postMessage(catchSchemaErrors(m.code, m.libraries));
  }
  if (m.event === 'parse') {
    postMessage(TreeToGraphQL.parse(m.tree));
  }
  //@ts-ignore
});
