import { createUser } from '../createUser';
import { Cloud, userApi } from '../../Container';

export const createProjectUser = (instance: typeof Cloud) =>
  createUser(instance)(userApi, 'faker');
