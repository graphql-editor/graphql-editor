// faker.com
import { Container } from 'unstated';
import { ProjectConnection, User, Project, Api, Namespace,ResolveReturned } from './types';
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

const fakerApi = `https://faker-api.graphqleditor.com/graphql`;

export type CloudState = {
  token?: string;
  projects?: ProjectConnection;
  user?: User;
  currentProject?: Project;
  namespace?: ResolveReturned<Namespace>;
};

export const api = Api(fakerApi, {});
export const userApi = (token: string) =>
  Api(fakerApi, {
    headers: {
      Authorization: token
    }
  });

export class CloudContainer extends Container<CloudState> {
  state: CloudState = {};
  setToken() {
    auth.parseHash((error, result) => {
      console.log(result);
      if (
        result &&
        result.idToken &&
        result.idTokenPayload &&
        result.idTokenPayload.sub &&
        result.idTokenPayload.nickname
      ) {
        this.setState({
          token: result.idToken,
          user: {
            username: result.idTokenPayload.nickname,
            id: result.idTokenPayload.sub
          }
        });
        api.Query.getUser({ username: result.idTokenPayload.sub })({
          id: true,
          namespace: {
            slug: true,
            public: true
          }
        }).then(({ id, username, namespace }) => {
          if (id) {
          }
        });
      }
    });
  }
  userApi = userApi(this.state.token);
  login = () => auth.authorize();
}

export const Cloud = new CloudContainer();
