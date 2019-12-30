import { catchSchemaErrors } from '../validation';
const ctx: Worker = self as any;
ctx.addEventListener('message', (message) => {
  const data = message.data as {
    code: string;
  };
  //@ts-ignore
  postMessage(catchSchemaErrors(data.code));
});
