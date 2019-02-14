import * as React from 'react';
import { CodeEditor, CodeEditorOuterProps } from './Code';
import { GraphController } from '../Graph';
import { Colors } from '../Colors';
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
        {this.controller &&
          this.controller.isEmpty() && (
            <div
              style={{
                position: 'fixed',
                width: '100%',
                bottom: 180,
                display: 'flex',
                pointerEvents: 'none',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  padding: 30,
                  width: 400,
                  background: Colors.yellow[0],
                  color: Colors.grey[7],
                  fontWeight: 'bold',
                  textAlign: 'justify',
                  borderRadius: 5
                }}
              >
                Press right mouse button anywhere to open menu. You can also write GraphQL code or
                load a project.
              </div>
            </div>
          )}
      </>
    );
  }
}
