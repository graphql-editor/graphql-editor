import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { sizeSidebar, fontFamily, menuWidth } from '@/vars';
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
import { useIO, KeyboardActions } from '@/Graf/IO';
import { useTreesState } from '@/state/containers/trees';

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
  width: `calc(100vw - ${sizeSidebar} - 40px - ${menuWidth}px)`,
  padding: 20,
  color: Colors.red[0],
  background: `${Colors.grey[9]}ee`,
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

export interface EditorProps extends Theming {
  activePane?: ActivePane;
  readonly?: boolean;
  placeholder?: string;
  schema?: PassedSchema;
  onPaneChange?: (pane: ActivePane) => void;
  onSchemaChange?: (props: PassedSchema) => void;
}

export const Editor = ({
  readonly,
  placeholder,
  schema = {
    code: '',
    libraries: '',
  },
  initialSizeOfSidebar = sizeSidebar,
  activePane = 'code-diagram',
  onPaneChange,
  onSchemaChange,
}: EditorProps) => {
  const [code, setCode] = useState(schema.code);
  const [sidebarSize, setSidebarSize] = useState<string | number>(initialSizeOfSidebar);
  const [menuState, setMenuState] = useState<ActivePane>(activePane);
  const [errors, setErrors] = useState<string>();

  const { tree, snapshots, undoCursor, setSnapshots, setTree, setUndoCursor, setLibraryTree } = useTreesState();

  const reset = () => {
    setSnapshots([]);
    setUndoCursor(0);
    setErrors(undefined);
  };

  useEffect(() => {
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

  const undo = () => {
    if (snapshots.length > undoCursor - 1 && snapshots.length > 1) {
      const past = snapshots[undoCursor - 2];
      setUndoCursor(undoCursor - 1);
      const graphql = TreeToGraphQL.parse(past);
      setCode(graphql);
    }
  };
  useIO({
    on: (action) => {
      if (action === KeyboardActions.Undo) {
        undo();
      }
      if (action === KeyboardActions.Redo) {
        if (snapshots.length >= undoCursor + 1) {
          const future = snapshots[undoCursor + 1];
          setUndoCursor(undoCursor + 1);
          setCode(TreeToGraphQL.parse(future));
        }
      }
    },
  });

  const onTreeChanged = () => {
    try {
      //TODO: UNNAMED NODES
      const graphql = TreeToGraphQL.parse(tree);
      Workers.validate(graphql, schema.libraries).then((errors) => {
        if (errors.length > 0) {
          setErrors(errors.map((e) => e.text).join('\n\n'));
          return;
        }
        setErrors(undefined);
        setCode(graphql);
        if (onSchemaChange) {
          onSchemaChange({
            code: graphql,
            libraries: schema.libraries,
          });
        }
      });
    } catch (error) {
      setErrors(error.message);
      return;
    }
  };

  return (
    <div
      data-cy={cypressGet(GraphQLEditorCypress, 'name')}
      className={Main}
      onKeyDown={(e) => {
        if (e.key.toLowerCase() === 'f' && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setMenuState('explorer-diagram');
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
        <>
          {errors && <div className={ErrorContainer}>{errors}</div>}
          <Graf onTreeChanged={onTreeChanged} />
        </>
      )}
    </div>
  );
};
