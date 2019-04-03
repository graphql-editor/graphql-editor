import { Cloud } from '../Container';
import { ProjectCalls } from './project/calls';

export const createTeam = (instance: typeof Cloud) => async (name: string, namespace: string) => {
  const sm = 'Creating team...';
  await instance.upStack(sm);
  const team = await ProjectCalls.createTeam(instance)(name, namespace);
  await instance.setState((state) => ({
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
  await instance.setCloud();
  await instance.deStack(sm);
  return;
};
