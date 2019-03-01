import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';

export const afterLogin = async (instance: typeof Cloud) => {
  if (!instance.state.token) {
    return;
  }
  Analytics.events.user({
    action: 'login'
  });
  if (instance.state.popup === 'onBoarding' && instance.state.currentProject) {
    await instance.closePopup();
  }
  const sm = `Logging in...`;
  await instance.upStack(sm);
  return Calls.getUser(instance)
    .then(async (r) => {
      const fakerOrCloud = ['cloud', 'faker'];
      let c = 0;
      for (const res of r) {
        if (res === null) {
          await instance.setState({
            popup: 'createUser'
          });
          return instance.deStack(sm);
        }
        const fakerCloud = fakerOrCloud[c];
        const { namespace, id } = res;
        const {
          projects: { projects },
          ...restNamespace
        } = namespace;
        await instance.setState({
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
        });
        c++;
      }
      return instance.deStack(sm);
    })
    .catch((res) => {
      if (res === null) {
        return instance.deStack(sm);
      } else {
        return instance.errStack(res.errors[0].message);
      }
    });
};
