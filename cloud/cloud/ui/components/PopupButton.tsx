import * as React from 'react';
import * as styles from './style/PopupButton';
import * as cx from 'classnames';
import { IconProps, IconImage } from './Icon';

export const PopupButton = ({
  icon,
  name,
  onClick,
  type,
  href
}: {
  icon: IconProps;
  type: Exclude<keyof typeof styles, 'Main'>;
  name: string;
  onClick?: () => void;
  href?: string;
}) => (
  <a className={cx(styles.Main, styles[type])} onClick={onClick} href={href}>
    <span>{name}</span>
    <IconImage name={icon.name} />
  </a>
);
