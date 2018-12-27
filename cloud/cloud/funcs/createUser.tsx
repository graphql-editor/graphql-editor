import { Cloud, userApi } from '../Container';
import { Analytics } from '../analytics';

export const createUser = (instance: typeof Cloud) => (
  apiFunction: typeof userApi,
  fakerCloud: 'faker' | 'cloud'
) => async (namespace: string) => {

  Analytics.events.user({
    action: 'create'
  });
  const sm = `Creating ${fakerCloud} user...`;
  await instance.upStack(sm);
  await instance.closePopup();
  return apiFunction(instance.state.token)
    .Mutation.createUser({
      namespace,
    })({
      id: true,
      namespace: {
        slug: true,
        public: true,
        projects: [
          {},
          {
            projects: {
              id: true,
              public: true,
              name: true,
              slug: true,
              endpoint: {
                uri: true
              }
            }
          }
        ]
      }
    })
    .then(async (res) => {
      const { namespace, id } = res;
      const {
        projects: { projects },
        ...restNamespace
      } = namespace;
      instance
        .setState({
          [fakerCloud]: {
            ...instance.state[fakerCloud],
            namespace: restNamespace,
            projects,
            user: {
              id
            }
          }
        })
        .then(() => {
          return instance.deStack(sm);
        });
    })
    .catch(async (res) => {
      if (res === null) {
        return instance.deStack(sm);
      } else {
        await instance.setState({
          popup: 'createUser'
        });
        return instance.errStack(`Namespace with this name already exists`);
      }
    });
};
