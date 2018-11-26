export type Header = {
  key: string;
  value?: string;
};

export type SourceUploadInfo = {
  filename?: string;
  putUrl: string;
  headers?: Header[];
};

export type FakerSource = {
  filename?: string;
  contents?: string;
  checksum?: string;
};

export type FakerSourceConnection = {
  pageInfo: PageInfo;
  sources?: FakerSource[];
};

export type Endpoint = {
  uri?: string;
};

export type Namespace = {
  public?: boolean;
  slug?: string;
  projects?: (
    props: {
      last?: string;
      limit?: number;
    }
  ) => ProjectConnection;
};

export type User = {
  id?: string;
  namespace?: Namespace;
  username?: string;
};

export type Project = {
  name: string;
  id: string;
  owner?: User;
  public?: boolean;
  endpoint?: Endpoint;
  sources?: (
    props: {
      last?: string;
      limit?: number;
    }
  ) => FakerSourceConnection;
  slug?: string;
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

export type NewSource = {
  filename?: string;
  contentLength?: number;
  contentType?: string;
  checksum?: string;
};

export type Query = {
  listProjects: (
    props: {
      owned?: boolean;
      last?: string;
      limit?: number;
    }
  ) => ProjectConnection;
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
};

export type Mutation = {
  createUser: (
    props: {
      namespace: string;
      public?: boolean;
    }
  ) => User;
  createProject: (
    props: {
      public?: boolean;
      name: string;
    }
  ) => Project;
  updateSources: (
    props: {
      project: string;
      sources?: NewSource[];
    }
  ) => SourceUploadInfo[];
};
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any> ? P : never;

const apiFetch = (options: fetchOptions, query: string) =>
  fetch(`${options[0]}?query=${encodeURIComponent(query)}`, options[1] || {});

type Dict = {
  [x: string]: Dict | any | Dict[] | any[];
};

type ArrayToType<T> = T extends (infer R)[] ? R : T;
type DictOrFunction<T> = {
  [P in keyof T]?: T[P] extends {
    [x: string]: infer R;
  }
    ? DictOrString<T[P]>
    : T[P] extends Func<any, any> ? DictOrFunction<ReturnType<T[P]>> : T[P]
};
type GraphQLDictReturnType<T> = T extends Func<any, any> ? DictOrFunction<ReturnType<T>> : T;
type DictOrString<T> = {
  [P in keyof T]?: T[P] extends {
    [x: string]: infer R;
  }
    ? DictOrString<T[P]>
    : T[P] extends Func<any, any> ? [ArgsType<T[P]>[0], DictOrString<ReturnType<T[P]>>] : true
};
type FlattenDict<T> = { [P in keyof T]: ArrayToType<T[P]> };
type GraphQLReturner<T> = DictOrString<FlattenDict<T>>;

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
  const argumentString = `(${Object.keys(values)
    .map(
      (v) => `${v}:${typeof values[v] === 'string' ? `"${values[v]}"` : JSON.stringify(values[v])}`
    )
    .join(',')})${traverseToSeekArrays(r)}`;
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
  return objectToTree(b)
};

const buildQuery = a => traverseToSeekArrays(a).replace(/\"([^{^,^\n^\"]*)\":([^{^,^\n^\"]*)/g,"$1:$2")

const construct = (t: 'query' | 'mutation' | 'subscription', name: string, args: Dict = {}) => (
  returnedQuery?: string
) => `
      ${t === 'query' ? '' : t}{
        ${name}${resolveArgs(args)}${returnedQuery}
      }
`;

type FunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<GraphQLDictReturnType<T>>;
type fetchOptions = ArgsType<typeof fetch>;

const fullConstruct = (options: fetchOptions) => (
  t: 'query' | 'mutation' | 'subscription',
  name: string
) => (props) => (o) =>
  apiFetch(options, construct(t, name, props)(buildQuery(o))).then((response) =>
    response.json()
  );

export const Api = (...options: fetchOptions) => ({
  Query: {
    listProjects: ((props) => (o) =>
      fullConstruct(options)('query', 'listProjects')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Query['listProjects']>
      )) as FunctionToGraphQL<Query['listProjects']>,
    getProject: ((props) => (o) =>
      fullConstruct(options)('query', 'getProject')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Query['getProject']>
      )) as FunctionToGraphQL<Query['getProject']>,
    getUser: ((props) => (o) =>
      fullConstruct(options)('query', 'getUser')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Query['getUser']>
      )) as FunctionToGraphQL<Query['getUser']>
  },
  Mutation: {
    createUser: ((props) => (o) =>
      fullConstruct(options)('mutation', 'createUser')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Mutation['createUser']>
      )) as FunctionToGraphQL<Mutation['createUser']>,
    createProject: ((props) => (o) =>
      fullConstruct(options)('mutation', 'createProject')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Mutation['createProject']>
      )) as FunctionToGraphQL<Mutation['createProject']>,
    updateSources: ((props) => (o) =>
      fullConstruct(options)('mutation', 'updateSources')(props)(o).then(
        (response) => response as GraphQLDictReturnType<Mutation['updateSources']>
      )) as FunctionToGraphQL<Mutation['updateSources']>
  },
  Subscription: {}
});
