import { createProject } from '../createProject';
import { Cloud, fakerUserApi } from '../../Container';

export const createFakerProject = (instance: typeof Cloud) =>
  createProject(instance)(fakerUserApi, 'faker');
