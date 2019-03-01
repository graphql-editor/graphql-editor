import * as React from 'react';
import * as styles from '../style/ProjectTile';
import { Project, State } from '../types/project';
import { VerticalSpacer } from './VerticalSpacer';
import { ProjectTileButton } from './components/ProjectTileButton';

const MAX_TITLE_LENGTH = 25;

export interface ProjectTileProps {
  project: State<Project>;
  fakerProject?: State<Project>;
  onLoad: () => void;
  onDelete?: () => void;
  onEdit?: () => void;
  onFork?: () => void;
  onTagSearch?: () => void;
}

export const ProjectTile = ({
  project,
  onLoad,
  onDelete,
  onEdit,
  onTagSearch,
  onFork
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
        project.tags.slice(0, 5).map((t) => (
          <a onClick={onTagSearch} key={t}>
            {t}
          </a>
        ))}
    </div>
    <div className={styles.Description}>{project.description}</div>
    <VerticalSpacer height={30} />
    <div className={styles.Actions}>
      {onDelete && (
        <ProjectTileButton
          onClick={onDelete}
          icon={{ name: 'delete' }}
          name="delete"
          type="Delete"
        />
      )}
      {onEdit && (
        <ProjectTileButton onClick={onEdit} icon={{ name: 'edit' }} name="edit" type="Edit" />
      )}
      {onFork && (
        <ProjectTileButton onClick={onFork} icon={{ name: 'fork' }} name="fork" type="Fork" />
      )}
      <ProjectTileButton icon={{ name: 'open' }} name="open" type="Open" onClick={onLoad} />
    </div>
  </div>
);
