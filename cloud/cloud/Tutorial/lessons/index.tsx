import { Lesson } from '../Models';

const getLesson = (n: number) => require(`./lesson${n}.gql`).default;

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
    name: 'Required',
    description: `In GraphQL you can define if property is required or not. We're gonna make lastName property of a person required and leave first name optional`,
    schema: getLesson(2),
    task: 'Change lastName to required'
  },
  {
    name: 'Query',
    description: ``,
    schema: getLesson(3),
    task: 'Add people query returning multiple Person objects.'
  },
  {
    name: 'Mutation',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(4),
    task: 'Add mutation named createPerson'
  },
  {
    name: 'Input',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(5),
    task: 'Create CreatePerson input using graph or code. Add update and remove Person mutations.'
  },
  {
    name: 'Enum',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(6),
    task: 'Create AvatarColor Enum'
  },
  {
    name: 'Union',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(7),
    task:
      'Create Alien type using graph or code. Create UniverseCitizen Union. Add queries to return Aliens and universe Citizens'
  },
  {
    name: 'Reference',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(8),
    task: 'Add friends field to both Alien and Person type'
  },
  {
    name: 'Interfaces',
    description: `
        The essential elements of a GraphQL schema are object types, which describe a kind of object you can fetch from your service, and what fields it has. In the GraphQL schema language, we might represent it like this:
        `,
    schema: getLesson(9),
    task: 'Create IntelligentForm interface. Make Person and alien implement this interface'
  }
];
