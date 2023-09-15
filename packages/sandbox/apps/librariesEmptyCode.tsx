import React, { useState } from "react";
import { GraphQLEditor, PassedSchema } from "graphql-editor";
import * as schemas from "../schema";

export const librariesEmptyCode = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: "",
    libraries: schemas.usersLibraryNew,
    source: "outside",
  });
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
        path="libraries"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
      />
    </div>
  );
};

librariesEmptyCode.description = "Libraries but no code";
