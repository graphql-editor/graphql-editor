import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import * as styles from './style/Editor';
import { sizeSidebar } from '@vars';
import { Menu, ActivePane } from './Menu';
import { CodePane } from './code';

import { GraphQLEditorCypress, cypressGet } from '@cypress';
import { PassedSchema, Theming } from '@Models';
import { DynamicResize } from './code/Components';
import { Graf } from '@Graf/Graf';
import { ParserTree, Parser, TreeToGraphQL } from 'graphql-zeus';

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
}: EditorProps) => {
  const [code, setCode] = useState(schema.code);
  const [sidebarSize, setSidebarSize] = useState<string | number>(initialSizeOfSidebar);
  const [menuState, setMenuState] = useState<ActivePane>(activePane);
  const [tree, setTree] = useState<ParserTree>({ nodes: [] });
  const [selectedNode, setSelectedNode] = useState<string>();
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
  }, [code, schema.libraries]);

  useEffect(() => {
    setMenuState(activePane);
  }, [activePane]);

  const onTreeChanged = () => {
    const graphql = TreeToGraphQL.parse(tree);
    console.log(graphql);
    setCode(graphql);
  };

  return (
    <div
      data-cy={cypressGet(GraphQLEditorCypress, 'name')}
      style={{ display: 'flex', flexFlow: 'row nowrap', height: '100%', width: '100%', alignItems: 'stretch' }}
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
          disabledClass={menuState === 'code' ? styles.FullScreenContainer : undefined}
          resizeCallback={(e, r, c, w) => {
            setSidebarSize(c.getBoundingClientRect().width);
          }}
          width={menuState === 'code' ? '100%' : sidebarSize}
        >
          <div
            className={cx(styles.Sidebar, {
              [styles.FullScreenContainer]: menuState === 'code',
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
        <Graf
          onTreeChanged={onTreeChanged}
          deselect={() => setSelectedNode(undefined)}
          onSelectNode={(n: string) => {
            setSelectedNode(n);
          }}
          selectedNode={selectedNode}
          tree={tree}
        />
      )}
    </div>
  );
};
