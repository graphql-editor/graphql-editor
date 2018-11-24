type Header = {
	key: string
	value?: string
}

type SourceUploadInfo = {
	filename?: string
	putUrl: string
	headers?: Header[]
}

type FakerSource = {
	filename?: string
	contents?: string
	checksum?: string
}

type FakerSourceConnection = {
	pageInfo: PageInfo
	sources?: FakerSource[]
}

type Endpoint = {
	uri?: string
}

type Namespace = {
	public?: boolean
	slug?: string
	projects?: (props:{last?: string,
		limit?: number}) => ProjectConnection
}

type User = {
	id?: string
	namespace?: Namespace
	username?: string
}

type Project = {
	name: string
	id: string
	owner?: User
	public?: boolean
	endpoint?: Endpoint
	sources?: (props:{last?: string,
		limit?: number}) => FakerSourceConnection
	slug?: string
}

type PageInfo = {
	last?: string
	limit?: number
	next?: boolean
}

type ProjectConnection = {
	pageInfo: PageInfo
	projects?: Project[]
}

type NewSource = {
	filename?: string
	contentLength?: number
	contentType?: string
	checksum?: string
}

type Query = {
	listProjects:(props: {
		owned?: boolean,
		last?: string,
		limit?: number
	}) => ProjectConnection
	getProject:(props: {
		project: string
	}) => Project
	getUser:(props: {
		username: string
	}) => User
}

type Mutation = {
	createUser:(props: {
		namespace: string,
		public?: boolean
	}) => User
	createProject:(props: {
		public?: boolean,
		name: string
	}) => Project
	updateSources:(props: {
		project: string,
		sources?: NewSource[]
	}) => SourceUploadInfo[]
}
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any> ? P : never;

const apiFetch = (options: fetchOptions, query: string) =>
  fetch(`${options[0]}?query=${encodeURIComponent(query)}`, options[1] || {});

type Dict = {
  [x: string]: Dict | any | Dict[] | any[];
};

type ArrayToType<T> = T extends (infer R)[] ? R : T;
type DictOrString<T> = {
  [P in keyof T]?: T[P] extends {
    [x: string]: infer R;
  }
    ? DictOrString<T[P]>
    : true
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

const constructReturner = (a: GraphQLReturner<any>) =>
  JSON.stringify(a)
    .replace(/:true/g, '')
    .replace(/:/g, '')
    .replace(/"/g, '')
    .slice(1, -1);
const construct = (t: 'query' | 'mutation' | 'subscription', name: string, args: Dict = {}) => (
  returnedQuery?: string
) => `
      ${t === 'query' ? '' : t}{
        ${name}${resolveArgs(args)}{
          ${returnedQuery}
        }
      }
`;

type FunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<ReturnType<T>>;
type fetchOptions = ArgsType<typeof fetch>;

const fullConstruct = (options: fetchOptions) => (
  t: 'query' | 'mutation' | 'subscription',
  name: string
) => (props) => (o) =>
  apiFetch(options, construct(t, name, props)(constructReturner(o))).then((response) =>
    response.json()
  );


export const Api = (...options: fetchOptions) => ({
    Query: {	listProjects: ((props) => (o) =>
		fullConstruct(options)('query', 'listProjects')(props)(o).then(
			(response) => response as ReturnType<Query['listProjects']>
		)) as FunctionToGraphQL<Query['listProjects']>,
	getProject: ((props) => (o) =>
		fullConstruct(options)('query', 'getProject')(props)(o).then(
			(response) => response as ReturnType<Query['getProject']>
		)) as FunctionToGraphQL<Query['getProject']>,
	getUser: ((props) => (o) =>
		fullConstruct(options)('query', 'getUser')(props)(o).then(
			(response) => response as ReturnType<Query['getUser']>
		)) as FunctionToGraphQL<Query['getUser']>},
Mutation: {	createUser: ((props) => (o) =>
		fullConstruct(options)('mutation', 'createUser')(props)(o).then(
			(response) => response as ReturnType<Mutation['createUser']>
		)) as FunctionToGraphQL<Mutation['createUser']>,
	createProject: ((props) => (o) =>
		fullConstruct(options)('mutation', 'createProject')(props)(o).then(
			(response) => response as ReturnType<Mutation['createProject']>
		)) as FunctionToGraphQL<Mutation['createProject']>,
	updateSources: ((props) => (o) =>
		fullConstruct(options)('mutation', 'updateSources')(props)(o).then(
			(response) => response as ReturnType<Mutation['updateSources']>
		)) as FunctionToGraphQL<Mutation['updateSources']>},
Subscription: {}
});
