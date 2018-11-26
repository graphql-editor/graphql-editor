// faker.com
import { Container } from 'unstated';
import * as qs from 'query-string';
import { ProjectConnection, User, Project, Api } from './types';
const callbackString = qs.stringify({
  audience: 'https://graphqleditor.com/',
  scope: 'openid',
  response_type: 'id_token',
  client_id: 'yKOZj61N2Bih0AsOIn8qpI1tm9d7TBKM',
  redirect_uri: 'http://localhost:1569',
  nonce: 'nonce'
});
const fakerApi = `https://faker-api.graphqleditor.com/graphql`;
// const fakerFetch = (query: string) => fetch(`${fakerApi}?query=${encodeURIComponent(query)}`);
export const loginCallbackDomain = `https://aexol.auth0.com/authorize?${callbackString}`;

export type CloudState = {
  token?: string;
  projects?: ProjectConnection;
  user?: User;
  currentProject?: Project;
};

export const api = Api(fakerApi, {});


export class CloudContainer extends Container<CloudState> {
  state: CloudState = {};
  setToken(token: string) {
    this.setState({
      token
    });
  }
}

export const Cloud = new CloudContainer();
