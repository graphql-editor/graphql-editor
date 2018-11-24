// faker.com
import { Container } from 'unstated';
import * as qs from 'query-string';
const callbackString = qs.stringify({
  audience: 'https://graphqleditor.com/',
  scope: 'openid',
  response_type: 'id_token',
  client_id: 'yKOZj61N2Bih0AsOIn8qpI1tm9d7TBKM',
  redirect_uri: 'http://localhost:1569',
  nonce: 'nonce'
});
const fakerApi = `https://faker-api.graphqleditor.com/graphql`;
const fakerFetch = (query: string) => fetch(`${fakerApi}?query=${encodeURIComponent(query)}`);
export const loginCallbackDomain = `https://aexol.auth0.com/authorize?${callbackString}`;

export type CloudState = {
  token?: string;
  projects?: ProjectConnection;
  user?: User;
  currentProject?: Project;
};

type Dict = {
  [x: string]: Dict | any | Dict[] | any[];
};

Api.listProjects

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
  props: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<ReturnType<T>>;

const listProjects: FunctionToGraphQL<Query['listProjects']> = (props) => (o) =>
  fakerFetch(construct('query', 'listProjects', props)(constructReturner(o)))
    .then((response) => response.json())
    .then((response) => response as ReturnType<Query['listProjects']>);

listProjects({
  owned:true
})({
  projects:{
    name:true
  }
}).then(response => {
  response.projects.map(p => p.)
})

export class CloudContainer extends Container<CloudState> {
  state: CloudState = {};
  setToken(token: string) {
    this.setState({
      token
    });
  }
  createUser = (props: ArgsType<Mutation['createUser']>[0]) => {
    return fakerFetch(
      construct('mutation', 'createUser', props)(`
      username,
      id
    `)
    )
      .then((response) => response.json())
      .then((response) => response as ReturnType<Mutation['createUser']>);
  };
  listProjects = (props: ArgsType<Query['listProjects']>[0]) => {
    return fakerFetch(
      construct('query', 'listProjects', props)(`
      id,
      name,
      public
    `)
    )
      .then((response) => response.json())
      .then((response) => response as ReturnType<Query['listProjects']>);
  };
}

export const Cloud = new CloudContainer();
