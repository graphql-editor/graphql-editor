import React, { useEffect, useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";
import { ExternalEditorAPI } from "graphql-editor";

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
    libraries: "",
    source: "outside",
  });
  const liveEditorApi: React.ForwardedRef<ExternalEditorAPI> =
    React.createRef();
  useEffect(() => {
    setTimeout(
      () =>
        setCurrentSchema((cs) => ({
          ...cs,
          code: removal[1],
          source: "outside",
        })),
      5000
    );
    setTimeout(
      () =>
        setCurrentSchema((cs) => ({
          ...cs,
          code: removal[2],
          source: "outside",
        })),
      10000
    );
    setTimeout(
      () =>
        setCurrentSchema((cs) => ({
          ...cs,
          code: removal[3],
          source: "outside",
        })),
      15000
    );
  }, []);
  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        alignSelf: "stretch",
        display: "flex",
        position: "relative",
      }}
    >
      <GraphQLEditor
        path="collab"
        ref={liveEditorApi}
        schema={currentSchema}
        setSchema={(s) => {
          setCurrentSchema(s);
        }}
      />
    </div>
  );
};

CollabEffect.description =
  "Schema to test collaboration effect without running websocket when a person is changing graph not code";
