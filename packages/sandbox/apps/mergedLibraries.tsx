import React, { useEffect, useState } from "react";
import { GraphQLEditor } from "graphql-editor";
import { PassedSchema } from "graphql-editor";
import * as schemas from "../schema";
const leafs = [
  {
    dir: "src/modules/google/schema.graphql",
    content: schemas.googleDirections,
  },
  {
    dir: "src/modules/pizza/schema.graphql",
    content: schemas.pizza,
  },
  {
    dir: "src/main/schema.graphql",
    content: schemas.food,
  },
];

export const MergedLibraries = () => {
  const [currentSchema, setCurrentSchema] = useState("src/main/schema.graphql");
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.mergedLibs.code,
    libraries: schemas.mergedLibs.libraries,
    source: "outside",
  });
  useEffect(() => {
    setMySchema({
      source: "outside",
      code: leafs.find((l) => l.dir === currentSchema).content,
    });
  }, [currentSchema]);
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
        leafs={{
          schemas: leafs,
          onClick: (f) => {
            setCurrentSchema(f.dir);
          },
          current: currentSchema,
        }}
        path="libraries"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

MergedLibraries.description = "Merged libraries with nodes with same names";
