import * as React from 'react';
import * as styles from './style/Input';
import { Input } from './Input';
export interface FormInputType {
  onSubmit: (e: string) => void;
  placeholder?: string;
  value?: string;
}
interface FormInputState {
  value: string;
}
export class FormInput extends React.Component<FormInputType, FormInputState> {
  constructor(props: FormInputType) {
    super(props);
    this.state = {
      value: props.value || ''
    };
  }
  render() {
    return (
      <form
        className={styles.Form}
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit(this.state.value);
        }}
      >
        <Input
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={(value) => this.setState({ value })}
        />
      </form>
    );
  }
}
