export type Query = {
	findProjects:(props:{	query:string,	last?:string,	limit?:number}) => ProjectConnection,
	findProjectsByTag:(props:{	limit?:number,	tag:string,	last?:string}) => ProjectConnection,
	getNamespace:(props:{	slug:string}) => Namespace,
	getProject:(props:{	project:string}) => Project,
	getTeam:(props:{	name:string}) => Team,
	getUser:(props:{	username:string}) => User,
	listProjects:(props:{	owned?:boolean,	last?:string,	limit?:number}) => ProjectConnection
}

export type ProjectConnection = {
	pageInfo:PageInfo,
	projects?:Project[]
}

export type PageInfo = {
	last?:string,
	limit?:number,
	next?:boolean
}

export type Project = {
	description?:string,
	endpoint?:Endpoint,
	id:string,
	name:string,
	owner?:User,
	public?:boolean,
	slug?:string,
	sources:(props:{	last?:string,	limit?:number}) => FakerSourceConnection,
	tags?:string[],
	team?:Team
}

export type Endpoint = {
	uri?:string
}

export type User = {
	id?:string,
	namespace?:Namespace,
	username?:string
}

export type Namespace = {
	project:(props:{	name:string}) => Project,
	projects:(props:{	last?:string,	limit?:number}) => ProjectConnection,
	public?:boolean,
	slug?:string
}

export type FakerSourceConnection = {
	pageInfo:PageInfo,
	sources?:FakerSource[]
}

export type FakerSource = {
	checksum?:string,
	contents?:string,
	filename?:string,
	getUrl?:string
}

export type Team = {
	id?:string,
	member:(props:{	username:string}) => Member,
	members:(props:{	last?:string,	limit?:number}) => MemberConnection,
	name?:string,
	namespace?:Namespace
}

export type Member = {
	role?:Role,
	username?:string
}

export enum Role {
	ADMIN = "ADMIN",
	EDITOR = "EDITOR",
	VIEWER = "VIEWER",
	CONTRIBUTOR = "CONTRIBUTOR",
	OWNER = "OWNER"
}

export type MemberConnection = {
	members?:Member[],
	pageInfo:PageInfo
}

export type Mutation = {
	createProject:(props:{	public?:boolean,	name:string}) => Project,
	createTeam:(props:{	namespace:string,	name:string}) => TeamOps,
	createUser:(props:{	namespace:string,	public?:boolean}) => User,
	removeProject:(props:{	project:string}) => boolean,
	team:(props:{	id:string}) => TeamOps,
	updateProject:(props:{	in?:UpdateProject}) => boolean,
	updateSources:(props:{	project:string,	sources?:NewSource[]}) => (SourceUploadInfo | undefined)[]
}

export type TeamOps = {
	addMember:(props:{	username:string,	role:Role}) => Member,
	createProject:(props:{	public?:boolean,	name:string}) => Project,
	delete?:boolean,
	id?:string,
	member:(props:{	username:string}) => MemberOps,
	members:(props:{	last?:string,	limit?:number}) => MemberConnection,
	name?:string,
	namespace?:Namespace,
	project:(props:{	id:string}) => ProjectOps
}

export type MemberOps = {
	delete?:boolean,
	update:(props:{	role?:Role}) => boolean
}

export type ProjectOps = {
	delete?:boolean,
	update:(props:{	in?:UpdateProject}) => boolean
}

export type UpdateProject = {
	public?:boolean,
	project?:string,
	description?:string,
	tags?:string[]
}

export type NewSource = {
	contentType?:string,
	checksum?:string,
	filename?:string,
	contentLength?:number
}

export type SourceUploadInfo = {
	filename?:string,
	headers?:(Header | undefined)[],
	putUrl:string
}

export type Header = {
	key:string,
	value?:string
}
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any>
  ? P
  : never;

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
    super("");
    console.error(response);
  }
  toString() {
    return "GraphQL Response Error";
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
    : T[P] extends Func<any, any>
    ? ResolveReturned<ReturnType<T[P]>>
    : T[P]
};

export type State<T> = T extends (infer R)[]
  ? ResolveReturned<R>[]
  : ResolveReturned<T>;

type GraphQLDictReturnType<T> = T extends Func<any, any>
  ? State<ReturnType<T>>
  : T;

type ResolveArgs<T> = T extends Record<any, any>
  ? {
      [P in keyof T]?: T[P] extends (infer R)[]
        ? ResolveArgs<R>
        : T[P] extends {
            [x: string]: infer R;
          }
        ? ResolveArgs<T[P]>
        : T[P] extends Func<any, any>
        ? ReturnType<T[P]> extends Record<any, any>
          ? [ArgsType<T[P]>[0], ResolveArgs<ReturnType<T[P]>>]
          : [ArgsType<T[P]>[0]]
        : true
    }
  : true;

type GraphQLReturner<T> = T extends (infer R)[]
  ? ResolveArgs<R>
  : ResolveArgs<T>;

