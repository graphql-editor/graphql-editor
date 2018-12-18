import * as React from 'react';
import * as styles from '../style/ProjectSearch';
export type ProjectSearchType = {
  onSubmit: (e: string) => void;
};
type ProjectSearchState = {
  value: string;
};
export class ProjectSearch extends React.Component<ProjectSearchType, ProjectSearchState> {
  state: ProjectSearchState = {
    value: ''
  };
  render() {
    return (
      <form
        className={styles.SearchForm}
        onSubmit={(e) => {
          e.preventDefault();
          this.props.onSubmit(this.state.value);
        }}
      >
        <input
          className={styles.SearchInput}
          type="text"
          placeholder="Search projects..."
          value={this.state.value}
          onChange={(e) => {
            this.setState({
              value: e.target.value
            });
          }}
        />
      </form>
    );
  }
}
