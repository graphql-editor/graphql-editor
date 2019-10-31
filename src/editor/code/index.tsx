import cx from 'classnames';
import { Node } from 'graphsource';
import React from 'react';
import { GraphController } from '../../Graph';
import { sizeSidebar } from '../../vars';
import * as Icons from '../icons';
import { CodePane } from './CodePane';
import { Explorer } from './Explorer';
import * as styles from './style/Main';
export interface CodeEditorOuterProps {
  schemaChanged?: (schema: string) => void;
  readonly?: boolean;
  placeholder?: string;
}

export type CodeEditorProps = {
  schema: string;
  stitches?: string;
  controller: GraphController;
  selectedNodes: Node[];
  onResized: () => void;
} & CodeEditorOuterProps;
export interface CodeEditorState {
  loadingUrl: boolean;
  errors?: Array<{
    row: number;
    column: number;
    type: 'error';
    text: string;
    position: number;
  }>;
  error?: string;
  hideEditor: boolean;
  activePane: 'code' | 'explorer';
  codePaneWidth: number;
}

/**
 * React compontent holding GraphQL IDE
 */
export class CodeEditor extends React.Component<CodeEditorProps, CodeEditorState> {
  public dragging = false;
  public startX?: number;
  public refSidebar?: HTMLDivElement;
  public refHandle?: HTMLDivElement;
  public state: CodeEditorState = {
    loadingUrl: false,
    hideEditor: false,
    activePane: 'code',
    codePaneWidth: sizeSidebar
  };
  public taskRunner?: number;
  public startWidth = this.state.codePaneWidth;
  public componentDidMount() {
    document.addEventListener('keydown', this.invokeFindListener);
  }
  public componentWillUnmount() {
    document.removeEventListener('keydown', this.invokeFindListener);
  }
  invokeFindListener = (e: any) => {
    if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      this.setState({
        activePane: 'explorer',
        hideEditor: false,
        codePaneWidth: sizeSidebar
      });
    }
  }
  public render() {
    return (
      <>
        <div className={styles.HiderPanel}>
          <div
            className={styles.Hider}
            onClick={() => {
              this.setState(
                {
                  hideEditor: !this.state.hideEditor
                },
                this.props.onResized
              );
            }}
          >
            {this.state.hideEditor ? <Icons.Show size={16} /> : <Icons.Hide size={16} />}
          </div>
          <div
            className={cx(styles.Hider, {
              active: this.state.activePane === 'code' && !this.state.hideEditor
            })}
            onClick={() =>
              this.setState({
                activePane: 'code',
                hideEditor: false,
                codePaneWidth: sizeSidebar
              })
            }
          >
            <Icons.Code size={16} />
          </div>
          <div
            className={cx(styles.Hider, {
              active: this.state.activePane === 'explorer' && !this.state.hideEditor
            })}
            onClick={() =>
              this.setState({
                activePane: 'explorer',
                hideEditor: false
              })
            }
          >
            <Icons.Layers size={16} />
          </div>
        </div>

        {!this.state.hideEditor && (
          <div
            className={cx(styles.Sidebar)}
            ref={(ref) => {
              if (ref) {
                this.refSidebar = ref;
              }
            }}
          >
            {this.state.activePane === 'code' && (
              <CodePane
                codePaneWidth={this.state.codePaneWidth}
                controller={this.props.controller}
                schema={this.props.schema}
                stitches={this.props.stitches}
                schemaChanged={this.props.schemaChanged}
                placeholder={this.props.placeholder}
                readonly={this.props.readonly}
                onResized={this.resize}
              />
            )}
            {this.state.activePane === 'explorer' && (
              <Explorer
                selectedNodes={this.props.selectedNodes}
                controller={this.props.controller}
              />
            )}
          </div>
        )}
      </>
    );
  }

  private resize = (width: number) => {
    this.setState({
      codePaneWidth: width
    });
    this.refSidebar!.style.width = this.refSidebar!.style.flexBasis = `${width}px`;
    this.props.onResized();
  }
}
