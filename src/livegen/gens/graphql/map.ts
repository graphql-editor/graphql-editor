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
  const transform: Requester = {
    type: {
      input: baseResolver
    },
    query: {
      input: baseResolver
    },
    input: {
      input: baseResolver
    },
    interface: {
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
