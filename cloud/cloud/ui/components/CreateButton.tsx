import * as React from 'react';
import * as styles from './style/CreateButton';
export interface CreateButtonType {
  name: string;
  onClick: () => void;
}
export class CreateButton extends React.Component<CreateButtonType, {}> {
  render() {
    return (
      <div className={styles.CreateButton} onClick={this.props.onClick}>
        {this.props.name}
      </div>
    );
  }
}
