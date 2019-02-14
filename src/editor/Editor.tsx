import * as React from 'react';
import { CodeEditor, CodeEditorOuterProps } from './Code';
import { GraphController } from '../Graph';
export type EditorState = {
  projectId?: string;
  code: string;
};
export type EditorProps = {
  editorVisible: boolean;
  graphController?: (controller: GraphController) => void;
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
    this.props.graphController && this.props.graphController(this.controller);
  }
  componentDidUpdate(prevProps: EditorProps) {
    if (this.props.editorVisible !== prevProps.editorVisible) {
      this.controller.resizeDiagram();
    }
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
        <div
          style={{
            maxHeight: '100%',
            maxWidth: '100%'
          }}
          ref={this.containerRef}
        />
      </>
    );
  }
}
