import * as React from 'react';
import * as styles from './style/Code';
import cx from 'classnames';

import { SelectLanguage } from './SelectLanguage';
import AceEditor from 'react-ace';
import { GraphController } from '../Graph';
import { ParsingFunction } from '../Models';
require(`brace/theme/twilight`);
require(`brace/mode/typescript`);
require(`brace/mode/graphqlschema`);
require(`brace/mode/json`);
require(`brace/ext/searchbox`);
export type CodeEditorOuterProps = {
  schemaChanged?: (schema: string) => void;
};

export type CodeEditorProps = {
  schema: string;
  controller: GraphController;
} & CodeEditorOuterProps;
export type CodeEditorState = {
  loadingUrl: boolean;
  currentTab: ParsingFunction;
  canMountAce: boolean;
};

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  state: CodeEditorState = {
    loadingUrl: false,
    canMountAce: false,
    currentTab: ParsingFunction.graphql
  };
  taskRunner?: number;
  lastSchema?: string;
  lastEdit = 0;
  lastGeneration = 0;
  holder?: HTMLDivElement;
  editor?: AceEditor;
  componentDidMount() {
    this.taskRunner = setInterval(() => {
      if (this.lastSchema && this.lastEdit > this.lastGeneration) {
        try {
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
  loadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target!.files![0];
    const reader = new FileReader();
    reader.onload = (f) => {
      this.props.controller.load((f.target! as any).result);
    };
    reader.readAsText(file);
  };

  saveToFile = () => {
    // var file = new File([this.props.schema], `graphql-editor-schema.gql`, {
    //   type: 'application/json'
    // });
    // FileSaver.saveAs(file, `graphql-editor-schema.gql`);
  };
  render() {
    const aceChoices: Record<ParsingFunction, string> = {
      [ParsingFunction.graphql]: 'graphqlschema',
      [ParsingFunction.typescript]: 'typescript',
      [ParsingFunction.faker]: 'json'
    };
    const aceMode = aceChoices[this.state.currentTab];
    return (
      <div className={cx(styles.Sidebar)}>
        <SelectLanguage
          tabs={Object.keys(ParsingFunction)}
          onSelect={(currentTab) => {
            this.setState({ currentTab });
            this.props.controller.setParsingFunction(currentTab);
          }}
          onCopy={() => {
            const { clipboard } = window.navigator as any;
            clipboard.writeText(this.props.schema);
          }}
        />
        <input type="file" onChange={this.loadFromFile} />
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
            mode={aceMode}
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
              readOnly: aceMode !== 'graphqlschema',
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
