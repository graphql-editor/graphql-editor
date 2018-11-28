import * as React from 'react';
import * as styles from '../style/OverlayAdd';
import { OverlayInput } from './OverlayInput';
import { OverlaySubmit } from './OverlaySubmit';
export type OverlayAddProps = {
  placeholder: string;
  onSubmit: (e: string) => void;
};
type OverlayAddState = {
  value: string;
};
export class OverlayAdd extends React.Component<OverlayAddProps, OverlayAddState> {
  state: OverlayAddState = {
    value: ''
  };
  render() {
    return (
      <div className={styles.Wrapper}>
        <OverlayInput
          onChange={(value) => this.setState({ value })}
          value={this.state.value}
          placeholder={this.props.placeholder}
        />
        <OverlaySubmit
          visible={this.state.value.length > 0}
          onSubmit={() => this.props.onSubmit(this.state.value)}
        >
          Add
        </OverlaySubmit>
      </div>
    );
  }
}
