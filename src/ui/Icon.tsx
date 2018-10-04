import * as React from 'react';
import * as iconSet from '../assets/icons';
import * as styles from '../style/Icon';

import cx from 'classnames';

export type IconProps = {
  size?: number,
  icon?: string,
  className?: string,
  disabled?: boolean,
  active?: boolean,
};

export class Icon extends React.Component<IconProps> {
  private static isUrl(iconString: string) {
    return iconString.indexOf('data:') === 0 || iconString.substr(-4) === '.svg';
  }
  render() {
    console.info(this.props.icon);
    const iconSize = this.props.size || 16;
    const iconType = (Icon.isUrl(this.props.icon) ? this.props.icon : iconSet[this.props.icon]) || '';

    const enabledActiveClass = {
      [styles.IconDisabled]: this.props.disabled && !this.props.active,
      [styles.IconActive]: this.props.active && !this.props.disabled,
      [styles.IconDisabledActive]: this.props.active && this.props.disabled,
    };

    return (
      <span
        className={cx(styles.Icon, enabledActiveClass, this.props.className)}
        style={{
          width: iconSize,
          height: iconSize,
          maskSize: 'contain',
          WebkitMaskSize: 'contain',
          maskImage: `url(${iconType})`,
          WebkitMaskImage: `url(${iconType})`,
        }} />
    );
  }
}
