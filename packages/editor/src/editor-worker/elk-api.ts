//@ts-ignore
import { Worker } from "@qix/elkjs-patched/lib/elk-worker";

export type LayoutOptions = Record<string, string>;

export type ElkPoint = {
  x: number;
  y: number;
};

export type ElkGraphElement = {
  id?: string;
  labels?: ElkLabel[];
  layoutOptions?: LayoutOptions;
};

export type ElkShape = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
} & ElkGraphElement;

export type ElkNode = {
  id: string;
  children?: ElkNode[];
  ports?: ElkPort[];
  edges?: ElkExtendedEdge[];
} & ElkShape;

export type ElkPort = {
  id: string;
} & ElkShape;

export type ElkLabel = {
  text?: string;
} & ElkShape;

export type ElkEdge = {
  id: string;
  junctionPoints?: ElkPoint[];
} & ElkGraphElement;

export type ElkExtendedEdge = {
  sources: string[];
  targets: string[];
  sections?: ElkEdgeSection[];
} & ElkEdge;

export type ElkEdgeSection = {
  id: string;
  startPoint: ElkPoint;
  endPoint: ElkPoint;
  bendPoints?: ElkPoint[];
  incomingShape?: string;
  outgoingShape?: string;
  incomingSections?: string[];
  outgoingSections?: string[];
} & ElkGraphElement;

export type ElkLayoutArguments = {
  layoutOptions?: LayoutOptions;
  logging?: boolean;
  measureExecutionTime?: boolean;
};

export type ElkCommonDescription = {
  id?: string;
  name?: string;
  description?: string;
};

export type ElkLayoutAlgorithmDescription = {
  category?: string;
  knownOptions?: string[];
  supportedFeatures?: string[];
} & ElkCommonDescription;

export type ElkLayoutCategoryDescription = {
  knownLayouters?: string[];
} & ElkCommonDescription;

export type ElkLayoutOptionDescription = {
  group?: string;
  type?: string;
  targets?: string[];
} & ElkCommonDescription;

export class ElkApi {
  private readonly worker: Worker;
  private id = 0;
  private readonly resolvers: Record<
    number,
    (error: any, result?: any) => void
  > = {};
  private initialized = false;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    this.worker = new Worker();
    this.worker.onmessage = (
      answer: MessageEvent<{ id: number; error?: any; data?: any }>
    ) => {
      const json = answer.data;
      const resolver = this.resolvers[json.id];
      if (resolver) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.resolvers[json.id];
        if (json.error) {
          resolver(json.error);
        } else {
          resolver(undefined, json.data);
        }
      }
    };
  }

  public async layout(graph: ElkNode, args?: ElkLayoutArguments) {
    const layoutOptions = args?.layoutOptions ?? {};
    const logging = args?.logging ?? false;
    const measureExecutionTime = args?.measureExecutionTime ?? false;

    if (!this.initialized) {
      await this.init();
    }

    return this.run("layout", {
      graph,
      layoutOptions,
      options: {
        logging,
        measureExecutionTime,
      },
    }) as Promise<ElkNode>;
  }

  public async knownLayoutAlgorithms() {
    if (!this.initialized) {
      await this.init();
    }

    return this.run("algorithms") as Promise<ElkLayoutAlgorithmDescription[]>;
  }

  public async knownLayoutOptions() {
    if (!this.initialized) {
      await this.init();
    }

    return this.run("options") as Promise<ElkLayoutOptionDescription[]>;
  }

  public async knownLayoutCategories() {
    if (!this.initialized) {
      await this.init();
    }

    return this.run("categories") as Promise<ElkLayoutCategoryDescription[]>;
  }

  private async init() {
    await this.run("register", { algorithms: ["layered"] });
    this.initialized = true;
  }

  private async run(
    cmd: string,
    options: Record<string, any> = {}
  ): Promise<any> {
    const id = this.id++;
    const message = { data: { id, cmd, ...options } };

    return new Promise((resolve, reject) => {
      this.resolvers[id] = (error: any, result: any) => {
        if (error) {
          this.convertGwtStyleError(error);
          reject(error);
        } else {
          resolve(result);
        }
      };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      (this.worker as any).dispatcher.dispatch(message);
    });
  }

  private convertGwtStyleError(error: Record<string, any> | undefined) {
    if (!error) {
      return;
    }

    // Somewhat flatten the way GWT stores nested exception(s)
    const javaException = error.__java$exception;
    if (javaException) {
      // Note that the property name of the nested exception is different
      // in the non-minified ('cause') and the minified (not deterministic) version.
      // Hence, the version below only works for the non-minified version.
      // However, as the minified stack trace is not of much use anyway, one
      // should switch the used version for debugging in such a case.
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (javaException.cause && javaException.cause.backingJsObject) {
        error.cause = javaException.cause.backingJsObject;
        this.convertGwtStyleError(error.cause);
      }

      delete error.__java$exception;
    }
  }
}
