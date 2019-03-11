import * as styles from './style/SelectLanguage';
import * as React from 'react';
import { Button } from './Button';

export type SelectLanguageProps = {
  onCopy: () => void;
  onGenerate: () => void;
  generateVisible?: boolean;
};
type SelectLanguageState = {
  copied: boolean;
};

export class SelectLanguage extends React.Component<SelectLanguageProps, SelectLanguageState> {
  state: SelectLanguageState = {
    copied: false
  };
  render() {
    const {
      onCopy,
      onGenerate,
      generateVisible,
    } = this.props;
    const { copied } = this.state;
    return (
      <div className={styles.Bar}>
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
        {generateVisible && (
          <Button type="GreenButton" onClick={onGenerate}>
            Generate
          </Button>
        )}
      </div>
    );
  }
}
