import React, { useState } from "react";
import { GraphQLEditor, MainTheme, PassedSchema } from "graphql-editor";
import * as schemas from "../schema";
import { themeColors } from "@aexol-studio/styling-system";

export const Light = () => {
  const [mySchema, setMySchema] = useState<PassedSchema>({
    code: schemas.food,
    libraries: "",
    source: "outside",
  });
  const lightTheme = {
    ...MainTheme,
    ...themeColors("graphqleditor", "light"),
  };
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
        path="light"
        setSchema={(props) => {
          setMySchema(props);
        }}
        schema={mySchema}
        theme={lightTheme}
      />
    </div>
  );
};

Light.description =
  "Part schema of a big delivery service Deliverer in Light theme";
