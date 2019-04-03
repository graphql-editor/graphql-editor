import * as React from 'react';
import * as styles from './style/EditTeam';
import { Subscribe } from 'unstated';
import { Cloud } from '../Container';
import { CreateButton, Label, Input } from './components';
import slugify from '@sindresorhus/slugify';
interface CreateTeamState {
  name: string;
  slug: string;
}
interface CreateTeamProps {}
export class CreateTeam extends React.Component<CreateTeamProps, CreateTeamState> {
  state: CreateTeamState;
  constructor(props: CreateTeamProps) {
    super(props);
    this.state = {
      name: '',
      slug: ''
    };
  }
  render() {
    const { name } = this.state;
    return (
      <Subscribe to={[Cloud]}>
        {(cloud: typeof Cloud) => {
          return (
            <div className={styles.EditTeam}>
              <div className={styles.Name}>
                <Label name="Team name" />
                <Input
                  value={name}
                  placeholder="Name..."
                  onChange={(e) =>
                    this.setState({
                      name: e,
                      slug: `Namespace: ${slugify(e)}`
                    })
                  }
                />
                <Label name={this.state.slug} />
              </div>
              <div className={styles.Actions}>
                <CreateButton
                  name="create +"
                  onClick={() => {
                    if (this.state.name) {
                      cloud.createTeam(this.state.name, this.state.slug);
                    }
                  }}
                />
              </div>
            </div>
          );
        }}
      </Subscribe>
    );
  }
}
