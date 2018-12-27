import { Cloud, fakerUserApi } from '../Container';
import { saveProjectTemplate } from './saveProject';
import { State, Project } from '../types/project';
import { NodeType, LinkType } from '@slothking-online/diagram';
import { Analytics } from '../analytics';

export const fakerDeployProject = (instance: typeof Cloud) => async ({
  nodes,
  links,
  tabs,
  project
}: {
  project: State<Project>;
  nodes: NodeType[];
  links: LinkType[];
  tabs: string[];
}) => {
  const sm = `deploying faker...`;

  Analytics.events.faker({
    action: 'deploy'
  });
  await instance.upStack(sm);
  const fakerNamespace = instance.state.faker.namespace;
  if (!(fakerNamespace && fakerNamespace.slug)) {
    const response = await fakerUserApi(instance.state.token).Mutation.createUser({
      namespace: instance.state.cloud.namespace.slug,
      public: !!instance.state.cloud.namespace.public
    })({
      id: true,
      username: true,
      namespace: {
        public: true,
        slug: true,
        projects: [
          {},
          {
            projects: {
              public: true,
              name: true,
              id: true,
              slug: true,
              endpoint: {
                uri: true
              }
            }
          }
        ]
      }
    });
    await instance.setState({
      faker: {
        namespace: {
          public: response.namespace.public,
          slug: response.namespace.slug
        },
        user: {
          id: response.id
        },
        projects: response.namespace.projects.projects
      }
    });
  }
  let correspondingFakerProject = instance.state.faker.projects.find(
    (fp) => fp.name === project.name
  );
  if (!correspondingFakerProject) {
    correspondingFakerProject = await fakerUserApi(instance.state.token).Mutation.createProject({
      name: project.name,
      public: true
    })({
      name: true,
      id: true,
      slug: true,
      public: true,
      endpoint: {
        uri: true
      }
    });
    instance.setState({
      faker: {
        projects: [...instance.state.faker.projects, correspondingFakerProject]
      }
    });
  }
  await instance.deStack(sm);
  return saveProjectTemplate(instance)(fakerUserApi, {
    project: correspondingFakerProject,
    nodes,
    links,
    tabs
  });
};
