const generateOperation = (
  t: 'Query' | 'Mutation' | 'Subscription',
  schemaType: string,
  name: string
) => `\t${name}: ((props) => (o) =>
  \t\tfullConstruct(options)('${t}', '${name}')(props)(o).then(
  \t\t\t(response) => response as GraphQLDictReturnType<${schemaType}['${name}']>
  \t\t)) as FunctionToGraphQL<${schemaType}['${name}']>`;

const generateOperations = ({
  queries,
  mutations,
  subscriptions
}: {
  queries: string[];
  mutations?: string[];
  subscriptions?: string[];
}): string[] => {
  const allOps = [];
  allOps.push(`Query: {${queries.map((q) => generateOperation('Query', 'Query', q)).join(',\n')}}`);
  if (mutations) {
    allOps.push(
      `Mutation: {${mutations
        .map((q) => generateOperation('Mutation', 'Mutation', q))
        .join(',\n')}}`
    );
  }
  if (subscriptions) {
    allOps.push(
      `Subscription: {${subscriptions
        .map((q) => generateOperation('Subscription', 'Subscription', q))
        .join(',\n')}}`
    );
  }
  return allOps;
};
export const body = ({
  queries,
  mutations,
  subscriptions
}: {
  queries: string[];
  mutations?: string[];
  subscriptions?: string[];
}) => `
type Func<P extends any[], R> = (...args: P) => R;
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any>
  ? P
  : never;

type GraphQLResponse = {
  data?: {
    [x: string]: any;
  };
  errors?: {
    message: string;
  }[];
};

class GraphQLError extends Error {
  constructor(public response: GraphQLResponse) {
    super("");
    console.error(response);
  }
  toString() {
    return "GraphQL Response Error";
  }
}
type Dict = {
  [x: string]: Dict | any | Dict[] | any[];
};

type ResolveReturned<T> = {
  [P in keyof T]?: T[P] extends (infer R)[]
    ? ResolveReturned<R>[]
    : T[P] extends {
        [x: string]: infer R;
      }
    ? ResolveReturned<T[P]>
    : T[P] extends Func<any, any>
    ? ResolveReturned<ReturnType<T[P]>>
    : T[P]
};

export type State<T> = T extends (infer R)[]
  ? ResolveReturned<R>[]
  : ResolveReturned<T>;

type GraphQLDictReturnType<T> = T extends Func<any, any>
  ? State<ReturnType<T>>
  : T;

type ResolveArgs<T> = T extends Record<any, any>
  ? {
      [P in keyof T]?: T[P] extends (infer R)[]
        ? ResolveArgs<R>
        : T[P] extends {
            [x: string]: infer R;
          }
        ? ResolveArgs<T[P]>
        : T[P] extends Func<any, any>
        ? ReturnType<T[P]> extends Record<any, any>
          ? [ArgsType<T[P]>[0], ResolveArgs<ReturnType<T[P]>>]
          : [ArgsType<T[P]>[0]]
        : true
    }
  : true;

type GraphQLReturner<T> = T extends (infer R)[]
  ? ResolveArgs<R>
  : ResolveArgs<T>;

type EmptyOrGraphQLReturner<T> = T extends Func<any, any>
? ReturnType<T> extends Record<any, any>
  ? (o: GraphQLReturner<ReturnType<T>>) => Promise<GraphQLDictReturnType<T>>
  : () => Promise<GraphQLDictReturnType<T>>
: T extends Record<any, any>
? (o: GraphQLReturner<T>) => Promise<GraphQLDictReturnType<T>>
: () => Promise<GraphQLDictReturnType<T>>;

type FunctionToGraphQL<T> = T extends Func<any, any>
  ? AfterFunctionToGraphQL<T>
  : () => EmptyOrGraphQLReturner<T>;

type AfterFunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => EmptyOrGraphQLReturner<T>;

type fetchOptions = ArgsType<typeof fetch>;


const joinArgs = (q: Dict) => {
  return Array.isArray(q)
    ? \`[\${q.map(joinArgs).join(',')}]\`
    : typeof q === 'object'
    ? \`{\${Object.keys(q)
        .map((k) => \`\${k}:\${joinArgs(q[k])}\`)
        .join(',')}}\`
    : typeof q === 'string'
    ? \`"\${q}"\`
    : q;
};

export const ScalarResolver = (scalar: string, value: any) => {
  switch (scalar) {
    case 'String':
      return \`"\${value}"\`;
      break;
    case 'Int':
      return \`\${value}\`;
      break;
    case 'Float':
      return \`\${value}\`;
      break;
    case 'Boolean':
      return \`\${value}\`;
      break;
    case 'ID':
      return \`"\${value}"\`;
      break;
    case 'enum':
      return \`\${value}\`;
      break;
    case 'scalar':
      return \`\${value}\`;
      break;
    default:
      return false;
      break;
  }
};

export const ReturnGraphQLTypeOfArgument = (type: string, name: string, key: string) => {
  return AllTypesProps[type][name][key].type as string;
};

export const TypesPropsResolver = ({
  value,
  type,
  name,
  key,
  blockArrays
}: {
  value: any;
  type: string;
  name: string;
  key?: string;
  blockArrays?: boolean;
}): string => {
  let resolvedValue = AllTypesProps[type][name];
  if (key) {
    resolvedValue = resolvedValue[key];
  }
  const typeResolved = resolvedValue.type;
  const isArray: boolean = resolvedValue.array;
  if (isArray && !blockArrays) {
    return \`[\${value
      .map((v) => TypesPropsResolver({ value: v, type, name, key, blockArrays: true }))
      .join(',')}]\`;
  }
  const reslovedScalar = ScalarResolver(typeResolved, value);
  if (!reslovedScalar) {
    const resolvedType = AllTypesProps[typeResolved];
    if (typeof resolvedType === 'object') {
      const argsKeys = Object.keys(resolvedType);
      return \`{\${argsKeys
        .filter((ak) => value[ak] !== undefined)
        .map(
          (ak) => \`\${ak}:\${TypesPropsResolver({ value: value[ak], type: typeResolved, name: ak })}\`
        )}}\`;
    }
    return ScalarResolver(AllTypesProps[typeResolved], value) as string;
  }
  return reslovedScalar;
};

const resolveArgs = (q: Dict, t: 'Query' | 'Mutation' | 'Subscription', name: string): string => {
  const argsKeys = Object.keys(q);
  if (argsKeys.length === 0) {
    return '';
  }
  return \`(\${argsKeys
    .map((k) => \`\${k}:\${TypesPropsResolver({ value: q[k], type: t, name, key: k })}\`)
    .join(',')})\`;
};

const isArrayFunction = <T extends [Record<any, any>, Record<any, any>]>(
  parent: string[],
  a: T
) => {
  const [values, r] = a;
  const [mainKey, key, ...keys] = parent;
  const [typeResolverKey] = keys.splice(keys.length - 1, 1);
  let valueToResolve = ReturnTypes[mainKey][key];
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k];
  }

  const keyValues = Object.keys(values);
  const argumentString =
    keyValues.length > 0
      ? \`(\${keyValues
          .map(
            (v) =>
              \`\${v}:\${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v
              })}\`
          )
          .join(',')})\${r ? traverseToSeekArrays(parent, r) : ''}\`
      : traverseToSeekArrays(parent, r);
  return argumentString;
};

const resolveKV = (k: string, v: boolean | string | { [x: string]: boolean | string }) =>
  typeof v === 'boolean' ? k : typeof v === 'object' ? \`\${k}{\${objectToTree(v)}}\` : \`\${k}\${v}\`;

const objectToTree = (o: { [x: string]: boolean | string }) =>
  \`{\${Object.keys(o).map((k) => \`\${resolveKV(k, o[k])}\`)}}\`;

const traverseToSeekArrays = <T extends Record<any, any>>(parent: string[], a?: T) => {
  if (!a) return '';
  if (Object.keys(a).length === 0) {
    return '';
  }
  let b = {};
  Object.keys(a).map((k) => {
    if (Array.isArray(a[k])) {
      b[k] = isArrayFunction([...parent, k], a[k]);
    } else {
      if (typeof a[k] === 'object') {
        b[k] = traverseToSeekArrays([...parent, k], a[k]);
      } else {
        b[k] = a[k];
      }
    }
  });
  return objectToTree(b);
};

const buildQuery = <T extends Record<any, any>>(type: string, name: string, a?: T) =>
  traverseToSeekArrays([type, name], a).replace(/\\"([^{^,^\\n^\\"]*)\\":([^{^,^\\n^\\"]*)/g, '$1:$2');

const construct = (t: 'Query' | 'Mutation' | 'Subscription', name: string, args: Dict = {}) => (
  returnedQuery?: string
) => \`
        \${t.toLowerCase()}{
          \${name}\${resolveArgs(args, t, name)}\${returnedQuery}
        }
  \`;

const fullConstruct = (options: fetchOptions) => (
  t: 'Query' | 'Mutation' | 'Subscription',
  name: string
) => (props?: Dict) => (o?: Record<any, any>) =>
  apiFetch(options, construct(t, name, props)(buildQuery(t, name, o)), name);

const apiFetch = (options: fetchOptions, query: string, name: string) => {
  return fetch(\`\${options[0]}?query=\${encodeURIComponent(query)}\`, options[1] || {})
    .then((response) => response.json() as Promise<GraphQLResponse>)
    .then((response) => {
      if (response.errors) {
        throw new GraphQLError(response);
      }
      return response.data[name];
    });
};

export const Api = (...options: fetchOptions) => ({
    ${generateOperations({ queries, mutations, subscriptions }).join(',\n')}
});
  `;
