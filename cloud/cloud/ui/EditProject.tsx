import * as React from 'react';
import { State, Project } from '../types/project';
import * as styles from './style/EditProject';
import * as pstyles from './style/Projects';
import * as cx from 'classnames';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { CreateButton, IconButton, Label, Input, HorizontalSpacer } from './components';
interface EditProjectState {
  project: State<Project>;
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
    const { project } = this.state;
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
                    <IconButton
                      name="remove"
                      type="Red"
                      animation="Expand"
                      onClick={() => {
                        cloud.setState({
                          popup: 'deleteProject',
                          removedProject: this.state.project
                        });
                      }}
                    >
                      Delete
                    </IconButton>
                    <HorizontalSpacer width={10} />
                    <IconButton
                      name="save"
                      animation="Shrink"
                      type="Green"
                      onClick={() => {
                        return cloud.editProject(this.state.project).then(() =>
                          cloud.setState({
                            category: 'my',
                            visibleMenu: 'projects'
                          })
                        );
                      }}
                    >
                      Save
                    </IconButton>
                  </>
                )}
                {!editsProject && (
                  <>
                    <CreateButton
                      name="create +"
                      onClick={() => {
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
