import { Cloud } from '../Container';
import { Analytics } from '../analytics';
import { Calls } from './calls';
import { Project, State } from '../types/project';

export class Projects {
  examplesLoadedOnce = false;
  constructor(private instance: typeof Cloud) {}
  createProject = async (name: string, is_public: boolean, no_reset?: boolean) => {
    const sm = 'Creating project...';
    Analytics.events.project({
      action: 'create'
    });
    await this.instance.upStack(sm);
    const [project, fakerProject] = await Calls.createProject(this.instance)(name, is_public);
    await this.instance.setState((state) => ({
      ...state,
      cloud: {
        ...state.cloud,
        projects: [...state.cloud.projects, project]
      },
      faker: {
        ...state.faker
      },
      currentProject: {
        cloud: project,
        faker: fakerProject
      }
    }));
    await this.instance.setCloud();
    await this.instance.deStack(sm);
    if (!no_reset) this.instance.controller.resetGraph();
    return project;
  };

  loadProject = async (p: State<Project>) => {
    const sm = `Loading project...`;
    await this.instance.upStack(sm);
    Analytics.events.project({
      action: 'load'
    });
    const [project, fakerProject] = await Calls.getProject(this.instance)(p);
    if (!project) {
      this.instance.errStack(`Project does'nt exist or you don't have proper rights to view it`);
    }
    const { sources } = project.sources;
    if (sources.length > 0) {
      const projectURL = sources.find((s) => s.filename === 'schema.graphql').getUrl;
      try {
        const project = await (await fetch(projectURL)).text();
        this.instance.controller.loadGraphQL(project);
      } catch (error) {
        this.instance.controller.resetGraph();
      }
    } else {
      this.instance.controller.resetGraph();
    }
    await this.instance.setState((state) => ({
      currentProject: {
        cloud: project,
        faker: fakerProject
      }
    }));
    return this.instance.deStack(sm);
  };
  loadFromURL = async (url: string, header?: string) => {
    const sm = `loading schema from url...`;
    Analytics.events.project({
      action: 'loadFromURL',
      label: url
    });
    await this.instance.upStack(sm);
    try {
      await this.instance.controller!.getSchemaFromURL(url, header);
      return this.instance
        .setState((state) => ({
          currentProject: null,
          visibleMenu: 'code'
        }))
        .then(this.instance.setCloud)
        .then(() => this.instance.deStack(sm));
    } catch (error) {
      this.instance.errStack(
        `${url} is not correct GraphQL endpoint or schema contains definitions not provided to editor.`
      );
    }
  };

  removeProject = async () => {
    const project = this.instance.state.removedProject;
    const sm = `Removing project...`;
    await this.instance.upStack(sm);
    if (!this.instance.canIEditProject(project)) {
      throw new Error(`You can't remove this project`);
    }
    Analytics.events.project({
      action: 'remove'
    });
    if (
      this.instance.state.currentProject &&
      project.id === this.instance.state.currentProject.cloud.id
    ) {
      await this.instance.setState((state) => ({
        currentProject: null
      }));
      this.instance.controller.resetGraph();
    }
    await Calls.removeProject(this.instance)(project);
    await this.instance.setState((state) => ({
      cloud: {
        ...state.cloud,
        projects: state.cloud.projects.filter((p) => p.id !== project.id),
      }
    }));
    await this.instance.deStack(sm);
    return;
  };
  findProjectByEndpoint = async (endpoint: string) => {
    const sm = `finding project...`;
    Analytics.events.project({
      action: 'loadByEndpoint',
      label: endpoint
    });
    await this.instance.upStack(sm);
    return Calls.findProjectByEndpoint(this.instance)(endpoint).then(async ([project]) => {
      await this.instance.deStack(sm);
      if (project) {
        return this.loadProject(project);
      }
      await this.instance.upStack(`Check if you provided URL correctly`);
      await this.instance.errStack(`No such project: ${endpoint}`);
      if (this.instance.state.currentProject) {
        this.instance.moveToCurrentProject();
      } else {
        this.instance.state.pushHistory('/');
      }
      return null;
    });
  };

  searchPublicProjects = async (query: string) => {
    const sm = `searching projects...`;
    Analytics.events.project({
      action: 'search',
      label: query
    });
    await this.instance.upStack(sm);
    const results = await Calls.searchProjects(query);
    await this.instance.setState((state) => ({
      cloud: {
        ...state.cloud,
        searchProjects: results.projects.filter((p) => p.sources.sources.length > 0)
      }
    }));
    this.instance.deStack(sm);
  };
  searchPublicProjectsByTag = async (tag: string) => {
    const sm = `searching projects...`;
    Analytics.events.project({
      action: 'search',
      label: tag
    });
    await this.instance.upStack(sm);
    const results = await Calls.searchProjectsByTag(tag);
    await this.instance.setState((state) => ({
      cloud: {
        ...state.cloud,
        searchProjects: results.projects.filter((p) => p.sources.sources.length > 0)
      }
    }));
    this.instance.deStack(sm);
  };
  loadExamples = async () => {
    if (this.examplesLoadedOnce) {
      return;
    }
    const sm = `loading examples...`;

    Analytics.events.project({
      action: 'examples'
    });
    await this.instance.upStack(sm);
    this.examplesLoadedOnce = true;
    const projectProjects = await Calls.searchProjects('showcase');
    await this.instance.setState((state) => ({
      cloud: {
        ...state.cloud,
        exampleProjects: projectProjects.projects.filter(
          (p) => p.endpoint.uri.split('/')[0] === 'showcase'
        )
      }
    }));
    await this.instance.deStack(sm);
  };
}
