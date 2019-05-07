import { Options, ParserRoot, ParserTree, ScalarTypes } from '../Models';
import { TypeDefinition } from '../Models/Spec';

export const fakerMap: Record<string, string> = {
  [ScalarTypes.String]: 'String',
  [ScalarTypes.Boolean]: 'random.boolean',
  [ScalarTypes.Int]: 'random.number',
  [ScalarTypes.ID]: 'random.uuid',
  [ScalarTypes.Float]: 'random.number'
};
export const arrayToDict = (a: any[]) =>
  a.reduce((a, b) => {
    a = {
      ...a,
      ...b
    };
    return a;
  }, {});
export interface FakerResolverReturn {
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
}
export interface FakerDict {
  [x: string]: FakerResolverReturn;
}
export const generateFakerResolverBase = (
  root: ParserRoot
): Record<string, FakerDict> | undefined => {
  if (!root.fields) {
    return;
  }
  const rf = root.fields.map((f) => ({
    [f.name]: {
      type: f.type.name in ScalarTypes ? fakerMap[f.type.name] || f.type.name : undefined,
      ref: f.type.name in ScalarTypes ? undefined : f.type.name,
      array: f.type.options && !!f.type.options.find((o) => o === Options.array),
      required: f.type.options && !!f.type.options.find((o) => o === Options.required),
      arrayRequired: f.type.options && !!f.type.options.find((o) => o === Options.arrayRequired)
    }
  }));
  return arrayToDict(rf);
};
export const generateFakerResolverType = (root: ParserRoot) => {
  return {
    [root.name]: {
      type: 'type',
      object: generateFakerResolverBase(root)
    }
  };
};

export const generateFakerResolverEnum = (root: ParserRoot) => {
  return {
    [root.name]: {
      type: 'enum',
      enum: root.fields && root.fields.map((i) => i.name)
    } as FakerResolverReturn
  };
};
export const generateFakerResolverScalar = (root: ParserRoot) => {
  return {
    [root.name]: {
      type: 'scalar',
      scalar: `scalar.${root.name}`
    }
  };
};
export const generateFakerResolverUnion = (root: ParserRoot) => {
  return {
    [root.name]: {
      type: 'union',
      union: root.fields && root.fields.map((i) => i.type.name)
    }
  };
};
export class TreeToFaker {
  static resolveTree(tree: ParserTree) {
    const { nodes } = tree;
    const fakeResolvers = [
      TypeDefinition.ObjectTypeDefinition,
      TypeDefinition.InterfaceTypeDefinition,
      TypeDefinition.InputObjectTypeDefinition
    ].reduce((a, b) => {
      a = {
        ...a,
        ...arrayToDict(nodes.filter((n) => n.type.name === b).map(generateFakerResolverType))
      };
      return a;
    }, {});

    const fakeEnumResolvers = [TypeDefinition.EnumTypeDefinition].reduce((a, b) => {
      a = {
        ...a,
        ...arrayToDict(nodes.filter((n) => n.type.name === b).map(generateFakerResolverEnum))
      };
      return a;
    }, {});

    const fakeScalarResolvers = [TypeDefinition.ScalarTypeDefinition].reduce((a, b) => {
      a = {
        ...a,
        ...arrayToDict(nodes.filter((n) => n.type.name === b).map(generateFakerResolverScalar))
      };
      return a;
    }, {});

    const fakeUnionResolvers = [TypeDefinition.UnionTypeDefinition].reduce((a, b) => {
      a = {
        ...a,
        ...arrayToDict(nodes.filter((n) => n.type.name === b).map(generateFakerResolverUnion))
      };
      return a;
    }, {});
    const fakeSchema = {
      ...fakeResolvers,
      ...fakeEnumResolvers,
      ...fakeScalarResolvers,
      ...fakeUnionResolvers
    };
    return JSON.stringify(fakeSchema, null, 4);
  }
}
