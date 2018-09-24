import { TransformedInput, Requester, AllTypes } from '..';
import { argumentTypes, nodeTypes, allTypes } from '../../../nodeTypes';
export const resolveType = (i: TransformedInput, requester: allTypes, io: 'input' | 'output') => {
  const { type, name, array, required, kind, args } = i;
  const className = kind || name;
  const isArray = (word) => (array ? `[${word}]` : word);
  const isRequired = (word) => (required ? `${word}!` : word);
  const hasArgs = (name) =>
    args
      ? args.length > 0
        ? `${name}(${args.map((a) => resolveType(a, a.type, 'input')).join(',')})`
        : name
      : name;
  const baseResolver: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${hasArgs(name)}: ${isRequired(isArray(b))}`;
      return a;
    }, {}),
    [nodeTypes.type]: `${hasArgs(name)}: ${isRequired(isArray(className))}`,
    [nodeTypes.enum]: `${hasArgs(name)}: ${isRequired(isArray(className))}`,
    [nodeTypes.input]: `${hasArgs(name)}: ${isRequired(isArray(className))}`
  };
  const queryResolverInput: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${name}:${type}`;
      return a;
    }, {}),
    [nodeTypes.type]: `${name}:${isRequired(isArray(className))}`,
    [nodeTypes.enum]: `${name}:${isRequired(isArray(className))}`,
    [nodeTypes.input]: `${name}:${isRequired(isArray(className))}`
  };
  const queryResolverOutput: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${type}`;
      return a;
    }, {}),
    [nodeTypes.type]: `${isRequired(isArray(className))}`,
    [nodeTypes.enum]: `${isRequired(isArray(className))}`,
    [nodeTypes.input]: `${isRequired(isArray(className))}`
  };
  const transform: Requester = {
    type: {
      input: baseResolver
    },
    query: {
      input: queryResolverInput,
      output: queryResolverOutput
    },
    mutation: {
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
