import * as React from 'react';
import * as styles from './style/Popup';
import { IconImage } from './Icon';

export const Actions = ({ children }) => <div className={styles.DialogActions}>{children}</div>;

export type PopupProps = {
  onClose?: () => void;
};

export class Popup extends React.Component<PopupProps> {
  render() {
    return (
      <div className={styles.Dialog}>
        {this.props.onClose && (
          <div className={styles.Close} onClick={this.props.onClose}>
            <IconImage name="close" />
          </div>
        )}
        <div className={styles.DialogContent}>{this.props.children}</div>
      </div>
    );
  }
}
