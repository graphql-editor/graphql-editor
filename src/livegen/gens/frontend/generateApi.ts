const generateOperation = (
  t: 'query' | 'mutation' | 'subscription',
  schemaType,
  name
) => `\t${name}: ((props) => (o) =>
\t\tfullConstruct(options)('${t}', '${name}')(props)(o).then(
\t\t\t(response) => response as ReturnType<${schemaType}['${name}']>
\t\t)) as FunctionToGraphQL<${schemaType}['${name}']>`;

const generateOperations = ({
  queries,
  mutations,
  subscriptions
}: {
  queries: string[];
  mutations?: string[];
  subscriptions?: string[];
}):string[] => {
  let allOps = [];
  allOps.push(`Query: {${queries.map((q) => generateOperation('query', 'Query', q)).join(',\n')}}`);
  if (mutations) {
    allOps.push(
      `Mutation: {${mutations
        .map((q) => generateOperation('mutation', 'Mutation', q))
        .join(',\n')}}`
    );
  }
  if (subscriptions) {
    allOps.push(
      `Subscription: {${subscriptions
        .map((q) => generateOperation('subscription', 'Subscription', q))
        .join(',\n')}}`
    );
  }
  return allOps
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
type ArgsType<F extends Func<any, any>> = F extends Func<infer P, any> ? P : never;

const apiFetch = (options: fetchOptions, query: string) =>
  fetch(\`\${options[0]}?query=\${encodeURIComponent(query)}\`, options[1] || {});

type Dict = {
  [x: string]: Dict | any | Dict[] | any[];
};

type ArrayToType<T> = T extends (infer R)[] ? R : T;
type DictOrString<T> = {
  [P in keyof T]?: T[P] extends {
    [x: string]: infer R;
  }
    ? DictOrString<T[P]>
    : true
};
type FlattenDict<T> = { [P in keyof T]: ArrayToType<T[P]> };
type GraphQLReturner<T> = DictOrString<FlattenDict<T>>;
const joinArgs = (q: Dict) =>
  Array.isArray(q)
    ? \`[\${q.map(joinArgs).join(',')}]\`
    : typeof q === 'object'
      ? \`{\${Object.keys(q)
          .map((k) => \`\${k}:\${joinArgs(q[k])}\`)
          .join(',')}}\`
      : typeof q === 'string'
        ? \`"\${q}"\`
        : q;
const resolveArgs = (q: Dict): string =>
  Object.keys(q).length > 0
    ? \`(\${Object.keys(q)
        .map((k) => \`\${k}:\${joinArgs(q[k])}\`)
        .join(',')})\`
    : \`\`;

const constructReturner = (a: GraphQLReturner<any>) =>
  JSON.stringify(a)
    .replace(/:true/g, '')
    .replace(/:/g, '')
    .replace(/"/g, '')
    .slice(1, -1);
const construct = (t: 'query' | 'mutation' | 'subscription', name: string, args: Dict = {}) => (
  returnedQuery?: string
) => \`
      \${t === 'query' ? '' : t}{
        \${name}\${resolveArgs(args)}{
          \${returnedQuery}
        }
      }
\`;

type FunctionToGraphQL<T extends Func<any, any>> = (
  props?: ArgsType<T>[0]
) => (o: GraphQLReturner<ReturnType<T>>) => Promise<ReturnType<T>>;
type fetchOptions = ArgsType<typeof fetch>;

const fullConstruct = (options: fetchOptions) => (
  t: 'query' | 'mutation' | 'subscription',
  name: string
) => (props) => (o) =>
  apiFetch(options, construct(t, name, props)(constructReturner(o))).then((response) =>
    response.json()
  );


export const Api = (...options: fetchOptions) => ({
    ${generateOperations({queries,mutations,subscriptions}).join(",\n")}
});
`;
