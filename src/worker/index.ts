//@ts-ignore
import Worker from 'worker-loader!./validation.worker';
import { EditorError } from '@/validation';
import { ParserTree } from 'graphql-js-tree';
import { ContextToken, IPosition } from 'graphql-language-service';
const ValidationWorker = new Worker();
export class Workers {
  static validate(code: string, libraries?: string): Promise<EditorError[]> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({ code, libraries, event: 'validate' });
      ValidationWorker.addEventListener('message', (message: any) => {
        if (message.data.event === 'validate') {
          resolve(message.data.data as EditorError[]);
        }
      });
    });
  }
  static generateCode(tree: ParserTree): Promise<string> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({ tree, event: 'parse' });
      ValidationWorker.addEventListener('message', (message: any) => {
        if (message.data.event === 'parse') {
          resolve(message.data.data as string);
        }
      });
    });
  }
  static getTokenAtPosition(
    document: string,
    position: Pick<IPosition, 'character' | 'line'>,
  ): Promise<ContextToken> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({
        document,
        position: {
          line: position.line,
          character: position.character,
        },
        event: 'token',
      });
      ValidationWorker.addEventListener('message', (message: any) => {
        if (message.data.event === 'token') {
          resolve(JSON.parse(message.data.data as string) as ContextToken);
        }
      });
    });
  }
}