type EmptyOrGraphQLReturner<T> = T extends Func<any, any>
? ReturnType<T> extends Record<any, any>
  ? (o: GraphQLReturner<ReturnType<T>>) => Promise<GraphQLDictReturnType<T>>
  : () => Promise<GraphQLDictReturnType<T>>
: T extends Record<any, any>
? (o: GraphQLReturner<T>) => Promise<GraphQLDictReturnType<T>>
: () => Promise<GraphQLDictReturnType<T>>;

type FunctionToGraphQL<T> = T extends Func<any, any>
  ? AfterFunctionToGraphQL<T>
  : () => EmptyOrGraphQLReturner<T>;

type AfterFunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => EmptyOrGraphQLReturner<T>;

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

const isArrayFunction = <T extends [Record<any, any>, Record<any, any>]>(a: T) => {
  const [values, r] = a;
  const keyValues = Object.keys(values);
  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${typeof values[v] === 'string' ? `"${values[v]}"` : JSON.stringify(values[v])}`
          )
          .join(',')})${r ? traverseToSeekArrays(r) : ''}`
      : traverseToSeekArrays(r);
  return argumentString;
};

const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? `${k}{${objectToTree(v)}}` : `${k}${v}`;

const objectToTree = (o: { [x: string]: boolean | string }) =>
  `{${Object.keys(o).map((k) => `${resolveKV(k, o[k])}`)}}`;

const traverseToSeekArrays = <T extends Record<any, any>>(a?: T) => {
  if (!a) return '';
  if (Object.keys(a).length === 0) {
    return '';
  }
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

const buildQuery = <T extends Record<any, any>>(a?: T) =>
  traverseToSeekArrays(a).replace(/\"([^{^,^\n^\"]*)\":([^{^,^\n^\"]*)/g, '$1:$2');

const construct = (t: 'query' | 'mutation' | 'subscription', name: string, args: Dict = {}) => (
  returnedQuery?: string
) => `
        ${t === 'query' ? '' : t}{
          ${name}${resolveArgs(args)}${returnedQuery}
        }
  `;

const fullConstruct = (options: fetchOptions) => (
  t: 'query' | 'mutation' | 'subscription',
  name: string
) => (props?: Dict) => (o?: Record<any, any>) =>
  apiFetch(options, construct(t, name, props)(buildQuery(o)), name);

const apiFetch = (options: fetchOptions, query: string, name: string) =>
  fetch(`${options[0]}?query=${encodeURIComponent(query)}`, options[1] || {})
    .then((response) => response.json() as Promise<GraphQLResponse>)
    .then((response) => {
      if (response.errors) {
        throw new GraphQLError(response);
      }
      return response.data[name];
    });

  
export const Api = (...options: fetchOptions) => ({
    Query: {	findProjects: ((props) => (o) =>
  		fullConstruct(options)('query', 'findProjects')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['findProjects']>
  		)) as FunctionToGraphQL<Query['findProjects']>,
	findProjectsByTag: ((props) => (o) =>
  		fullConstruct(options)('query', 'findProjectsByTag')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['findProjectsByTag']>
  		)) as FunctionToGraphQL<Query['findProjectsByTag']>,
	getNamespace: ((props) => (o) =>
  		fullConstruct(options)('query', 'getNamespace')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['getNamespace']>
  		)) as FunctionToGraphQL<Query['getNamespace']>,
	getProject: ((props) => (o) =>
  		fullConstruct(options)('query', 'getProject')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['getProject']>
  		)) as FunctionToGraphQL<Query['getProject']>,
	getTeam: ((props) => (o) =>
  		fullConstruct(options)('query', 'getTeam')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['getTeam']>
  		)) as FunctionToGraphQL<Query['getTeam']>,
	getUser: ((props) => (o) =>
  		fullConstruct(options)('query', 'getUser')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['getUser']>
  		)) as FunctionToGraphQL<Query['getUser']>,
	listProjects: ((props) => (o) =>
  		fullConstruct(options)('query', 'listProjects')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Query['listProjects']>
  		)) as FunctionToGraphQL<Query['listProjects']>},
Mutation: {	createProject: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'createProject')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['createProject']>
  		)) as FunctionToGraphQL<Mutation['createProject']>,
	createTeam: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'createTeam')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['createTeam']>
  		)) as FunctionToGraphQL<Mutation['createTeam']>,
	createUser: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'createUser')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['createUser']>
  		)) as FunctionToGraphQL<Mutation['createUser']>,
	removeProject: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'removeProject')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['removeProject']>
  		)) as FunctionToGraphQL<Mutation['removeProject']>,
	team: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'team')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['team']>
  		)) as FunctionToGraphQL<Mutation['team']>,
	updateProject: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'updateProject')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['updateProject']>
  		)) as FunctionToGraphQL<Mutation['updateProject']>,
	updateSources: ((props) => (o) =>
  		fullConstruct(options)('mutation', 'updateSources')(props)(o).then(
  			(response) => response as GraphQLDictReturnType<Mutation['updateSources']>
  		)) as FunctionToGraphQL<Mutation['updateSources']>},
Subscription: {}
});
  