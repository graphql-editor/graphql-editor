import * as React from 'react';
import * as styles from './style/Code';
import cx from 'classnames';

import { SelectLanguage } from './SelectLanguage';
import AceEditor from 'react-ace';
import { GraphController } from '../Graph';
import { parse, buildASTSchema } from 'graphql';
import { sizeSidebar } from '../vars';
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
  dragging = false;
  startX?: number;
  refSidebar?: HTMLDivElement;
  state: CodeEditorState = {
    loadingUrl: false,
    canMountAce: false
  };
  taskRunner?: number;
  startWidth = sizeSidebar;
  width = sizeSidebar;
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
      <>
        <div
          className={cx(styles.Sidebar)}
          ref={(ref) => {
            if (ref) this.refSidebar = ref;
          }}
        >
          <SelectLanguage
            onGenerate={() => {
              this.lastSchema && this.props.controller.loadGraphQL(this.lastSchema);
            }}
            generateVisible={!!this.lastSchema && !this.state.error && !this.state.errors}
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
        <div
          draggable={true}
          className={styles.Resizer}
          onDragStart={(e) => {
            e.dataTransfer.setData('id', 'draging');
            this.dragging = true;
          }}
          onDrag={(e) => {
            this.dragging = true;
          }}
          onDragOver={(e) => {
            this.startX = this.startX || e.clientX;
            const deltaX = e.clientX - this.startX;
            this.width = this.startWidth + deltaX;
            this.refSidebar!.style.width = `${this.width}px`;
            (this.refs.editor as any).editor.container.style.width = `${this.width}px`;
          }}
          onDragEnd={(e) => {
            this.dragging = false;
            this.startX = undefined;
            this.startWidth = this.width;
          }}
        />
      </>
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
