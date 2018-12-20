import { userApi, Cloud } from '../Container';

export const afterLogin = (instance: typeof Cloud) => async (
  apiFunction: typeof userApi,
  fakerCloud: 'faker' | 'cloud'
) => {
  if (!instance.state.token) {
    return;
  }
  if (instance.state.popup === 'onBoarding') {
    await instance.closePopup();
  }
  const sm = `Logging ${fakerCloud}  in...`;
  await instance.upStack(sm);
  return apiFunction(instance.state.token)
    .Query.getUser({
      username: instance.state.user.id
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
      console.log(res);
      if (res === null) {
        await instance.setState({
          popup: 'createUser'
        });
        return instance.deStack(sm);
      }
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
    .catch((res) => {
      if (res === null) {
        return instance.deStack(sm);
      } else {
        return instance.errStack(res.errors[0].message);
      }
    });
};
