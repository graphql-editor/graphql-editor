import * as faker from 'faker';
import { argumentTypes } from '../../../nodeTypes';
import { TemplateProps } from '../graphql/template';
import { TransformedInput } from '..';

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
  [argumentTypes.String]: 'lorem.word',
  [argumentTypes.Boolean]: 'random.boolean',
  [argumentTypes.Int]: 'random.number',
  [argumentTypes.ID]: 'random.alphaNumeric',
  [argumentTypes.Float]: 'random.number'
};
export const arrayToDict = (a: any[]) =>
  a.reduce((a, b) => {
    a = {
      ...a,
      ...b
    };
    return a;
  }, {});
export type FakerResolverReturn = {
  type?: string;
  inputs?: {
    [x: string]: FakerResolverReturn;
  };
  array: boolean;
  required: boolean;
  arrayRequired: boolean;
};
export type FakerDict = {
  [x: string]: FakerResolverReturn;
};
export const generateFakerResolver = (template: TemplateProps, allProps: TemplateProps[]) => {
  const mapClone = (i: TransformedInput): FakerDict =>
    i.clone
      ? {
          [i.name]: {
            inputs: mapInputs(allProps.find((a) => a.node.id === i.clone)),
            array: i.array,
            required: i.required,
            arrayRequired: i.arrayRequired
          }
        }
      : {
          [i.name]: {
            type: i.kind || fakerMap[i.type],
            array: i.array,
            required: i.required,
            arrayRequired: i.arrayRequired
          }
        };
  const mapInputs = (t: TemplateProps) => arrayToDict(t.inputs.map(mapClone));
  const queriesCode = arrayToDict(template.outputs.map(mapClone));
  return queriesCode;
};

const roll = () => Math.random() > 0.5;
const randomArray = () => new Array(Math.floor(Math.random() * 100)).fill(0);
export const generateFakerServerQuery = (t: FakerResolverReturn, name: string): any => {
  const resolveQuery = (q: FakerResolverReturn, name: string) => {
    if (q.array) {
      if (!q.arrayRequired && roll()) {
        return { [name]: null };
      }
      return randomArray().map((i) => resolveQuery({ ...q, array: false }, name));
    }
    if (q.inputs) {
      return { [name]: Object.keys(q.inputs).map((o) => resolveQuery(q.inputs[o], o)) };
    }
    if (!q.required && roll()) {
      return { [name]: null };
    }
    return { [name]: q.type };
  };
  console.log(t)
  const fQuery = resolveQuery(t, name);
  return fQuery;
};
