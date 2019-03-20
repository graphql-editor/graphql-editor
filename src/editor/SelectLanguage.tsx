import * as styles from './style/SelectLanguage';
import * as React from 'react';
import { Button } from './Button';

export type SelectLanguageProps = {
  onGenerate: () => void;
  generateVisible?: boolean;
};
type SelectLanguageState = {
};

export class SelectLanguage extends React.Component<SelectLanguageProps, SelectLanguageState> {
  state: SelectLanguageState = {
    copied: false
  };
  render() {
    const {
      onGenerate,
      generateVisible,
    } = this.props;
    return (
      <div className={styles.Bar}>
        {generateVisible && (
          <Button type="GenerateButton" onClick={onGenerate}>
            Generate
          </Button>
        )}
      </div>
    );
  }
}
