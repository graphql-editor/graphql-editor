export type Header = {
  key: string;
  value?: string;
};

export type SourceUploadInfo = {
  filename?: string;
  headers?: Header[];
  putUrl: string;
};

export type FakerSource = {
  checksum?: string;
  contents?: string;
  filename?: string;
  getUrl?: string;
};

export type FakerSourceConnection = {
  pageInfo: PageInfo;
  sources?: FakerSource[];
};

export type PageInfo = {
  last?: string;
  limit?: number;
  next?: boolean;
};

export type ProjectConnection = {
  pageInfo: PageInfo;
  projects?: Project[];
};

export type Namespace = {
  projects?: (
    props: {
      last?: string;
      limit?: number;
    }
  ) => ProjectConnection;
  public?: boolean;
  slug?: string;
};

export type User = {
  id?: string;
  namespace?: Namespace;
  username?: string;
};

export type Endpoint = {
  uri?: string;
};

export type Project = {
  endpoint?: Endpoint;
  id: string;
  name: string;
  owner?: User;
  public?: boolean;
  slug?: string;
  sources?: (
    props: {
      last?: string;
      limit?: number;
    }
  ) => FakerSourceConnection;
};

export type NewSource = {
  contentLength?: number;
  contentType?: string;
  checksum?: string;
  filename?: string;
};

export type Query = {
  getProject: (
    props: {
      project: string;
    }
  ) => Project;
  getUser: (
    props: {
      username: string;
    }
  ) => User;
  listProjects: (
    props: {
      owned?: boolean;
      last?: string;
      limit?: number;
    }
  ) => ProjectConnection;
};

export type Mutation = {
  createProject: (
    props: {
      public?: boolean;
      name: string;
    }
  ) => Project;
  createUser: (
    props: {
      namespace: string;
      public?: boolean;
    }
  ) => User;
  updateSources: (
    props: {
      project: string;
      sources?: NewSource[];
    }
  ) => SourceUploadInfo[];
};
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any> ? P : never;

type GraphQLResponse = {
  data?: {
    [x: string]: any;
  };
  errors?: {
    message: string;
  }[];
};

class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super('');
    console.error(response);
  }
  toString() {
    return 'GraphQL Response Error';
  }
}
type Dict = {
  [x: string]: Dict | any | Dict[] | any[];
};

type ResolveReturned<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveReturned<R>[]
    : T[P] extends {
        [x: string]: infer R;
      }
      ? ResolveReturned<T[P]>
      : T[P] extends Func<any, any> ? ResolveReturned<ReturnType<T[P]>> : T[P]
};

export type State<T> = ResolveReturned<T>;

type GraphQLDictReturnType<T> = T extends Func<any, any> ? ResolveReturned<ReturnType<T>> : T;

type ResolveArgs<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveArgs<R>
    : T[P] extends {
        [x: string]: infer R;
      }
      ? ResolveArgs<T[P]>
      : T[P] extends Func<any, any> ? [ArgsType<T[P]>[0], ResolveArgs<ReturnType<T[P]>>] : true
};
type GraphQLReturner<T> = T extends (infer R)[] ? ResolveArgs<R> : ResolveArgs<T>;

type FunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<GraphQLDictReturnType<T>>;
type fetchOptions = ArgsType<typeof fetch>;

const joinArgs = (q: Dict) =>
  Array.isArray(q)
    ? `[${q.map(joinArgs).join(',')}]`
    : typeof q === 'object'
      ? `{${Object.keys(q)
          .map((k) => `${k}:${joinArgs(q[k])}`)
          .join(',')}}`
      : typeof q === 'string'
        ? `"${q}"`
        : q;
const resolveArgs = (q: Dict): string =>
  Object.keys(q).length > 0
    ? `(${Object.keys(q)
        .map((k) => `${k}:${joinArgs(q[k])}`)
        .join(',')})`
    : ``;

const isArrayFunction = (a) => {
  const [values, r] = a;
  const keyValues = Object.keys(values);
  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${typeof values[v] === 'string' ? `"${values[v]}"` : JSON.stringify(values[v])}`
          )
          .join(',')})${traverseToSeekArrays(r)}`
      : traverseToSeekArrays(r);
  return argumentString;
};

const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;
const objectToTree = (o: { [x: string]: boolean | string }) =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`)}}`;
const traverseToSeekArrays = (a) => {
  let b = {};
  Object.keys(a).map((k) => {
    if (Array.isArray(a[k])) {
      b[k] = isArrayFunction(a[k]);
    } else {
      if (typeof a[k] === 'object') {
        b[k] = traverseToSeekArrays(a[k]);
      } else {
        b[k] = a[k];
      }
    }
  });
  return objectToTree(b);
};

const buildQuery = (a) =>
  traverseToSeekArrays(a).replace(/\"([^{^,^\n^\"]*)\":([^{^,^\n^\"]*)/g, '$1:$2');

const construct = (t: 'query' | 'mutation' | 'subscription', name: string, args: Dict = {}) => (
  returnedQuery?: string
) => `
      ${t === 'query' ? '' : t}{
        ${name}${resolveArgs(args)}${returnedQuery}
      }
`;

const apiFetch = (options: fetchOptions, query: string, name: string) =>
  fetch(`${options[0]}?query=${encodeURIComponent(query)}`, options[1] || {})
    .then((response) => response.json() as Promise<GraphQLResponse>)
    .then((response) => {
      if (response.errors) {
        throw new GraphQLError(response);
      }
      return response.data[name];
    });

const fullConstruct = (options: fetchOptions) => (
  t: 'query' | 'mutation' | 'subscription',
  name: string
) => (props) => (o) => apiFetch(options, construct(t, name, props)(buildQuery(o)), name);

export const Api = (...options: fetchOptions) => ({
  Query: {
    getProject: ((props) => (o) =>
      fullConstruct(options)('query', 'getProject')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Query['getProject']>
      )) as FunctionToGraphQL<Query['getProject']>,
    getUser: ((props) => (o) =>
      fullConstruct(options)('query', 'getUser')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Query['getUser']>
      )) as FunctionToGraphQL<Query['getUser']>,
    listProjects: ((props) => (o) =>
      fullConstruct(options)('query', 'listProjects')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Query['listProjects']>
      )) as FunctionToGraphQL<Query['listProjects']>
  },
  Mutation: {
    createProject: ((props) => (o) =>
      fullConstruct(options)('mutation', 'createProject')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Mutation['createProject']>
      )) as FunctionToGraphQL<Mutation['createProject']>,
    createUser: ((props) => (o) =>
      fullConstruct(options)('mutation', 'createUser')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Mutation['createUser']>
      )) as FunctionToGraphQL<Mutation['createUser']>,
    updateSources: ((props) => (o) =>
      fullConstruct(options)('mutation', 'updateSources')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Mutation['updateSources']>
      )) as FunctionToGraphQL<Mutation['updateSources']>
  },
  Subscription: {}
});
