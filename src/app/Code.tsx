import * as React from 'react';
import * as styles from '../style/Code';
import { xonokai } from 'react-syntax-highlighter/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import * as FileSaver from 'file-saver';
import cx from 'classnames';
import { makeNodes } from '../livegen/import/makeNodes';
import { GraphQLNodeType } from '../livegen/gens';
import { LinkType } from '@slothking-online/diagram';
import { Button } from '../ui/Button';
import { ButtonFile } from '../ui/ButtonFile';

import { ArrowLeft2, CloudUpload, Download, Upload } from '../assets/icons';
import { importSchema } from '../livegen/import';
import { URLBar } from '../ui/URLBar';
import { getSchemaFromURL } from '../livegen/import/fromUrl';

export type CodeEditorProps = {
  liveCode: string;
  onPinChange?: (pinned) => void;
  onHide?: (hidden) => void;
  pinned: boolean;
  hidden: boolean;
  loadNodes: (
    props: {
      nodes: GraphQLNodeType[];
      links: LinkType[];
    }
  ) => void;
};
export type CodeEditorState = {
  loadingUrl: boolean;
};

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  state: CodeEditorState = {
    loadingUrl: false
  };

  loadFromFile = (e) => {
    const file = e.target.files[0];
    // if (file.type.match('application/json')) {
    console.log(file.type);
    const reader = new FileReader();
    reader.onload = (f) => {
      const result = makeNodes(importSchema((f.target as any).result));
      this.props.loadNodes(result);
    };
    reader.readAsText(file);
    // }
  };

  saveToFile = () => {
    var file = new File([this.props.liveCode], `graphql-editor-schema.gql`, {
      type: 'application/json'
    });
    FileSaver.saveAs(file, `graphql-editor-schema.gql`);
  };

  render() {
    return (
      <div className={cx(styles.Sidebar, { [styles.SidebarHidden]: this.props.hidden })}>
        <div className={cx(styles.Toolbar, { [styles.ToolbarHidden]: this.props.hidden })}>
          {this.state.loadingUrl && (
            <React.Fragment>
              <URLBar
                goBack={() => {
                  this.setState({
                    loadingUrl: false
                  });
                }}
                onClick={(url) => {
                  getSchemaFromURL(url)
                    .then((schema) => {
                      const nodes = makeNodes(schema);
                      this.props.loadNodes(nodes);
                      this.setState({
                        loadingUrl: false
                      });
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              />
            </React.Fragment>
          )}
          {!this.state.loadingUrl && (
            <React.Fragment>
              <Button
                icon={CloudUpload}
                onClick={() => {
                  this.setState({
                    loadingUrl: true
                  });
                }}
                className={styles.SidebarControl}
              >
                Load URL
              </Button>
              <ButtonFile icon={Upload} onChange={this.loadFromFile} />
              <Button icon={Download} onClick={this.saveToFile} className={styles.SidebarControl}>
                Save to file
              </Button>
            </React.Fragment>
          )}
          <Button
            rounded={this.props.hidden}
            disabled={this.props.pinned}
            className={cx(styles.SidebarControl, { [styles.FlippedButton]: this.props.hidden })}
            icon={ArrowLeft2}
            onClick={() => this.props.onHide(!this.props.hidden)}
          />
        </div>
        <div
          className={cx(styles.CodeContainer, { [styles.CodeContainerHidden]: this.props.hidden })}
        >
          <SyntaxHighlighter
            PreTag={({ children }) => <div className={styles.Pre}>{children}</div>}
            language="graphql"
            style={xonokai}
          >
            {this.props.liveCode}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}
