import * as React from 'react';
import * as styles from './style/Input';
export interface InputType {
  placeholder?: string;
  value?: string;
  onChange: (e: string) => void;
}
export class Input extends React.Component<InputType, {}> {
  render() {
    return (
      <input
        className={styles.Input}
        type="text"
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={(e) => this.props.onChange(e.target.value)}
      />
    );
  }
}
