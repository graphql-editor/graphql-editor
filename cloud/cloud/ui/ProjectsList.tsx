import * as React from 'react';
import * as styles from './style/Projects';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { NewProjectTile, FormInput, ProjectTile } from './components';
export type ProjectsState = {
  category: 'my' | 'public' | 'examples' | 'new' | 'edit';
};
export class ProjectsList extends React.Component {
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          const { category } = cloud.state;
          const { projects, searchProjects, exampleProjects } = cloud.state.cloud;
          const findFakerProject = (
            where: keyof Pick<
              typeof cloud.state.cloud,
              'projects' | 'exampleProjects' | 'searchProjects'
            >,
            uri: string
          ) => {
            const searchIn = cloud.state.faker[where];
            if (!searchIn) {
              return undefined;
            }
            return searchIn.find((p) => p.endpoint.uri === uri);
          };
          return (
            <React.Fragment>
              {category === 'public' && (
                <div className={styles.SearchGrid}>
                  <FormInput
                    onSubmit={async (e) => {
                      await cloud.setState({
                        category: 'public'
                      });
                      cloud.searchPublicProjects(e);
                    }}
                    placeholder="Search projects..."
                  />
                  <div className={styles.TabsGrid} />
                </div>
              )}
              {category === 'my' && projects && (
                <div className={styles.ProjectsGrid}>
                  <NewProjectTile
                    onClick={() => {
                      cloud.setState((state) => ({
                        category: 'new'
                      }));
                    }}
                  />
                  {projects.map((p) => (
                    <ProjectTile
                      key={p.id}
                      project={p}
                      onLoad={() => cloud.loadProject(p)}
                      onEdit={() => {
                        cloud.setState({
                          editedProject: p,
                          category: 'edit'
                        });
                      }}
                      fakerProject={findFakerProject('projects', p.endpoint.uri)}
                    />
                  ))}
                </div>
              )}
              {category === 'public' && searchProjects && (
                <div className={styles.ProjectsGrid}>
                  {searchProjects.map((p) => (
                    <ProjectTile
                      key={p.id}
                      project={p}
                      onLoad={() => cloud.loadProject(p)}
                      fakerProject={findFakerProject('searchProjects', p.endpoint.uri)}
                    />
                  ))}
                </div>
              )}
              {category === 'examples' && exampleProjects && (
                <div className={styles.ProjectsGrid}>
                  {exampleProjects.map((p) => (
                    <ProjectTile
                      key={p.id}
                      project={p}
                      onLoad={() => cloud.loadProject(p)}
                      fakerProject={findFakerProject('exampleProjects', p.endpoint.uri)}
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          );
        }}
      </Subscribe>
    );
  }
}
