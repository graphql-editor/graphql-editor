import { ParserField, ParserTree } from 'graphql-js-tree';
import { ContextToken, IPosition } from 'graphql-language-service';
import type { WorkerEvents } from '@/worker/validation.worker';
import { NumberNode } from '@/tsAlgo';
const ValidationWorker = new Worker(
  new URL('./validation.worker.js', import.meta.url),
);

const send = <T extends keyof WorkerEvents>(
  key: T,
  data: WorkerEvents[T]['args'],
): Promise<WorkerEvents[T]['returned']> => {
  return new Promise((resolve, reject) => {
    const id = Math.random().toString(8);
    ValidationWorker.postMessage({ ...data, event: key, id });
    ValidationWorker.addEventListener(
      'message',
      (
        message: MessageEvent<
          { event: T; data: WorkerEvents[T]['returned'] } & {
            error?: string;
            id?: string;
          }
        >,
      ) => {
        if (message.data.error) {
          reject(message.data.error);
        }
        if (message.data.event === key && message.data.id === id) {
          resolve(message.data.data);
        }
      },
    );
  });
};

export class GraphQLEditorWorker {
  static simulateSort(
    nodes: ParserField[],
    existingNumberNodes?: NumberNode[],
  ) {
    return send('simulateSort', { nodes, existingNumberNodes });
  }
  static validate(schema: string, libraries?: string) {
    return send('validate', { schema, libraries });
  }
  static generateCode(tree: ParserTree) {
    return send('parse', { tree });
  }
  static generateTree(schema: string, libraries?: string) {
    return send('parseSchema', { schema, libraries });
  }
  static getTokenAtPosition(
    document: string,
    position: Pick<IPosition, 'character' | 'line'>,
  ): Promise<ContextToken> {
    return send('token', {
      document,
      position: {
        line: position.line,
        character: position.character,
      },
    }).then(JSON.parse);
  }
}
