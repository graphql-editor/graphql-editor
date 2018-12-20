import { Cloud, userApi, fakerUserApi } from '../Container';
import { State, Project } from '../types/project';

export const removeProject = (instance: typeof Cloud) => async (project: State<Project>) => {
  const sm = `Removing project...`;
  await instance.upStack(sm);
  if (
    instance.state.cloud.currentProject &&
    project.id === instance.state.cloud.currentProject.id
  ) {
    instance.setState((state) => ({
      cloud: {
        ...state.cloud,
        currentProject: null
      }
    }));
  }
  const fakerProject =
    instance.state.faker.projects &&
    instance.state.faker.projects.find((p) => p.slug === project.slug);
  return userApi(instance.state.token)
    .Mutation.removeProject({
      project: project.id
    })({})
    .then(() => {
      if (fakerProject) {
        return fakerUserApi(instance.state.token).Mutation.removeProject({
          project: fakerProject.id
        })({});
      }
      return;
    })
    .then(async () => {
      if (fakerProject) {
        await instance.setState((state) => ({
          faker: {
            ...state.faker,
            projects: state.faker.projects.filter((p) => p.id !== fakerProject.id)
          }
        }));
      }
      return instance.setState((state) => ({
        cloud: {
          ...state.cloud,
          projects: state.cloud.projects.filter((p) => p.id !== project.id)
        }
      }));
    })
    .then(() => instance.deStack(sm));
};
