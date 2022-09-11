import { ParserTree } from 'graphql-js-tree';
import { ContextToken, IPosition } from 'graphql-language-service';
import type { WorkerEvents } from '@/worker/validation.worker';
const ValidationWorker = new Worker(
  new URL('./validation.worker.js', import.meta.url),
);

const send = <T extends keyof WorkerEvents>(
  key: T,
  data: WorkerEvents[T]['args'],
): Promise<WorkerEvents[T]['returned']> => {
  return new Promise((resolve) => {
    ValidationWorker.postMessage({ ...data, event: key });
    ValidationWorker.addEventListener(
      'message',
      (
        message: MessageEvent<{ event: T; data: WorkerEvents[T]['returned'] }>,
      ) => {
        if (message.data.event === key) {
          resolve(message.data.data);
        }
      },
    );
  });
};

export class GraphQLEditorWorker {
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
