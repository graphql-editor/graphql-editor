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
  const [leafFiles, setLeafFiles] = useState(leafs);
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.mergedLibs.code,
    libraries: schemas.mergedLibs.libraries,
    source: "outside",
  });
  useEffect(() => {
    setMySchema({
      source: "outside",
      code: leafFiles.find((l) => l.dir === currentSchema).content,
    });
  }, [currentSchema, leafFiles]);

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
          schemas: leafFiles,
          onClick: (f) => {
            setCurrentSchema(f.dir);
          },
          onDelete: (f) => {
            console.log({ f, leafFiles });
            if (f.dir === currentSchema) {
              setCurrentSchema("");
            }
            setLeafFiles((lf) => lf.filter((l) => l.dir !== f.dir));
          },
          onCopy: (f) => {},
          onRename: (o, n) => {},
          onAdd: (d) => {
            setLeafFiles((lf) => [...lf, { content: "", dir: d.dir }]);
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
