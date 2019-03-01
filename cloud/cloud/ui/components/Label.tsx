import * as React from 'react';
import * as styles from './style/Label';
export interface LabelType {
  name:string
}
export class Label extends React.Component<LabelType, {}> {
  render() {
    return (
        <label className={styles.Label}>{this.props.name}</label>
    );
  }
}
