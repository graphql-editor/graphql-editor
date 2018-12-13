import * as React from 'react';
import * as styles from '../style/Project';
import * as cx from 'classnames';
import { Project as ProjectType, State } from '../types';
import { OverlayMenuProps } from '../Components/OverlayMenu';
import { ActionButton } from './ActionButton';
import { AreYouSure } from './AreYouSure';
export type ProjectProps = {
  project: State<ProjectType>;
  fakerEnabled: boolean;
  current: boolean;
} & OverlayMenuProps;
type ProjectState = {
  deleting: boolean;
};
export class Project extends React.Component<ProjectProps, ProjectState> {
  state: ProjectState = { deleting: false };
  render() {
    const { project, deployFaker, loadProject, fakerEnabled, current } = this.props;
    const ProjectPart = (
      <React.Fragment>
        <div
          className={styles.Delete}
          onClick={() => {
            this.setState({
              deleting: true
            });
          }}
        >
          X
        </div>
        <div className={styles.Name}>{project.name}</div>
        <a
          target="blank"
          href={
            fakerEnabled
              ? `https://faker.graphqleditor.com/${project.owner.namespace.slug}/${
                  project.slug
                }/graphql`
              : undefined
          }
          className={cx({
            [styles.fakerURL]: true,
            [styles.fakerURLDisabled]: !fakerEnabled
          })}
        >
          {fakerEnabled ? `Open faker GraphQL →` : `deploy to faker to get URL`}
        </a>
        <div className={styles.Actions}>
          <ActionButton
            onClick={() => {
              if (!current) {
                loadProject(project);
              }
            }}
            active={current}
          >
            {!current ? `Load` : `Active Project`}
          </ActionButton>
          <ActionButton
            onClick={() => {
              if (current) {
                deployFaker(project);
              }
            }}
            disabled={!current}
          >
            {current ? `Deploy to Faker` : `Load to deploy faker`}
          </ActionButton>
        </div>
      </React.Fragment>
    );
    return (
      <div className={styles.Project}>
        {this.state.deleting ? (
          <AreYouSure
            onNo={() => {
              this.setState({ deleting: false });
            }}
            onYes={() => this.props.removeProject(project)}
          />
        ) : (
          ProjectPart
        )}
      </div>
    );
  }
}
