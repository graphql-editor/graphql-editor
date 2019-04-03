import { Cloud } from '../Container';
import { ProjectCalls } from './project/calls';

export const myTeams = (instance: typeof Cloud) => async () => {
  const sm = 'Loading teams...';
  await instance.upStack(sm);
  const teams = await ProjectCalls.myTeams(instance)();
  await instance.setState((state) => ({
    teams: teams.teams
  }));
  await instance.setCloud();
  await instance.deStack(sm);
  return;
};
