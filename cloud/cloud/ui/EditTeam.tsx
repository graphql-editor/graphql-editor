import * as React from 'react';
import { State, Team } from '../types/project';
import * as styles from './style/EditTeam';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { CreateButton, Label, Input } from './components';
interface EditTeamState {
  team: State<Team>;
}
interface EditTeamProps {
  team?: State<Team>;
}
export class EditTeam extends React.Component<EditTeamProps, EditTeamState> {
  state: EditTeamState;
  setTeam = <T extends keyof EditTeamState['team']>(name: T, value: EditTeamState['team'][T]) => {
    this.setState((state) => ({
      team: {
        ...state.team,
        [name]: value
      }
    }));
  };
  constructor(props: EditTeamProps) {
    super(props);
    this.state = {
      team: {
        id: null,
        name: '',
        ...(props.team || {})
      }
    };
  }
  render() {
    const { team } = this.state;
    const editsTeam = !!team.id;
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <div className={styles.EditTeam}>
              <div className={styles.Name}>
                <Label name="Team name" />
                <Input
                  value={team.name}
                  placeholder="Name..."
                  onChange={(e) => this.setTeam('name', e)}
                />
              </div>
              <div className={styles.AddMembers}>
                <Label name="Members" />
                <Input
                  value={team.name}
                  placeholder="Find member or type an email"
                  onChange={(e) => this.setTeam('name', e)}
                />
              </div>
              {!editsTeam && (
                <div className={styles.Actions}>
                  <CreateButton name="create +" onClick={() => {}} />
                </div>
              )}
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
