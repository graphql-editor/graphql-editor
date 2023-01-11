import React, { useEffect, useState } from 'react';
import { GraphQLEditor } from 'graphql-editor';
import { PassedSchema } from 'graphql-editor';

// const adding = [
//   `
// type Person{
//   name: String!
//   firstName: String
//   age: Int
// }
// `,
//   `
// type Person{
//   name: String!
//   age: Int
//   firstName: String
// }
// `,
//   `
// type Person{
//   name: String!
//   age: Int
//   firstName: String
//   lastName:String
// }
// `,

//   `
// type Person{
//   name: String!
//   firstName: String
// }
// `,
// ];
const removal = [
  `
type Person{
  name: String!
  age: Int
  firstName: String
  lastName:String
}
`,
  `
type Person{
  name: String!
  age: Int
  firstName: String
}
`,
  `
type Person{
  name: String!
  age: Int
}
`,

  `
type Person{
  name: String!
}
`,
];

export const CollabEffect = () => {
  const [currentSchema, setCurrentSchema] = useState<PassedSchema>({
    code: removal[0],
    libraries: '',
  });
  useEffect(() => {
    setTimeout(
      () =>
        setCurrentSchema((cs) => ({
          ...cs,
          code: removal[1],
        })),
      5000,
    );
    setTimeout(
      () =>
        setCurrentSchema((cs) => ({
          ...cs,
          code: removal[2],
        })),
      10000,
    );
    setTimeout(
      () =>
        setCurrentSchema((cs) => ({
          ...cs,
          code: removal[3],
        })),
      15000,
    );
  }, []);
  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignSelf: 'stretch',
        display: 'flex',
        position: 'relative',
      }}
    >
      <GraphQLEditor
        schema={currentSchema}
        sidebarExpanded
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
      />
    </div>
  );
};

CollabEffect.description = 'Google Directions GraphQL Schema.';
