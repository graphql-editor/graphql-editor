import * as React from 'react';
import * as styles from './style/TopMenu';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
export interface TopMenuState {
  url: string;
  header: string;
}
export class TopMenu extends React.Component<{}, TopMenuState> {
  state: TopMenuState = {
    url: '',
    header: ''
  };
  render() {
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <div className={styles.TopMenuWrapper}>
              <div
                className={styles.TopMenuArrow}
                onClick={() => {
                  cloud.setState({
                    topMenuOpen: cloud.state.topMenuOpen ? null : 'open'
                  });
                }}
              >
                <img src={require('../../assets/action_icons/vector.png')} />
              </div>

              {!!cloud.state.topMenuOpen && (
                <div className={styles.TopMenu}>
                  {cloud.state.topMenuOpen === 'open' && (
                    <>
                      {cloud.state.currentProject.cloud && (
                        <a
                          className={styles.TopMenuItem}
                          onClick={async () => {
                            await cloud.setState({ topMenuOpen: null });
                            await cloud.forkProject(cloud.state.currentProject.cloud);
                          }}
                        >
                          Duplicate
                        </a>
                      )}
                      <a
                        className={styles.TopMenuItem}
                        onClick={async () => {
                          await cloud.setState({ topMenuOpen: null });
                          cloud.saveAutocompleteTypeScript();
                        }}
                      >
                        Autocomplete .ts libary
                      </a>
                      <a
                        className={styles.TopMenuItem}
                        onClick={async () => {
                          await cloud.setState({ topMenuOpen: null });
                          cloud.saveToFile();
                        }}
                      >
                        Save as .gql
                      </a>

                      <button className={`${styles.FileButton}`}>
                        Load .gql
                        <input
                          type="file"
                          className={styles.FileButtonLayer}
                          onChange={async (e) => {
                            await cloud.setState({ topMenuOpen: null });
                            cloud.loadFromFile(e);
                          }}
                        />
                      </button>
                      <a
                        className={styles.TopMenuItem}
                        onClick={async () => {
                          await cloud.setState({ topMenuOpen: 'url' });
                        }}
                      >
                        Load from URL
                      </a>
                    </>
                  )}
                  {cloud.state.topMenuOpen === 'url' && (
                    <>
                      <input
                        className={styles.TopMenuInput}
                        type="text"
                        placeholder="GraphQL URL"
                        value={this.state.url}
                        onChange={(e) => {
                          this.setState({ url: e.target.value });
                        }}
                      />
                      <input
                        className={styles.TopMenuInput}
                        type="text"
                        placeholder="Additional header ( optional )"
                        value={this.state.header}
                        onChange={(e) => {
                          this.setState({ header: e.target.value });
                        }}
                      />
                      <a
                        className={styles.TopMenuItem}
                        onClick={async () => {
                          await cloud.setState({ topMenuOpen: null });
                          cloud.loadFromURL(this.state.url, this.state.header);
                        }}
                      >
                        Load
                      </a>
                    </>
                  )}
                </div>
              )}
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
