import { TransformedInput, Requester, AllTypes } from '..';
import { argumentTypes, nodeTypes, allTypes } from '../../../nodeTypes';

const typeScriptMap: Partial<{ [x in allTypes]: string }> = {
  Int: 'number',
  Float: 'number',
  Boolean: 'boolean',
  ID: 'string',
  String: 'string'
};

const changeTypeScriptType = (type: allTypes): string =>
  Object.keys(typeScriptMap).includes(type) ? typeScriptMap[type] : type;

export const resolveType = (i: TransformedInput, requester: allTypes, io: 'input' | 'output') => {
  const { type, name, array, required, kind, args } = i;
  const className = kind || name;
  const isRequired = (word) => (required ? `${word}` : `${word}?`);
  const isArray = (word) => (array ? `${word}[]` : word);
  const hasArgs = (name) =>
    args
      ? args.length > 0
        ? `(props:{${args
            .map((a) => resolveType(a, nodeTypes.type, 'input'))
            .join(',\n\t\t')}}) => ${name}`
        : name
      : name;
  const check = (word) => hasArgs(isArray(changeTypeScriptType(word)));
  const queryOutputCheck = (word) => isArray(changeTypeScriptType(word));

  const definitionTypes = [
    nodeTypes.type,
    nodeTypes.union,
    nodeTypes.interface,
    nodeTypes.enum,
    nodeTypes.input,
    nodeTypes.scalar
  ];
  const baseResolver: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${isRequired(name)}: ${check(b)}`;
      return a;
    }, {}),
    ...definitionTypes.reduce((a, b) => {
      a[b] = `${isRequired(name)}: ${check(className)}`;
      return a;
    }, {})
  };
  const queryResolverInput: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${name}:${type}`;
      return a;
    }, {}),
    ...definitionTypes.reduce((a, b) => {
      a[b] = `${name}: ${check(className)}`;
      return a;
    }, {})
  };
  const queryResolverOutput: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${type}`;
      return a;
    }, {}),
    ...definitionTypes.reduce((a, b) => {
      a[b] = `${queryOutputCheck(className)}`;
      return a;
    }, {})
  };
  const transform: Requester = {
    type: {
      input: baseResolver
    },
    Query: {
      input: queryResolverInput,
      output: queryResolverOutput
    },
    Mutation: {
      input: queryResolverInput,
      output: queryResolverOutput
    },
    Subscription: {
      input: queryResolverInput,
      output: queryResolverOutput
    },
    input: {
      input: baseResolver
    },
    interface: {
      input: baseResolver
    },
    ID: {
      input: baseResolver
    },
    String: {
      input: baseResolver
    },
    Boolean: {
      input: baseResolver
    },
    Float: {
      input: baseResolver
    },
    Int: {
      input: baseResolver
    },
    union: {
      input: baseResolver
    },
    scalar: {
      input: baseResolver
    },
    enum: {
      input: {
        String: `${name}`
      }
    },
    argument: {
      input: baseResolver
    }
  };
  let fn = transform[requester][io];
  if (!fn) {
    throw new Error(`Unsupported configuration in file.\n${io} is not supported in ${requester}`);
  }
  let func = fn[type];
  return func;
};
