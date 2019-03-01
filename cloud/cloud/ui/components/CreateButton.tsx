import * as React from 'react';
import * as styles from './style/CreateButton';
export interface LabelType {
  name: string;
  onClick: () => void;
}
export class CreateButton extends React.Component<LabelType, {}> {
  render() {
    return (
      <div className={styles.CreateButton} onClick={this.props.onClick}>
        {this.props.name}
      </div>
    );
  }
}
