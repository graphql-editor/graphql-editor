import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { sizeSidebar, fontFamily } from '@/vars';
import { Menu, ActivePane } from './Menu';
import { CodePane } from './code';

import { GraphQLEditorCypress, cypressGet } from '@/cypress_constants';
import { PassedSchema, Theming } from '@/Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@/Graf/Graf';
import { Parser, TreeToGraphQL } from 'graphql-zeus';
import { Workers } from '@/worker';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { useTreesState } from '@/state/containers/trees';
import { useErrorsState } from '@/state/containers';

export const Main = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  height: '100%',
  width: '100%',
  alignItems: 'stretch',
});

export const FullScreenContainer = style({
  flex: 1,
  alignSelf: 'stretch',
  height: '100%',
});
export const ErrorContainer = style({
  position: 'absolute',
  zIndex: 2,
  top: 0,
  right: 0,
  width: `calc(100% - 40px)`,
  padding: 20,
  color: Colors.red[0],
  background: `${Colors.red[6]}ee`,
  margin: 20,
  borderRadius: 4,
  border: `1px solid ${Colors.red[0]}`,
  fontSize: 12,
  fontFamily,
  letterSpacing: 1,
});

export const Sidebar = style({
  alignSelf: 'stretch',
  zIndex: 2,
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflow: 'hidden',
  background: Colors.grey[8],
  position: 'relative',
});

export const ErrorOuterContainer = style({
  width: '100%',
  position: 'relative',
});

export interface EditorProps extends Theming {
  activePane?: ActivePane;
  readonly?: boolean;
  placeholder?: string;
  schema?: PassedSchema;
  onPaneChange?: (pane: ActivePane) => void;
  onSchemaChange?: (props: PassedSchema) => void;
}

let treeLock = false;
let codeLock = false;

export const Editor = ({
  readonly,
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  initialSizeOfSidebar = sizeSidebar,
  activePane = 'diagram',
  onPaneChange,
  onSchemaChange,
}: EditorProps) => {
  const [code, setCode] = useState('');
  const [sidebarSize, setSidebarSize] = useState<string | number>(initialSizeOfSidebar);
  const [menuState, setMenuState] = useState<ActivePane>(activePane);
  const { grafErrors, setGrafErrors, setCodeErrors, setLockGraf } = useErrorsState();

  const { tree, setSnapshots, setUndos, setTree, setLibraryTree } = useTreesState();

  const reset = () => {
    setSnapshots([]);
    setUndos([]);
    setGrafErrors(undefined);
  };

  useEffect(() => {
    if (schema.code !== code) {
      setCode(schema.code);
      Workers.validate(schema.code, schema.libraries).then((errors) => {
        setCodeErrors(errors);
        setLockGraf(!!errors.length);
      });
    }
  }, [schema.code]);

  useEffect(() => {
    if (treeLock) {
      treeLock = false;
      return;
    }
    if (!code) {
      setTree({ nodes: [] });
      return;
    }
    try {
      if (schema.libraries) {
        const excludeLibraryNodesFromDiagram = Parser.parse(schema.libraries);
        const parsedResult = Parser.parse(code, [], schema.libraries);
        setTree({
          nodes: parsedResult.nodes.filter(
            (n) =>
              !excludeLibraryNodesFromDiagram.nodes.find((eln) => eln.name === n.name && eln.data.type === n.data.type),
          ),
        });
      } else {
        setTree(Parser.parse(code));
      }
    } catch (error) {
      console.log('Dupa');
      console.log(error);
    }
  }, [code]);

  useEffect(() => {
    if (schema.libraries) {
      setLibraryTree(Parser.parse(schema.libraries));
    } else {
      setLibraryTree({ nodes: [] });
    }
    reset();
  }, [schema.libraries]);

  useEffect(() => {
    setMenuState(activePane);
  }, [activePane]);

  useEffect(() => {
    if (codeLock) {
      codeLock = false;
      return;
    }
    if (tree.nodes.length === 0) {
      if (code !== '') {
        treeLock = true;
        setCode('');
        if (onSchemaChange) {
          onSchemaChange({
            code: '',
            libraries: schema.libraries,
          });
        }
      }
      return;
    }
    try {
      //TODO: UNNAMED NODES
      const graphql = TreeToGraphQL.parse(tree);
      if (graphql !== code) {
        treeLock = true;
        Workers.validate(graphql, schema.libraries).then((errors) => {
          if (errors.length > 0) {
            setGrafErrors(errors.map((e) => e.text).join('\n\n'));
            return;
          }
          setGrafErrors(undefined);
          setCode(graphql);
          if (onSchemaChange) {
            onSchemaChange({
              code: graphql,
              libraries: schema.libraries,
            });
          }
        });
      }
    } catch (error) {
      setGrafErrors(error.message);
      return;
    }
  }, [tree]);

  return (
    <div
      data-cy={cypressGet(GraphQLEditorCypress, 'name')}
      className={Main}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
        }
      }}
    >
      <Menu
        activePane={menuState}
        setActivePane={(pane) => {
          setMenuState(pane);
          if (onPaneChange) {
            onPaneChange(pane);
          }
        }}
      />
      {menuState !== 'diagram' && (
        <DynamicResize
          disabledClass={menuState === 'code' ? FullScreenContainer : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={menuState === 'code' ? '100%' : sidebarSize}
        >
          <div
            className={cx(Sidebar, {
              [FullScreenContainer]: menuState === 'code',
            })}
            data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'name')}
          >
            {(menuState === 'code' || menuState === 'code-diagram') && (
              <CodePane
                size={menuState === 'code' ? 100000 : sidebarSize}
                onChange={(v) => setCode(v)}
                schema={code}
                libraries={schema.libraries}
                placeholder={placeholder}
                readonly={readonly}
              />
            )}
          </div>
        </DynamicResize>
      )}
      {menuState !== 'code' && (
        <div className={ErrorOuterContainer}>
          {grafErrors && <div className={ErrorContainer}>{grafErrors}</div>}
          <Graf readonly={readonly} />
        </div>
      )}
    </div>
  );
};
