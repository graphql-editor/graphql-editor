import * as React from 'react';
import * as styles from './style/ProjectTile';
import { Project, State } from '../../types/project';
import { ProjectTileButton } from './ProjectTileButton';

const MAX_TITLE_LENGTH = 25;

export interface ProjectTileProps {
  project: State<Project>;
  fakerProject?: State<Project>;
  onLoad: () => void;
  onEdit?: () => void;
  onTagSearch?: () => void;
}

export const ProjectTile = ({
  project,
  onLoad,
  onEdit,
  onTagSearch,
}: ProjectTileProps) => (
  <div className={styles.Tile}>
    <div className={styles.Top}>
      <div className={styles.Name}>
        {project.endpoint.uri.length > MAX_TITLE_LENGTH
          ? `${project.endpoint.uri.slice(0, MAX_TITLE_LENGTH)}...`
          : project.endpoint.uri}
      </div>
      <div className={styles.Updated}>{project.public ? 'public' : 'private'}</div>
    </div>
    <div className={styles.Tags}>
      {project.tags &&
        project.tags.slice(0, 4).map((t) => (
          <a onClick={onTagSearch} key={t}>
            {t}
          </a>
        ))}
    </div>
    <div className={styles.Description}>{project.description.slice(0,255)}</div>
    <div className={styles.Actions}>
      {onEdit && (
        <ProjectTileButton onClick={onEdit} icon={{ name: 'edit' }} name="edit" type="Edit" />
      )}
      <ProjectTileButton onClick={onLoad} icon={{ name: 'arrowRight' }} name="open" type="Open" />
    </div>
  </div>
);
