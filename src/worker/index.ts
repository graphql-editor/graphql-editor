//@ts-ignore
import Worker from 'worker-loader!./validation.worker';
import { EditorError } from '@/validation';
import { ParserTree } from 'graphql-js-tree';
const ValidationWorker = new Worker();
export class Workers {
  static validate(code: string, libraries?: string): Promise<EditorError[]> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({ code, libraries, event: 'validate' });
      ValidationWorker.addEventListener('message', (message: any) => {
        resolve(message.data as EditorError[]);
      });
    });
  }
  static generateCode(tree: ParserTree): Promise<string> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({ tree, event: 'parse' });
      ValidationWorker.addEventListener('message', (message: any) => {
        resolve(message.data as string);
      });
    });
  }
}
