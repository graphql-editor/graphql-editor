import * as React from 'react';
import * as styles from '../style/Code';
import { atomDark } from 'react-syntax-highlighter/styles/prism';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import * as FileSaver from 'file-saver';
import cx from 'classnames';
import { makeNodes } from '../livegen/import/makeNodes';
import { GraphQLNodeType } from '../livegen/gens';
import { LinkType } from '@slothking-online/diagram';

import { importSchema } from '../livegen/import';
import { SelectLanguage } from '../ui/SelectLanguage';
import { serialize } from '../livegen/serialize';
export const TABS = Object.keys(serialize).reduce(
  (a, b) => {
    a[b] = {};
    return a;
  },
  {} as { [x in keyof typeof serialize]: any }
);

export type CodeEditorProps = {
  schema: string;
  onTabChange: (name: keyof typeof TABS) => void;
  language: string;
  loadNodes: (
    props: {
      nodes: GraphQLNodeType[];
      links: LinkType[];
    }
  ) => void;
};
export type CodeEditorState = {
  loadingUrl: boolean;
  currentTab: keyof typeof TABS;
};

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  state: CodeEditorState = {
    loadingUrl: false,
    currentTab: 'graphql'
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
    var file = new File([this.props.schema], `graphql-editor-schema.gql`, {
      type: 'application/json'
    });
    FileSaver.saveAs(file, `graphql-editor-schema.gql`);
  };
  render() {
    return (
      <div className={cx(styles.Sidebar)}>
        <SelectLanguage
          tabs={Object.keys(TABS)}
          onSelect={(currentTab) => {
            this.setState({ currentTab });
            this.props.onTabChange(currentTab);
          }}
          onCopy={() => {
            const { clipboard } = window.navigator as any;
            clipboard.writeText(this.props.schema);
          }}
        />
        <div className={cx(styles.CodeContainer)}>
          <SyntaxHighlighter
            PreTag={({ children }) => <div className={styles.Pre}>{children}</div>}
            language={this.props.language}
            style={atomDark}
            showLineNumbers
            wrapLines
          >
            {this.props.schema}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}
