import * as React from 'react';
import { CodeEditor, CodeEditorOuterProps } from './Code';
import { GraphController } from '../Graph';
export type EditorState = {
  projectId?: string;
  code: string;
};
export type EditorProps = {
  code: string;
  editorVisible: boolean;
} & CodeEditorOuterProps;

export class Editor extends React.Component<EditorProps, EditorState> {
  state: EditorState = {
    projectId: undefined,
    code: ''
  };
  private containerRef = React.createRef<HTMLDivElement>();
  controller: GraphController = new GraphController();
  componentDidMount() {
    if (!this.containerRef.current) {
      return;
    }
    this.controller.setDOMElement(this.containerRef.current);
    this.controller.setPassSchema((code) => {
      this.setState({ code });
    });
  }
  render() {
    return (
      <>
        {this.props.editorVisible === true && (
          <CodeEditor
            controller={this.controller}
            schema={this.state.code}
            schemaChanged={this.props.schemaChanged}
          />
        )}
        <div ref={this.containerRef} />
      </>
    );
  }
}
