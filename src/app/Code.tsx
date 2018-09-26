import * as React from 'react';
import * as styles from '../style/Code';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import * as FileSaver from 'file-saver';
import * as cx from 'classnames';
// import { importSchema, getTypes, getBuiltInTypes } from '../livegen/import';

export type CodeEditorProps = {
  liveCode: string;
};
export type CodeEditorState = {
  editor?: boolean;
};

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  state: CodeEditorState = {};
  render() {
    return (
      <div
        className={cx({
          [styles.HideEditor]: this.state.editor,
          [styles.ShowEditor]: !this.state.editor,
          [styles.Editor]: true
        })}
      >
        <SyntaxHighlighter
          PreTag={({ children }) => <div className={styles.Pre}>{children}</div>}
          language="graphql"
          style={xonokai}
        >
          {this.props.liveCode}
        </SyntaxHighlighter>

        {/* <input
          type="file"
          id="load"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files[0];
            // if (file.type.match('application/json')) {
            console.log(file.type);
            const reader = new FileReader();
            reader.onload = (f) => {
              const schema = importSchema((f.target as any).result);
              const types = getTypes(schema);
              console.log(getBuiltInTypes());
              console.log(types);
            };
            reader.readAsText(file);
            // }
          }}
        />
        <label htmlFor="load" className={styles.Load} onClick={() => {}}>
          Load
        </label>  WORK IN PROGRESS*/}
        <div
          className={styles.Save}
          onClick={() => {
            var file = new File([this.props.liveCode], `graphql-editor-schema.gql`, {
              type: 'application/json'
            });
            FileSaver.saveAs(file, `graphql-editor-schema.gql`);
          }}
        >
          Save to file
        </div>
        <div
          className={styles.ClickInfo}
          onClick={() => {
            this.setState({
              editor: !this.state.editor
            });
          }}
        >
          {this.state.editor ? `>>` : `<<`}
        </div>
      </div>
    );
  }
}
