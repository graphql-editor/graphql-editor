import * as React from 'react';
import { CodeEditor, TABS, CodeEditorOuterProps } from './Code';
import { GraphController } from '../Graph';
export type EditorState = {
  projectId?: string;
  serializeFunction: keyof typeof TABS;
};
export type EditorProps = {
  code: string;
  editorVisible: boolean;
} & CodeEditorOuterProps;

export class Editor extends React.Component<EditorProps, EditorState> {
  state: EditorState = {
    projectId: undefined,
    serializeFunction: 'graphql'
  };
  private containerRef = React.createRef<HTMLDivElement>();
  controller: GraphController = new GraphController();
  componentDidMount() {
    if (!this.containerRef.current) {
      return;
    }
    this.controller.setDOMElement(this.containerRef.current);
  }
  render() {
    return (
      <>
        {this.props.editorVisible === true && (
          <CodeEditor
            controller={this.controller}
            schema={this.props.code}
            schemaChanged={this.props.schemaChanged}
            remakeNodes={this.props.remakeNodes}
            language={this.state.serializeFunction}
          />
        )}
        <div ref={this.containerRef} />
      </>
    );
  }
}
