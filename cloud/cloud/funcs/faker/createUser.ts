import { createUser } from '../createUser';
import { Cloud, fakerUserApi } from '../../Container';

export const createFakerUser = (instance: typeof Cloud) =>
  createUser(instance)(fakerUserApi, 'faker');
