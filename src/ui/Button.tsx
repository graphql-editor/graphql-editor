import * as React from 'react';
import * as styles from '../style/Button';
import cx from 'classnames';
import { Icon } from './Icon';

export type ButtonProps = {
  size?: string,
  rounded?: boolean,
  onClick?: (e: React.MouseEvent) => void,
  icon?: string,
  iconSize?: number,
  className?: string,
  disabled?: boolean,
  active?: boolean,
};

const sizeMap = {
  'medium': styles.ButtonMedium,
}

export class Button extends React.Component<ButtonProps> {
  render() {
    const {
      size,
      onClick,
      rounded,
      children,
      icon,
      iconSize,
      className,
      disabled,
      active,
    } = this.props;

    const sizeClass = sizeMap[size] || sizeMap.medium;

    return (
      <button
        onClick={onClick || null}
        disabled={disabled}
        className={cx(className, styles.Button, sizeClass, { [styles.ButtonRounded]: rounded, [styles.ButtonReactive]: !disabled })}
      >
        {icon && (
          <Icon
            className={cx({ [styles.ButtonElementIcon]: !!children })}
            icon={icon}
            size={iconSize}
            disabled={disabled}
            active={active}
          />
        )}
        {children}
      </button>
    );
  }
}
