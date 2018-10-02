import * as React from 'react';
import * as iconSet from '../assets/icons';

export type IconProps = {
  size?: number,
  icon?: string,
};

export class Icon extends React.Component<IconProps> {
  render() {
    const iconSize = this.props.size || 16;
    const iconType = iconSet[this.props.icon] || '';
    console.info(iconSet[this.props.icon]);
    return (
      <div style={{
        width: iconSize,
        height: iconSize,
        backgroundColor: 'white',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskImage: `url(${iconType})`,
        WebkitMaskImage: `url(${iconType})`,
      }} />
    );
  }
}
