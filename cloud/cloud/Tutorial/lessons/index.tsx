import { Lesson } from '../Models';

const getLesson = (n:number) => require(`./lesson${n}.gql`).default

export const lessons: Lesson[] = [
  {
    name: 'Types',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(1),
    task: 'Create Person type using graph or code.'
  },
  {
    name: 'Query',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(2),
    task: 'Create Person type using graph or code.'
  }
];
