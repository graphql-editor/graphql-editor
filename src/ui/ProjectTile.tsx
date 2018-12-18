import * as React from 'react';
import * as styles from '../style/ProjectTile';
import { Project, State } from 'cloud/types/project';
import { TopButton } from './TopButton';
import { HorizontalSpacer } from './HorizontalSpacer';

export const ProjectTile = ({
  project,
  onLoad
}: {
  project: State<Project>;
  onLoad: () => void;
}) => (
  <div className={styles.Tile}>
    <div className={styles.Top}>
      <div className={styles.Name}>{project.name}</div>
      <div className={styles.Updated}>{project.public ? 'public' : 'private'}</div>
    </div>
    <div className={styles.Slug}>{project.endpoint.uri}</div>
    <div className={styles.Actions}>
      <TopButton small variant={'RedFull'} onClick={() => {}}>
        Open Mock Backend
      </TopButton>
      <HorizontalSpacer />
      <TopButton small variant={'GreenMidFull'} onClick={onLoad}>
        Load
      </TopButton>
    </div>
  </div>
);
