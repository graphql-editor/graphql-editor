import { ParserTree } from "graphql-js-tree";
import { ContextToken, IPosition } from "graphql-language-service";
import type { WorkerEvents } from "@/worker/validation.worker";

const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

const validationWorker = isNode
  ? null
  : new Worker(new URL("./validation.worker.js", import.meta.url), {
      type: "module",
    });

const send = <T extends keyof WorkerEvents>(
  key: T,
  data: WorkerEvents[T]["args"]
): Promise<WorkerEvents[T]["returned"]> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    const id = Math.random().toString(8);
    if (!validationWorker) return;
    validationWorker.postMessage({ ...data, event: key, id });
    validationWorker.addEventListener(
      "message",
      (
        message: MessageEvent<
          { event: T; data: WorkerEvents[T]["returned"] } & {
            error?: string;
            id?: string;
          }
        >
      ) => {
        if (message.data.error) {
          reject(message.data.error);
        }
        if (message.data.event === key && message.data.id === id) {
          resolve(message.data.data);
        }
      }
    );
  });
};

export class GraphQLEditorWorker {
  static simulateSort(args: WorkerEvents["simulateSort"]["args"]) {
    return send("simulateSort", args);
  }
  static validate(schema: string, libraries?: string) {
    return send("validate", { schema, libraries });
  }
  static generateCode(tree: ParserTree) {
    return send("parse", { tree });
  }
  static generateTree({
    schema,
    libraries,
    cutSchemaDefinition,
  }: {
    schema: string;
    libraries?: string;
    cutSchemaDefinition?: boolean;
  }) {
    return send("parseSchema", { schema, libraries, cutSchemaDefinition });
  }
  static getTokenAtPosition(
    document: string,
    position: Pick<IPosition, "character" | "line">
  ): Promise<ContextToken> {
    return send("token", {
      document,
      position: {
        line: position.line,
        character: position.character,
      },
    }).then(JSON.parse);
  }
}
