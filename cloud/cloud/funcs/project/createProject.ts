import { createProject } from '../createProject';
import { Cloud, userApi } from '../../Container';

export const createProjectProject = (instance: typeof Cloud) =>
  createProject(instance)(userApi, 'cloud');
