import React from "react";
import { render } from "react-dom";
import { style } from "typestyle";
import { Editor } from "../src/index";
import * as schemas from "./schema";

export const Full = style({
  backgroundColor: "#444444",
  position: "relative",
  width: "100%",
  height: "100%",
  paddingLeft: 0,
  transition: "padding-left 0.12s linear"
});

export const UiDiagram = style({
  flex: 1,
  width: "100%",
  height: "100%",
  alignSelf: "stretch",
  display: "flex",
  position: "relative"
});
export const UIDiagramFull = style({
  marginLeft: "-100vh"
});

class App extends React.Component<
  {},
  {
    editorVisible: boolean;
  }
> {
  state = {
    editorVisible: true
  };
  render() {
    return (
      <div className={UiDiagram}>
        <Editor
          schema={schemas.nullInput}
          editorVisible={this.state.editorVisible}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
