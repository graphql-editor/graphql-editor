import * as React from 'react';
import { Button, ButtonProps } from './Button';

export interface ButtonFileProps extends ButtonProps {
  size?: string,
  onChange: (e: any) => void,
};

export class ButtonFile extends React.Component<ButtonFileProps> {
  randomRefId: string;
  constructor(props) {
    super(props);
    this.randomRefId = Math.random().toString();
  }
  buttonClicked = () => {
    document.getElementById(`load${this.randomRefId}`).click();
  }
  render() {
    const { size, onChange, ...buttonProps } = this.props;
    return (
      <React.Fragment>
        <input
          type="file"
          id={`load${this.randomRefId}`}
          style={{ display: 'none' }}
          onChange={this.props.onChange}
        />
        <label htmlFor={`load${this.randomRefId}`}>
          <Button {...buttonProps} onClick={this.buttonClicked}>Load</Button>
        </label>
      </React.Fragment>
    );
  }
}
