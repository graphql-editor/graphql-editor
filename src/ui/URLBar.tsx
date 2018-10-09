import * as React from 'react';
import { Button } from './Button';
import { ArrowLeft2 } from '../assets/icons';
import * as styles from '../style/URLBar';
export type URLBarState = {
  url: string;
  loading: boolean;
};
export type URLBarProps = {
  onClick: (url: string) => void;
  goBack: (e: React.MouseEvent) => void;
};
export class URLBar extends React.Component<URLBarProps, URLBarState> {
  state: URLBarState = {
    url: '',
    loading: false
  };
  render() {
    return (
      <div className={styles.URLBar}>
        <Button icon={ArrowLeft2} onClick={this.props.goBack} />
        {!this.state.loading && (
          <input
            className={styles.URLBarInput}
            type="text"
            onChange={(e) => {
              this.setState({
                url: e.target.value
              });
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                this.setState({
                  loading: true
                });
                this.props.onClick(this.state.url);
              }
            }}
            value={this.state.url}
            placeholder={`Type graphql endpoint here and click enter`}
          />
        )}
        {this.state.loading && (
          <div className={styles.URLLoading}>{`Loading url ${this.state.url}`}</div>
        )}
      </div>
    );
  }
}
