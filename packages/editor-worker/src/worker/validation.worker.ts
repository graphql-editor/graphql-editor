import { catchSchemaErrors } from '@/validation';
import { ParserTree, TreeToGraphQL } from 'graphql-js-tree';
import { getTokenAtPosition, IPosition } from 'graphql-language-service';
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
      }
    | {
        event: 'token';
        document: string;
        position: IPosition;
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
  if (m.event === 'token') {
    const t = getTokenAtPosition(m.document, m.position);
    postMessage({
      data: JSON.stringify(t),
      event: m.event,
    });
  }
  //@ts-ignore
});
