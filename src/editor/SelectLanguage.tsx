import * as styles from './style/SelectLanguage';
import * as React from 'react';

export type SelectLanguageProps = {
  tabs: string[];
  onSelect: (x: any) => void;
  onCopy: () => void;
};
type SelectLanguageState = {
  copied: boolean;
};

export class SelectLanguage extends React.Component<SelectLanguageProps, SelectLanguageState> {
  state: SelectLanguageState = {
    copied: false
  };
  render() {
    const { tabs, onSelect, onCopy } = this.props;
    const { copied } = this.state;
    return (
      <div className={styles.Bar}>
        <div className={styles.SelectLangugage}>
          <select
            className={styles.Select}
            onChange={(e) => {
              onSelect(e.target.value);
            }}
          >
            {tabs.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
        {copied && <div className={styles.Copied}>Copied to clipboard!</div>}
        <img
          className={styles.CopyIcon}
          onClick={() => {
            this.setState({
              copied: true
            });
            setTimeout(() => {
              this.setState({
                copied: false
              });
            }, 1000);
            onCopy();
          }}
          src={require('./assets/copyIcon.png')}
        />
      </div>
    );
  }
}
