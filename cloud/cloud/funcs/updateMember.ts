import { Cloud } from '../Container';
import { ProjectCalls } from './project/calls';
import { Team, Role } from 'cloud/types/project';

export const updateMember = (instance: typeof Cloud) => async (
  team: Team,
  username: string,
  role: Role
) => {
  const sm = 'Updating member...';
  await instance.upStack(sm);
  await ProjectCalls.updateMember(instance)(team.id, username, role);
  await instance.setState((state) => ({
    team: {
      ...state.team,
      members: {
        ...state.team.members,
        members: state.team.members.members.map((m) => (m.username === username ? {
            username,
            role
        } : m))
      }
    }
  }));
  await instance.setCloud();
  await instance.deStack(sm);
  return;
};
