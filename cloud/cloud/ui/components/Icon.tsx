import * as React from 'react';
import * as styles from './style/Icon';
import * as cx from 'classnames';
import * as Icons from '../../../assets/icon-font';
export interface IconProps {
  name: keyof typeof Icons;
  style?: React.CSSProperties;
}
export interface IconButtonProps extends IconProps {
  children: React.ReactNode;
  type: keyof typeof styles.IconButtonVariants;
  animation: keyof typeof styles.IconButtonHoverAnimations;
  onClick?: (e: React.MouseEvent) => void;
}
export interface TopBarIconProps extends IconProps {
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  blank?: boolean;
  active?: boolean;
  hint?: string;
  right?: boolean;
}
export const IconImage = ({ name, style = {} }: IconProps) => (
  <i style={style} className={Icons[name]} />
);
export const IconButton = ({
  name,
  children,
  onClick,
  type,
  animation,
  style = {}
}: IconButtonProps) => (
  <a
    style={style}
    onClick={onClick}
    className={cx(
      styles.IconButton,
      styles.IconButtonVariants[type],
      styles.IconButtonHoverAnimations[animation]
    )}
  >
    <span>{children}</span>
    <IconImage name={name} />
  </a>
);
export const TopBarIcon = ({
  name,
  onClick,
  active,
  hint,
  href,
  right,
  blank
}: TopBarIconProps) => (
  <a
    className={cx(styles.TopBarIcon, {
      active,
      right
    })}
    target={blank ? 'blank' : undefined}
    href={href}
    onClick={onClick}
  >
    <IconImage name={name} />
    {hint && <div className={cx(styles.Hint, 'hint')}>{hint}</div>}
  </a>
);
