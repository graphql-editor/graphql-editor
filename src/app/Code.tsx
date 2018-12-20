import * as React from 'react';
import * as styles from '../style/Code';
import cx from 'classnames';
import { makeNodes } from '../livegen/import/makeNodes';

import { importSchema } from '../livegen/import';
import { SelectLanguage } from '../ui/SelectLanguage';
import { serialize } from '../livegen/serialize';

import AceEditor from 'react-ace';
import { Cloud } from '../cloud/Container';
require(`brace/theme/twilight`);

require(`brace/mode/typescript`);
require(`brace/mode/graphqlschema`);
require(`brace/mode/json`);
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
  taskRunner: number;
  lastSchema: string;
  lastEdit = 0;
  lastGeneration = 0;
  componentDidMount() {
    this.taskRunner = setInterval(() => {
      if (this.lastEdit > this.lastGeneration) {
        try {
          const { nodes, links } = makeNodes(importSchema(this.lastSchema));
          Cloud.setState({
            nodes,
            links,
            code: this.lastSchema,
            loaded: {
              nodes,
              links
            }
          });
          this.lastGeneration = Date.now();
        } catch (error) {}
      }
    }, 300) as any;
  }
  componentWillUnmount() {
    clearInterval(this.taskRunner);
  }
  // loadFromFile = (e) => {
  //   const file = e.target.files[0];
  //   // if (file.type.match('application/json')) {
  //   console.log(file.type);
  //   const reader = new FileReader();
  //   reader.onload = (f) => {
  //     const result = makeNodes(importSchema((f.target as any).result));
  //     this.props.loadNodes(result);
  //   };
  //   reader.readAsText(file);
  //   // }
  // };

  // saveToFile = () => {
  //   var file = new File([this.props.schema], `graphql-editor-schema.gql`, {
  //     type: 'application/json'
  //   });
  //   FileSaver.saveAs(file, `graphql-editor-schema.gql`);
  // };
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
          <AceEditor
            mode={
              {
                graphql: 'graphqlschema',
                typescript: 'typescript',
                json: 'json'
              }[this.props.language]
            }
            onBlur={(e) => {
              this.lastEdit = Date.now();
            }}
            onChange={(
              e,
              v: {
                action: 'insert' | 'remove';
                lines: string[];
                end: { row: number; column: number };
                start: { row: number; column: number };
              }
            ) => {
              console.log(v);
              if (v.action === 'insert' && v.lines.includes('}')) {
                this.lastEdit = Date.now();
              }
              this.lastSchema = e;
            }}
            style={{
              flex: 1,
              height: 'auto'
            }}
            editorProps={{
              $blockScrolling: Infinity
            }}
            setOptions={{
              readOnly: {
                graphql: false,
                typescript: true,
                json: true
              }[this.props.language],
              showLineNumbers: true
            }}
            theme={'twilight'}
            value={this.props.schema}
          />
        </div>
      </div>
    );
  }
}
