import * as React from 'react';
import * as styles from '../style/ProjectTile';
import { Project, State } from 'cloud/types/project';
import { TopButton } from './TopButton';
import { HorizontalSpacer } from './HorizontalSpacer';
import { VerticalSpacer } from './VerticalSpacer';

export const ProjectTile = ({
  project,
  fakerProject,
  onLoad,
  onDelete
}: {
  project: State<Project>;
  fakerProject?: State<Project>;
  onLoad: () => void;
  onDelete?: () => void;
}) => (
  <div className={styles.Tile}>
    <div className={styles.Top}>
      <div className={styles.Name}>{project.endpoint.uri}</div>
      <div className={styles.Updated}>{project.public ? 'public' : 'private'}</div>
    </div>
    <div className={styles.Slug}>{project.endpoint.uri}</div>
    <VerticalSpacer height={20} />
    <div className={styles.Actions}>
      {onDelete && (
        <>
          <TopButton variant={'RedFull'} small onClick={onDelete}>
            Delete Project
          </TopButton>
          <HorizontalSpacer />
        </>
      )}
      <TopButton
        disabled={fakerProject ? undefined : 'This project is not deployed to faker'}
        small
        variant={'Deploy'}
        href={
          fakerProject && `https://faker.graphqleditor.com/${fakerProject.endpoint.uri}/graphql`
        }
        target={fakerProject && '_blank'}
        onClick={() => {}}
      >
        Mock Backend
      </TopButton>
      <HorizontalSpacer />
      <TopButton small variant={'GreenMidFull'} onClick={onLoad}>
        Open
      </TopButton>
    </div>
  </div>
);
