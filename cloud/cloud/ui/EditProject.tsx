import * as React from 'react';
import { State, Project } from '../types/project';
import * as styles from '../style/EditProject';
import * as pstyles from '../style/Projects';
import { Input } from './components/Input';
import * as cx from 'classnames';
import { ProjectTileButton } from './components/ProjectTileButton';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { Label } from './components/Label';
import { CreateButton } from './components/CreateButton';
interface EditProjectState {
  project: State<Project>;
  type: 'new' | 'url' | 'diagram';
  url: string;
  header: string;
}
interface EditProjectProps {
  project?: State<Project>;
}
export class EditProject extends React.Component<EditProjectProps, EditProjectState> {
  state: EditProjectState;
  setProject = <T extends keyof EditProjectState['project']>(
    name: T,
    value: EditProjectState['project'][T]
  ) => {
    this.setState((state) => ({
      project: {
        ...state.project,
        [name]: value
      }
    }));
  };
  constructor(props: EditProjectProps) {
    super(props);
    this.state = {
      type: 'new',
      url: '',
      header: '',
      project: {
        id: null,
        public: true,
        name: '',
        description: '',
        tags: [],
        ...(props.project || {})
      }
    };
  }
  render() {
    const { type, project } = this.state;
    const editsProject = !!project.id;
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <div className={styles.EditProject}>
              <div className={styles.Label}>
                <Label name="Basic settings" />
              </div>
              <div className={styles.ShareLabel}>
                <Label name="Share settings" />
              </div>
              <div className={styles.Name}>
                <Input
                  value={project.name}
                  placeholder="Name"
                  onChange={(e) => this.setProject('name', e)}
                />
              </div>
              <div className={styles.Tags}>
                <Input
                  placeholder="Space separated tags"
                  value={project.tags.join(' ')}
                  onChange={(e) => this.setProject('tags', e.split(' '))}
                />
              </div>
              <div className={styles.Description}>
                <Input
                  placeholder="Description"
                  onChange={(e) => this.setProject('description', e)}
                  value={project.description}
                />
              </div>
              {!editsProject && (
                <>
                  <div className={styles.TypeLabel}>
                    <Label name="Creation method" />
                  </div>
                  <div className={styles.Type}>
                    <div className={pstyles.TabsGrid}>
                      <a
                        onClick={() => this.setState({ type: 'new' })}
                        className={cx({ active: type === 'new' })}
                      >
                        new
                      </a>
                      <a
                        onClick={() => this.setState({ type: 'url' })}
                        className={cx({ active: type === 'url' })}
                      >
                        from URL
                      </a>
                      <a
                        onClick={() => this.setState({ type: 'diagram' })}
                        className={cx({ active: type === 'diagram' })}
                      >
                        current diagram
                      </a>
                    </div>
                  </div>
                </>
              )}
              {this.state.type === 'url' && (
                <>
                  <div className={styles.Url}>
                    <Input
                      placeholder="GraphQL endpoint URL"
                      onChange={(url) => this.setState({ url })}
                    />
                  </div>
                  <div className={styles.Header}>
                    <Input
                      placeholder="Additonal header"
                      onChange={(header) => this.setState({ header })}
                    />
                  </div>
                </>
              )}
              <div className={styles.PublicLabel}>
                <Label name="Project privacy settings" />
              </div>

              <div className={styles.Public}>
                <div className={pstyles.TabsGrid}>
                  <a
                    onClick={() => this.setProject('public', true)}
                    className={cx({ active: !!project.public })}
                  >
                    public
                  </a>
                  <a
                    onClick={() => this.setProject('public', false)}
                    className={cx({ active: !project.public })}
                  >
                    private
                  </a>
                </div>
              </div>
              <div className={styles.Actions}>
                {editsProject && (
                  <>
                    <ProjectTileButton
                      type="Delete"
                      name="delete"
                      icon={{
                        name: 'delete'
                      }}
                      onClick={() => {
                        cloud.setState({
                          popup: 'deleteProject',
                          removedProject: this.state.project
                        });
                      }}
                    />
                    <ProjectTileButton
                      type="Edit"
                      name="edit"
                      icon={{
                        name: 'edit'
                      }}
                      onClick={() => {
                        return cloud.editProject(this.state.project).then(() =>
                          cloud.setState({
                            category: 'my',
                            visibleMenu: 'projects'
                          })
                        );
                      }}
                    />
                  </>
                )}
                {!editsProject && (
                  <>
                    <CreateButton
                      name="create +"
                      onClick={() => {
                        if (this.state.type === 'url') {
                          if (!this.state.url) return;
                          cloud.loadFromURL(this.state.url, this.state.header);
                        }
                        return cloud.createProject(this.state.project).then(() =>
                          cloud.setState({
                            visibleMenu: 'code'
                          })
                        );
                      }}
                    />
                  </>
                )}
              </div>
              <div className={styles.Share}>
                <Input placeholder="Share with people and teams" onChange={(e) => {}} />
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
