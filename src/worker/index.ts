//@ts-ignore
import Worker from 'worker-loader!./validation.worker';
import { EditorError } from '../validation';
const ValidationWorker = new Worker();
export class Workers {
  static validate(code: string, stitches?: string): Promise<EditorError[]> {
    return new Promise((resolve) => {
      ValidationWorker.postMessage({ code, stitches });
      ValidationWorker.addEventListener('message', (message: any) => {
        resolve(message.data as EditorError[]);
      });
    });
  }
}
