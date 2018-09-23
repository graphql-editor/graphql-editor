import * as faker from 'faker';
import { argumentTypes, nodeTypes } from '../../../nodeTypes';
import { TemplateProps } from '../graphql/template';

export const getFakerMethods = () => {
  const fakerKeys: Array<keyof typeof faker> = [
    'address',
    'commerce',
    'company',
    'database',
    'finance',
    'hacker',
    'helpers',
    'image',
    'internet',
    'lorem',
    'name'
  ];
  const fakerMap: {
    [x: string]: {
      name: string;
      items: {
        type: string;
        name: string;
        faker: string;
      }[];
    };
  } = fakerKeys.reduce((a, b) => {
    if (typeof faker[b] !== 'object') {
      return a;
    }
    if (name === 'between') {
      return a;
    }
    a[b] = {
      name,
      items: Object.keys(faker[b]).map((fb) => ({
        type: typeof faker[b][fb](),
        name: fb,
        faker: `${b}.${fb}`
      }))
    };
    return a;
  }, {});
  return fakerMap;
};

export const fakerMap = {
  [argumentTypes.String]: 'faker.lorem.word',
  [argumentTypes.Boolean]: 'faker.random.boolean',
  [argumentTypes.Int]: 'faker.random.number',
  [argumentTypes.ID]: 'faker.random.alphaNumeric',
  [argumentTypes.Float]: 'faker.random.number'
};

export const generateFakerResolver = ({ node, inputs }: TemplateProps): string => {

  const queriesCode = `${inputs
    .filter((i) => i.type === nodeTypes.query )
    .map(
      (i) =>
        '\t' +
        `${i.name}:${i.kind}`
    )
    .join(',\n')}`;

  return [queriesCode].join('\n');
};
