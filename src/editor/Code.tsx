import * as React from 'react';
import * as styles from './style/Code';
import cx from 'classnames';

import { SelectLanguage } from './SelectLanguage';
import AceEditor from 'react-ace';
import { GraphController } from '../Graph';
import { ParsingFunction } from '../Models';
import { parse, buildASTSchema } from 'graphql';
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
  errors?: {
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }[];
  error?: string;
};

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  state: CodeEditorState = {
    loadingUrl: false,
    canMountAce: false,
    currentTab: ParsingFunction.graphql
  };
  taskRunner?: number;
  lastSchema?: string;
  holder?: HTMLDivElement;
  editor?: AceEditor;
  componentWillMount() {
    this.lastSchema = this.props.schema;
  }
  componentWillReceiveProps(nextProps: CodeEditorProps) {
    if (nextProps.schema !== this.lastSchema) {
      this.lastSchema = nextProps.schema;
      this.forceUpdate();
    }
  }
  loadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target!.files![0];
    const reader = new FileReader();
    reader.onload = (f) => {
      this.props.controller.loadGraphQL((f.target! as any).result);
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
          onGenerate={() => {
            this.lastSchema && this.props.controller.loadGraphQL(this.lastSchema);
          }}
          loadFile={this.loadFromFile}
          loadVisible={this.state.currentTab === ParsingFunction.graphql}
          generateVisible={
            this.state.currentTab === ParsingFunction.graphql &&
            !!this.lastSchema &&
            !this.state.error &&
            !this.state.errors
          }
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
          {this.state.error && <div className={styles.ErrorLonger}>{this.state.error}</div>}
          <AceEditor
            ref={'editor'}
            mode={aceMode}
            annotations={this.state.errors}
            onChange={this.codeChange}
            style={{
              flex: 1,
              height: 'auto'
            }}
            editorProps={{
              $blockScrolling: Infinity
            }}
            setOptions={{
              readOnly: aceMode !== 'graphqlschema',
              showLineNumbers: true,
              tabSize: 2
            }}
            theme={'twilight'}
            value={this.lastSchema}
          />
        </div>
      </div>
    );
  }

  private codeChange = (
    e: string,
    v: {
      action: 'insert' | 'remove';
      lines: string[];
      end: {
        row: number;
        column: number;
      };
      start: {
        row: number;
        column: number;
      };
    }
  ) => {
    if (!this.lastSchema) {
      this.props.schemaChanged && this.props.schemaChanged(e);
    }
    this.lastSchema = e;
    try {
      const parsed = parse(e);
      try {
        buildASTSchema(parsed);
        if (this.state.errors || this.state.error) {
          this.setState({
            errors: undefined,
            error: undefined
          });
        }
      } catch (error) {
        this.setState({
          error: error.message
        });
      }
    } catch (error) {
      let er = error as {
        locations: {
          line: number;
          column: number;
        }[];
        message: string;
        positions: number[];
      };
      this.setState({
        errors: [
          {
            column: er.locations[0]!.column - 1,
            row: er.locations[0]!.line - 1,
            text: er.message,
            type: 'error',
            position: er.positions[0]
          }
        ]
      });
    }
  };
}
