import * as React from 'react';
import * as styles from '../style/Button';
import * as classNames from 'classnames';


export type ButtonProps = {
  size?: string,
};

/* const sizeMap = {
  'medium': styles.ButtonMedium,
} */

export class Button extends React.Component<ButtonProps> {
  render() {

    // const sizeClass = sizeMap[this.props.size] || sizeMap.medium;

    return (
      <button className={styles.Button}>{this.props.children}</button>
    );
  }
}
