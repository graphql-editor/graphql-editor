// faker.com
import { Container } from 'unstated';
import { User, Project, Api, Namespace, State } from './types/project';
import { WebAuth } from 'auth0-js';

const auth = new WebAuth({
  audience: 'https://graphqleditor.com/',
  clientID: 'yKOZj61N2Bih0AsOIn8qpI1tm9d7TBKM',
  domain: 'aexol.auth0.com',
  responseType: 'id_token',
  redirectUri: 'http://localhost:1569/',
  scope: 'openid profile'
});

// const callbackString = qs.stringify({
//   audience: 'https://graphqleditor.com/',
//   scope: 'openid',
//   response_type: 'id_token',
//   client_id: 'yKOZj61N2Bih0AsOIn8qpI1tm9d7TBKM',
//   redirect_uri: 'http://localhost:1569',
//   nonce: 'nonce'
// });

const fakerApi = `https://project-api.graphqleditor.com/graphql`;

const prefix = (k: string) => `GraphQLEditor-${k}`;
const ls = {
  get: (key: string) => window.localStorage.getItem(prefix(key)),
  set: (key: string, value: string) => window.localStorage.setItem(prefix(key), value)
};
export type CloudState = {
  token?: string;
  projects?: State<Project>[];
  user?: State<User>;
  currentProject?: State<Project>;
  namespace?: State<Namespace>;
};

export const api = Api(fakerApi, {});
export const userApi = (token: string) =>
  Api(fakerApi, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: `Bearer ${token}`
    })
  });

export class CloudContainer extends Container<CloudState> {
  state: CloudState = {};
  constructor() {
    super();
    this.onMount();
  }
  onMount() {
    this.storageToState().then(() => {
      this.afterLogin();
    });
  }
  setStorage(state: Partial<CloudState>) {
    return this.setState(state).then(() => {
      ls.set('faker', JSON.stringify(state));
    });
  }
  storageToState() {
    return this.setState(JSON.parse(ls.get('faker')));
  }
  afterLogin() {
    if (!this.state.token) {
      return;
    }
    return userApi(this.state.token)
      .Query.getUser({ username: this.state.user.id })({
        id: true,
        namespace: {
          slug: true,
          public: true,
          projects: [
            {},
            {
              projects: {
                id: true,
                name: true,
                slug: true
              }
            }
          ]
        }
      })
      .then(({ namespace, id }) => {
        const {
          projects: { projects },
          ...restNamespace
        } = namespace;
        this.setState({
          namespace: restNamespace,
          projects,
          user: {
            id
          }
        });
      })
      .catch((errr) => {
        console.log(errr);
      });
  }
  setToken() {
    auth.parseHash((error, result) => {
      if (
        result &&
        result.idToken &&
        result.idTokenPayload &&
        result.idTokenPayload.sub &&
        result.idTokenPayload.nickname
      ) {
        this.setStorage({
          token: result.idToken,
          user: {
            username: result.idTokenPayload.nickname,
            id: result.idTokenPayload.sub
          }
        }).then(() => {
          this.afterLogin();
        });
      }
    });
  }
  userApi = () => userApi(this.state.token);
  login = () => auth.authorize();
}

export const Cloud = new CloudContainer();
