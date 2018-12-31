import * as faker from 'faker';
import { argumentTypes } from '../../../nodeTypes';
import { TemplateProps } from '../graphql/template';
import { TransformedInput } from '..';
export * from './serialize';

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
  } = fakerKeys.reduce((a, name) => {
    if (typeof faker[name] !== 'object') {
      return a;
    }
    a[name] = {
      name,
      items: Object.keys(faker[name]).map((fb) => ({
        type: typeof faker[name][fb](),
        name: fb,
        faker: `${name}.${fb}`
      }))
    };
    return a;
  }, {});
  return fakerMap;
};

export const fakerMap = {
  [argumentTypes.String]: 'String',
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
  ref?: string;
  enum?: string[];
  union?: string[];
  options?: FakerResolverReturn[];
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
export const generateFakerResolverBase = (
  template: TemplateProps,
  io: 'inputs' | 'outputs'
): Record<string, FakerDict> => {
  const mapClone = (i: TransformedInput): FakerDict =>
    i.clone
      ? {
          [i.name]: {
            ref: i.kind,
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
  return arrayToDict(template[io].map(mapClone));
};
export const generateFakerResolverType = (template: TemplateProps) => {
  return {
    [template.node.name]: {
      type: 'type',
      object: generateFakerResolverBase(template, 'inputs')
    }
  };
};

export const generateFakerResolverEnum = (template: TemplateProps) => {
  return {
    [template.node.name]: {
      type: 'enum',
      enum: template.inputs.map((i) => i.name)
    } as FakerResolverReturn
  };
};
export const generateFakerResolverScalar = (template: TemplateProps) => {
  return {
    [template.node.name]: {
      type: 'scalar',
      scalar: `scalar.${template.node.name}`
    }
  };
};
export const generateFakerResolverUnion = (template: TemplateProps) => {
  return {
    [template.node.name]: {
      type: 'union',
      union: template.inputs.map((i) => i.name)
    }
  };
};
export const generateFakerResolverOperation = (template: TemplateProps) => {
  const outputs = generateFakerResolverBase(template, 'outputs');
  return {
    [template.node.name]: Object.keys(outputs).reduce((a, b) => {
      a = {
        ...a,
        ...outputs[b]
      };
      return a;
    }, {})
  };
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
  const fQuery = resolveQuery(t, name);
  return fQuery;
};
