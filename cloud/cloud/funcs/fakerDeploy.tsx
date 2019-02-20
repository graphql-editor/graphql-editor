import { Cloud } from '../Container';
import { State, Project } from '../types/project';
import { Analytics } from '../analytics';
import { Schemas } from '../models';
import { createFakerUser } from './faker/createUser';
import { createFakerProject } from './faker/createProject';
import { deployFaker } from './faker/deploy';

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
  const fakerNamespace = instance.state.faker.namespace;
  if (!(fakerNamespace && fakerNamespace.slug)) {
    await createFakerUser(instance)(instance.state.cloud.namespace.slug!);
  }
  let correspondingFakerProject = instance.state.faker.projects.find(
    (fp) => fp.name === project.name
  );
  if (!correspondingFakerProject) {
    correspondingFakerProject = await createFakerProject(instance)(project.name, true);
  }
  await instance.deStack(sm);
  return deployFaker(instance)({ project: correspondingFakerProject, schemas });
};
