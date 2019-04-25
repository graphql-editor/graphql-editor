import * as cx from 'classnames';
import * as React from 'react';
import * as styles from './style/Code';

import { buildASTSchema, parse } from 'graphql';
import AceEditor from 'react-ace';
import { GraphController } from '../Graph';
import { sizeSidebar } from '../vars';
import { SelectLanguage } from './SelectLanguage';
require(`brace/theme/twilight`);
require(`brace/mode/typescript`);
require(`brace/mode/graphqlschema`);
require(`brace/mode/json`);
require(`brace/ext/searchbox`);
export interface CodeEditorOuterProps {
  schemaChanged?: (schema: string) => void;
  readonly?: boolean;
}

export type CodeEditorProps = {
  schema: string;
  stitches?: string;
  controller: GraphController;
} & CodeEditorOuterProps;
export interface CodeEditorState {
  loadingUrl: boolean;
  canMountAce: boolean;
  errors?: Array<{
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }>;
  error?: string;
}

export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  public dragging = false;
  public startX?: number;
  public refSidebar?: HTMLDivElement;
  public aceEditorRef?: AceEditor;
  public state: CodeEditorState = {
    loadingUrl: false,
    canMountAce: false
  };
  public taskRunner?: number;
  public startWidth = sizeSidebar;
  public width = sizeSidebar;
  public lastSchema?: string;
  public holder?: HTMLDivElement;
  public editor?: AceEditor;
  public componentWillMount() {
    this.lastSchema = this.props.schema;
  }
  public componentWillReceiveProps(nextProps: CodeEditorProps) {
    if (nextProps.schema !== this.lastSchema) {
      this.lastSchema = nextProps.schema;
      this.forceUpdate();
    }
  }
  public render() {
    return (
      <>
        <div
          className={cx(styles.Sidebar)}
          ref={(ref) => {
            if (ref) {
              this.refSidebar = ref;
            }
          }}
        >
          <SelectLanguage
            onGenerate={() => this.lastSchema && this.props.controller.loadGraphQL(this.lastSchema)}
            generateVisible={!!this.lastSchema && !this.state.error && !this.state.errors}
          />
          <div
            className={cx(styles.CodeContainer)}
            ref={(ref) => {
              if (ref && !this.holder) {
                this.holder = ref;
                setTimeout(() => {
                  (this.aceEditorRef as any).editor.resize();
                }, 1);
              }
            }}
          >
            {this.state.error && <div className={styles.ErrorLonger}>{this.state.error}</div>}
            <AceEditor
              ref={(ref) => {
                if (ref) {
                  this.aceEditorRef = ref;
                }
              }}
              mode={'graphqlschema'}
              annotations={this.state.errors}
              onChange={this.codeChange}
              readOnly={this.props.readonly}
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
            (this.aceEditorRef as any).editor.container.style.width = `${this.width}px`;
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
    if (!this.lastSchema && this.props.schemaChanged) {
      this.props.schemaChanged(e);
    }
    this.lastSchema = e;
    const combinedCode = (this.props.stitches || '') + e;
    try {
      const parsed = parse(combinedCode);
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
      const er = error as {
        locations: Array<{
          line: number;
          column: number;
        }>;
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
  }
}
