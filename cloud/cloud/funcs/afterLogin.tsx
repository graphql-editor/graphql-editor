import { userApi, Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const afterLogin = (instance: typeof Cloud) => async (
  apiFunction: typeof userApi,
  fakerCloud: 'faker' | 'cloud'
) => {
  if (!instance.state.token) {
    return;
  }
  Analytics.events.user({
    action: 'login'
  });
  if (instance.state.popup === 'onBoarding' && instance.state.currentProject) {
    await instance.closePopup();
  }
  const sm = `Logging ${fakerCloud}  in...`;
  await instance.upStack(sm);
  return Calls.getUser(instance)(apiFunction)
    .then(async (res) => {
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
          },
          user: instance.state.user || {
            id,
            username: res.username
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
