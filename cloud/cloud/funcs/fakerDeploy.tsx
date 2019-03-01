import { Cloud } from '../Container';
import { State, Project } from '../types/project';
import { Analytics } from '../analytics';
import { Schemas } from '../models';
import { deployFaker } from './faker/deploy';
import { FakerCalls } from './faker/calls';

export const fakerDeployProject = (instance: typeof Cloud) => async ({
  schemas,
  project
}: {
  project: State<Project>;
  schemas: Schemas;
}) => {
  const sm = `deploying faker...`;
  Analytics.events.faker({
    action: 'deploy'
  });
  await instance.upStack(sm);
  let fakerNamespace = instance.state.faker.namespace;
  if (!(fakerNamespace && fakerNamespace.slug)) {
    const fakerResponse = await FakerCalls.createUser(instance)(
      instance.state.cloud.namespace.slug!
    );
    const { namespace, id } = fakerResponse;
    const {
      projects: { projects },
      ...fakerRestNamespace
    } = namespace;
    await instance.setState({
      faker: {
        projects: projects,
        namespace: fakerRestNamespace,
        user: {
          id
        }
      }
    });
    await instance.setCloud();
  }
  let correspondingFakerProject = instance.state.currentProject.faker;
  if (!correspondingFakerProject) {
    correspondingFakerProject = await FakerCalls.createProject(instance)(project.name, true);
    await instance.setState((state) => ({
      ...state,
      faker: {
        ...state.faker
      },
      currentProject: {
        ...state.currentProject,
        faker: correspondingFakerProject
      }
    }));
    await instance.setCloud();
  }
  await instance.deStack(sm);
  return deployFaker(instance)({ project: correspondingFakerProject, schemas });
};
