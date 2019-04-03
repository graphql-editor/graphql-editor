import { Cloud } from '../Container';
import { ProjectCalls } from './project/calls';
import { Team, Role } from 'cloud/types/project';

export const createTeam = (instance: typeof Cloud) => async (
  team: Team,
  username: string,
  role: Role
) => {
  const sm = 'Adding member...';
  await instance.upStack(sm);
  const member = await ProjectCalls.addMember(instance)(team.id, role, username);
  await instance.setState((state) => ({
    team: {
      ...state.team,
      members: {
        ...state.team.members,
        members: [...state.team.members.members, member]
      }
    }
  }));
  await instance.setCloud();
  await instance.deStack(sm);
  return;
};
