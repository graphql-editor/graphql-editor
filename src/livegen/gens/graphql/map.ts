import { TransformedInput, Requester, AllTypes } from '..';
import { argumentTypes, nodeTypes, allTypes } from '../../../nodeTypes';
export const resolveType = (i: TransformedInput, requester: allTypes, io: 'input' | 'output') => {
  const { type, name, array, required,arrayRequired, kind, args } = i;
  const className = kind || name;
  const isArray = (word) => (array ? `[${word}]` : word);
  const isRequired = (word) => (required ? `${word}!` : word);
  const isArrayRequired = (word) => (arrayRequired ? `${word}!` : word);
  const check = (word) => isArrayRequired(isArray(isRequired(word)))
  const hasArgs = (name) =>
    args
      ? args.length > 0
        ? `${name}(${args.map((a) => resolveType(a, a.type, 'input')).join(',')})`
        : name
      : name;
  const baseResolver: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${hasArgs(name)}: ${check(b)}`;
      return a;
    }, {}),
    [nodeTypes.type]: `${hasArgs(name)}: ${check(className)}`,
    [nodeTypes.enum]: `${hasArgs(name)}: ${check(className)}`,
    [nodeTypes.input]: `${hasArgs(name)}: ${check(className)}`
  };
  const queryResolverInput: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${name}:${type}`;
      return a;
    }, {}),
    [nodeTypes.type]: `${name}:${check(className)}`,
    [nodeTypes.enum]: `${name}:${check(className)}`,
    [nodeTypes.input]: `${name}:${check(className)}`
  };
  const queryResolverOutput: AllTypes = {
    ...Object.keys(argumentTypes).reduce((a, b) => {
      a[b] = `${type}`;
      return a;
    }, {}),
    [nodeTypes.type]: `${check(className)}`,
    [nodeTypes.enum]: `${check(className)}`,
    [nodeTypes.input]: `${check(className)}`
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
