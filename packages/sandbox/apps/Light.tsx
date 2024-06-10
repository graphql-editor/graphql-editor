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
  console.log("ss", stylingSystemTheme);
  const lightTheme = {
    ...MainTheme,
    ...stylingSystemTheme,
    // neutrals: {
    //   ...stylingSystemTheme.neutrals,
    //   L3: "#E1E5EF",
    //   L4: "#EBEDF2",
    //   L5: "#F2F3F8",
    //   //L6: "#EFF0F6",
    // },
    // divider: {
    //   ...stylingSystemTheme.divider,
    //   main: "#CFD3E5",
    // },
    // content: {
    //   ...stylingSystemTheme.content,
    //   main: {
    //     ...stylingSystemTheme.content.main,
    //   },
    //   neutral: {
    //     ...stylingSystemTheme.content.neutral,
    //     //default: "#26569E",
    //   },
    // },
    // mainGradient: "linear-gradient(84.59deg, #3676D9 11.31%, #5993EC 100.17%)",
    // hoverGradient: "linear-gradient(45deg, #7EB1FC 0%, #95BFFF 100%)",
    // // BG: {
    // //   ...stylingSystemTheme.BG,
    // //   "5%": "#3676D90D",
    // //   "10%": "#3676D91A",
    // //   "50%": "#95BFFF80",
    // // },
    // ST: {
    //   ...stylingSystemTheme.ST,
    //   "50%": "#26569E80",
    // },
    // // CT: {
    // //   ...stylingSystemTheme.CT,
    // //   "15%": "",
    // // },
    // container: {
    //   ...stylingSystemTheme.container,
    //   neutral: {
    //     ...stylingSystemTheme.container.neutral,
    //     //default: "#3676D94D",
    //   },
    // },
    // accent: {
    //   ...stylingSystemTheme.accent,
    //   L1: "#26569E",
    //   L2: "#15449F",
    //   L7: "#7EB1FC",
    // },
    // text: {
    //   ...stylingSystemTheme.text,
    //   contrast: "#292D48",
    // },
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
