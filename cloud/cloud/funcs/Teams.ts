import { Cloud } from '../Container';
import { ProjectCalls } from './project/calls';
import { Team, Role } from '../types/project';
export class Teams {
  constructor(private instance: typeof Cloud) {}
  myTeams = async () => {
    const sm = 'Loading teams...';
    await this.instance.upStack(sm);
    const teams = await ProjectCalls.myTeams(this.instance)();
    await this.instance.setState((state) => ({
      teams: teams.teams
    }));
    await this.instance.setCloud();
    await this.instance.deStack(sm);
    return;
  };
  createTeam = async (name: string, namespace: string) => {
    const sm = 'Creating team...';
    await this.instance.upStack(sm);
    const team = await ProjectCalls.createTeam(this.instance)(name, namespace);
    await this.instance.setState((state) => ({
      teams: [
        ...(state.teams || []),
        {
          name: team.name,
          namespace: team.namespace,
          id: team.id,
          members: {
            members: []
          }
        }
      ]
    }));
    await this.instance.setCloud();
    await this.instance.deStack(sm);
    await this.instance.setState({
      category: 'editTeam'
    });
    return;
  };
  addMember = async (team: Team, username: string, role: Role) => {
    const sm = 'Adding member...';
    await this.instance.upStack(sm);
    const member = await ProjectCalls.addMember(this.instance)(team.id, role, username);
    await this.instance.setState((state) => ({
      team: {
        ...state.team,
        members: {
          ...state.team.members,
          members: [...state.team.members.members, member]
        }
      }
    }));
    await this.instance.setCloud();
    await this.instance.deStack(sm);
    return;
  };
  updateMember = async (team: Team, username: string, role: Role) => {
    const sm = 'Updating member...';
    await this.instance.upStack(sm);
    await ProjectCalls.updateMember(this.instance)(team.id, username, role);
    await this.instance.setState((state) => ({
      team: {
        ...state.team,
        members: {
          ...state.team.members,
          members: state.team.members.members.map((m) =>
            m.username === username
              ? {
                  username,
                  role
                }
              : m
          )
        }
      }
    }));
    await this.instance.setCloud();
    await this.instance.deStack(sm);
    return;
  };
}
