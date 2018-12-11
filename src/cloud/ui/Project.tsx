import * as React from 'react';
import * as styles from '../style/Project';
import { Project as ProjectType, State } from '../types';
import { OverlayMenuProps } from '../Components/OverlayMenu';
import { ActionButton } from './ActionButton';
export const Project = ({
  project,
  deployFaker,
  deployProject,
  loadProject
}: {
  project: State<ProjectType>;
} & Pick<OverlayMenuProps, 'deployFaker' | 'deployProject' | 'loadProject'>) => (
  <div className={styles.Project}>
    <div className={styles.Name}>{project.name}</div>
    <a
      target="blank"
      href={`https://faker.graphqleditor.com/${project.owner.namespace.slug}/${
        project.slug
      }/graphql`}
      className={styles.fakerURL}
    >{`Open faker GraphQL`}</a>
    <div className={styles.Actions}>
      <ActionButton
        onClick={() => {
          loadProject(project);
        }}
      >
        Load
      </ActionButton>
      <ActionButton
        onClick={() => {
          deployFaker(project);
        }}
      >
        Deploy to Faker
      </ActionButton>
    </div>
  </div>
);
