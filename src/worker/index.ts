//@ts-ignore
import Worker from 'worker-loader!./validation.worker';
import { EditorError } from '../validation';
const ValidationWorker = new Worker();
export class Workers {
  static validate(code: string): Promise<EditorError[]> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({ code });
      ValidationWorker.addEventListener('message', (message: any) => {
        resolve(message.data as EditorError[]);
      });
    });
  }
}
