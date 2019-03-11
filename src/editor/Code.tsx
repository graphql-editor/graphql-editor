import * as React from 'react';
import * as styles from './style/Code';
import cx from 'classnames';

import { SelectLanguage } from './SelectLanguage';
import AceEditor from 'react-ace';
import { GraphController } from '../Graph';
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
  render() {
    return (
      <div className={cx(styles.Sidebar)}>
        <SelectLanguage
          onCopy={() => {
            const { clipboard } = window.navigator as any;
            clipboard.writeText(this.props.schema);
          }}
          onGenerate={() => {
            this.lastSchema && this.props.controller.loadGraphQL(this.lastSchema);
          }}
          generateVisible={
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
            mode={'graphqlschema'}
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
