import * as React from 'react';
import * as styles from '../style/UI';

export type TopBarCustomProps = {
  left?: React.ReactNode;
  right?: React.ReactNode;
  center?: React.ReactNode;
};
export class TopBarCustom extends React.Component<TopBarCustomProps> {
  render() {
    const { left, center, right } = this.props;
    return (
      <div className={styles.TopBar}>
        <div className={styles.Left}>{left}</div>
        <div className={styles.Center}>{center}</div>
        <div className={styles.Right}>{right}</div>
      </div>
    );
  }
}
