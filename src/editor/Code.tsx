import * as React from 'react';
import * as styles from './style/Code';
import cx from 'classnames';

import { importSchema, makeNodes } from './livegen/load';
import { SelectLanguage } from './SelectLanguage';
import AceEditor from 'react-ace';
import { GraphQLNodeType } from './livegen/code-generators';
import { LinkType } from '@slothking-online/diagram';
require(`brace/theme/twilight`);
require(`brace/mode/typescript`);
require(`brace/mode/graphqlschema`);
require(`brace/mode/json`);
require(`brace/ext/searchbox`);
export const TABS = {
  graphql: {},
  typescript: {},
  json: {}
};

export type CodeEditorOuterProps = {
  languageChanged?: (language: string) => void;
  schemaChanged?: (schema: string) => void;
  copiedToClipboard?: () => void;
  remakeNodes?: (nodes: GraphQLNodeType[], links: LinkType[], code: string) => void;
};

export type CodeEditorProps = {
  schema: string;
  onTabChange: (name: keyof typeof TABS) => void;
  language: string;
} & CodeEditorOuterProps;
export type CodeEditorState = {
  loadingUrl: boolean;
  currentTab: keyof typeof TABS;
  canMountAce: boolean;
};

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  state: CodeEditorState = {
    loadingUrl: false,
    canMountAce: false,
    currentTab: 'graphql'
  };
  taskRunner: number;
  lastSchema: string;
  lastEdit = 0;
  lastGeneration = 0;
  holder: HTMLDivElement;
  editor: AceEditor;
  componentDidMount() {
    this.taskRunner = setInterval(() => {
      if (this.lastSchema && this.lastEdit > this.lastGeneration) {
        try {
          const { nodes, links } = makeNodes(importSchema(this.lastSchema));
          this.props.remakeNodes && this.props.remakeNodes(nodes, links, this.lastSchema);
          this.lastGeneration = Date.now();
        } catch (error) {
          console.log(error);
        }
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
            this.props.languageChanged && this.props.languageChanged(currentTab);
            this.setState({ currentTab });
            this.props.onTabChange(currentTab);
          }}
          onCopy={() => {
            const { clipboard } = window.navigator as any;
            this.props.copiedToClipboard && this.props.copiedToClipboard();
            clipboard.writeText(this.props.schema);
          }}
        />
        <div
          className={cx(styles.CodeContainer)}
          ref={(ref) => {
            if (ref && !this.holder) {
              this.holder = ref;
              setTimeout(() => {
                (this.refs.editor as any).editor.resize();
              }, 1);
            }
          }}
        >
          <AceEditor
            ref={'editor'}
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
              if (!this.lastSchema) {
                this.props.schemaChanged && this.props.schemaChanged(e);
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
