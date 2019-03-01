import * as React from 'react';
import * as styles from './style/ProjectTileButton';
import * as cx from 'classnames';
import { IconProps, IconImage } from './Icon';

export const ProjectTileButton = ({
  icon,
  name,
  onClick,
  type,
  href
}: {
  icon: IconProps;
  type: Exclude<keyof typeof styles, 'Main' | 'Text'>;
  name: string;
  onClick?: () => void;
  href?: string;
}) => (
  <a className={cx(styles.Main, styles[type])} onClick={onClick} href={href}>
    <IconImage name={icon.name} />
  </a>
);
