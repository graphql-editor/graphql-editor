import cx from 'classnames';
import { buildASTSchema, parse } from 'graphql';
import React from 'react';
import AceEditor, { IAceEditorProps } from 'react-ace';
import { GraphController } from '../../Graph';
import { sizeSidebar } from '../../vars';
import * as Icon from '../icons';
import './ace/graphqleditor';
import './ace/graphqlschema';
import { StatusDot, TitleOfPane } from './Components';
import * as styles from './style/Code';
import { StatusDotProps } from './style/Components';
require(`brace/ext/searchbox`);
export interface CodePaneOuterProps {
  schemaChanged?: (schema: string) => void;
  readonly?: boolean;
  placeholder?: string;
  onResized: (width: number) => void;
}

export type AceEditorInstance = React.Component<IAceEditorProps, {}> & {
  editor?: { execCommand: (cmd: string) => {}; searchBox: { active: boolean } };
};

export type CodePaneProps = {
  schema: string;
  stitches?: string;
  controller: GraphController;
  codePaneWidth: number;
} & CodePaneOuterProps;
export interface CodePaneState {
  loadingUrl: boolean;
  isResizing?: boolean;
  errors?: Array<{
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }>;
  error?: string;
  hideEditor: boolean;
  fullScreen: boolean;
}

/**
 * React compontent holding GraphQL IDE
 */
export class CodePane extends React.Component<CodePaneProps, CodePaneState> {
  public dragging = false;
  public startX?: number;
  public refHandle?: HTMLDivElement;
  public aceEditorRef?: AceEditor;
  public state: CodePaneState = {
    loadingUrl: false,
    hideEditor: false,
    fullScreen: false
  };
  public taskRunner?: number;
  public startWidth = this.props.codePaneWidth;
  public width = this.props.codePaneWidth;
  public lastSchema?: string;
  public holder?: HTMLDivElement;
  public editor?: AceEditor;
  constructor(props: CodePaneProps) {
    super(props);
    this.lastSchema = props.schema;
  }
  public componentWillReceiveProps(nextProps: CodePaneProps) {
    if (nextProps.schema !== this.lastSchema) {
      this.lastSchema = nextProps.schema;
      this.forceUpdate();
    }
    if (nextProps.codePaneWidth !== this.props.codePaneWidth) {
      this.resizeCodePaneAce(nextProps.codePaneWidth);
    }
  }
  public render() {
    const generateEnabled =
      !this.props.readonly && !!this.lastSchema && !this.state.error && !this.state.errors;
    const syncStatus =
      this.lastSchema !== this.props.schema ? StatusDotProps.nosync : StatusDotProps.sync;
    return (
      <>
        <TitleOfPane>
          code editor{' '}
          <span
            className={cx(styles.FullScreenIcon, {
              active: this.state.fullScreen
            })}
            onClick={() => this.toggleFullScreen()}
          >
            <Icon.FullScreen size={14} />
          </span>
          <div
            className={cx(styles.Generate, {
              disabled: !generateEnabled
            })}
            onClick={() => generateEnabled && this.props.controller.loadGraphQL(this.lastSchema!)}
          >
            {generateEnabled
              ? syncStatus === StatusDotProps.sync
                ? 'synchronized'
                : 'out of sync'
              : 'errors in code'}
          </div>
          <StatusDot status={syncStatus} />
        </TitleOfPane>
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
            placeholder={this.props.placeholder}
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
            theme={'graphqleditor'}
            value={this.lastSchema}
            width={`${this.props.codePaneWidth}`}
          />
        </div>
      </>
    );
  }
  toggleFullScreen = () => {
    if (this.state.fullScreen) {
      this.setState(
        {
          fullScreen: false
        },
        () => this.props.onResized(sizeSidebar)
      );
    } else {
      this.setState(
        {
          fullScreen: true
        },
        () => this.props.onResized(window.innerWidth - 30)
      );
    }
  }

  private resizeCodePaneAce(width: number) {
    this.width = width;
    (this.aceEditorRef as any).editor.container.style.width = `${width}px`;
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
