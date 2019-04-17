import * as React from 'react';
import { Button } from './Button';
import * as styles from './style/SelectLanguage';

export interface SelectLanguageProps {
  onGenerate: () => void;
  generateVisible?: boolean;
}
export class SelectLanguage extends React.Component<SelectLanguageProps> {
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
