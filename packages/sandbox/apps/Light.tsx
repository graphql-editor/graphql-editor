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
  const stylingSystemTheme = themeColors("graphqleditor", "light");
  const lightTheme = {
    ...MainTheme,
    ...stylingSystemTheme,
    neutrals: {
      ...stylingSystemTheme.neutrals,
      L3: "#E1E5EF",
      L4: "#EBEDF2",
      L5: "#F2F3F8",
      L6: "#EFF0F6",
    },
    divider: {
      ...stylingSystemTheme.divider,
      main: "#CFD3E5",
    },
    content: {
      ...stylingSystemTheme.content,
      standalone: {
        ...stylingSystemTheme.content.standalone,
      },
      neutral: {
        ...stylingSystemTheme.content.neutral,
        default: "#26569E",
      },
    },
    mainGradient: "linear-gradient(84.59deg, #3676D9 11.31%, #5993EC 100.17%)",
    container: {
      ...stylingSystemTheme.container,
      neutral: {
        ...stylingSystemTheme.container.neutral,
        default: "#3676D94D",
      },
    },
    accent: {
      ...stylingSystemTheme.accent,
      L2: "#15449F",
    },
    text: {
      ...stylingSystemTheme.text,
      contrast: "#292D48",
    },
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
