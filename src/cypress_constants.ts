export const GraphQLEditorCypress = {
  name: 'editor',
  diagram: {
    name: 'diagram',
  },
  code: {
    name: 'code',
  },
  sidebar: {
    name: 'sidebar',
    menu: {
      name: 'menu',
      children: {
        diagram: {
          name: 'diagram',
        },
        codeDiagram: {
          name: 'codeDiagram',
        },
        code: {
          name: 'code',
        },
        explorer: {
          name: 'explorer',
        },
      },
    },
    code: {
      name: 'code',
      children: {
        status: {
          name: 'status',
        },
      },
    },
    explorer: {
      name: 'explorer',
      children: {
        search: {
          name: 'search',
        },
        filters: {
          name: 'filters',
        },
        list: {
          name: 'list',
        },
      },
    },
  },
} as const;

export function cypressGet<T, P1 extends keyof NonNullable<T>>(obj: T, prop1: P1): NonNullable<T>[P1];

export function cypressGet<T, P1 extends keyof NonNullable<T>, P2 extends keyof NonNullable<NonNullable<T>[P1]>>(
  obj: T,
  prop1: P1,
  prop2: P2,
): NonNullable<NonNullable<T>[P1]>[P2];

export function cypressGet<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>
>(obj: T, prop1: P1, prop2: P2, prop3: P3): NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3];

export function cypressGet<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>,
  P4 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>
>(
  obj: T,
  prop1: P1,
  prop2: P2,
  prop3: P3,
  prop4: P4,
): NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>[P4];

export function cypressGet<
  T,
  P1 extends keyof NonNullable<T>,
  P2 extends keyof NonNullable<NonNullable<T>[P1]>,
  P3 extends keyof NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>,
  P4 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>,
  P5 extends keyof NonNullable<NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>[P4]>
>(
  obj: T,
  prop1: P1,
  prop2: P2,
  prop3: P3,
  prop4: P4,
  prop5: P5,
): NonNullable<NonNullable<NonNullable<NonNullable<NonNullable<T>[P1]>[P2]>[P3]>[P4]>[P5];
// ...and so on...

export function cypressGet(obj: any, ...props: string[]): any {
  let constructString = 'ge';
  obj &&
    props.reduce((result, prop) => {
      constructString = [constructString, prop].join('-');
      return result == null ? undefined : result[prop];
    }, obj);
  return constructString;
}
