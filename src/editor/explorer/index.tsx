import cx from 'classnames';
import { TypeDefinitionDisplayStrings } from 'graphql-zeus';
import React, { useEffect, useRef, useState } from 'react';
import { theme } from '../../Graph/theme';
import * as Icon from '../icons';
import { TitleOfPane } from '../code/Components';
import * as styles from './style/Explorer';
import { cypressGet, GraphQLEditorCypress } from '../../cypress_constants';
import {
  getSearchExpandTree,
  getSelectedExpandTree,
  getQueryMatchingNodeTree,
  getNextSelectedNode,
  flattenNodeTree,
  KeyboardNavDirection,
} from '../utils';
import { EditorNode } from '../../Models';
import { NodeComponent } from './NodeComponent';
import { FilterBlock } from './FilterBlock';

export interface ExplorerProps {
  visibleNodes: EditorNode[];
  selectedNodes: EditorNode[];
  centerOnNodeByID: (id: string) => void;
}

export const Explorer = ({ visibleNodes, selectedNodes, centerOnNodeByID }: ExplorerProps) => {
  const [phrase, setPhrase] = useState<string>('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const [unfoldedNodeIdList, setUnfoldedNodeIdList] = useState<string[]>([]);

  let resultNodes = visibleNodes.filter((n) => n.definition.root);
  let expandTree: (EditorNode | null)[] = resultNodes.map((rn) => getSelectedExpandTree(rn, selectedNodes));
  resultNodes.sort((a, b) => (a.name > b.name ? 1 : -1));

  if (selectedFilters.length > 0) {
    resultNodes = resultNodes.filter((n) => selectedFilters.includes(n.definition.type));
  }

  if (phrase.length > 0) {
    const sanitizedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    resultNodes = resultNodes.filter((n) => getQueryMatchingNodeTree(n, sanitizedPhrase));
    const searchExpandTree = resultNodes.map((n) => getSearchExpandTree(n, sanitizedPhrase));
    expandTree = searchExpandTree;
  }

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown', 'Enter'].includes(e.key)) {
      e.preventDefault();

      const keyAction = e.key === 'Enter' ? 'ArrowDown' : e.key;

      const nextSelectedNode = getNextSelectedNode(
        flattenNodeTree(resultNodes, unfoldedNodeIdList),
        keyAction as KeyboardNavDirection,
        selectedNodes[selectedNodes.length - 1],
      );
      if (nextSelectedNode) {
        centerOnNodeByID(nextSelectedNode.id);
      }
    }
  };

  useEffect(() => {
    inputEl.current?.focus();
  }, [unfoldedNodeIdList]);

  return (
    <div
      className={styles.Background}
      data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'explorer', 'name')}
      onKeyDown={onInputKeyDown}
      tabIndex={0}
    >
      <TitleOfPane>Explorer</TitleOfPane>
      <div className={styles.Title}>
        <input
          ref={inputEl}
          data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'explorer', 'children', 'search', 'name')}
          value={phrase}
          onChange={(e) => setPhrase(e.target.value)}
          type="text"
          className={styles.SearchInput}
          placeholder="Search nodes..."
        />
        <div
          className={cx(styles.FilterIcon, {
            active: filtersOpen,
          })}
          style={{
            ...(selectedFilters.length === 1
              ? {
                  color: theme.colors.node.types[selectedFilters[0]],
                }
              : {}),
          }}
          data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'explorer', 'children', 'filters', 'name')}
          onClick={() => {
            if (filtersOpen) {
              setFiltersOpen(!filtersOpen);
              setSelectedFilters([]);
            } else {
              setFiltersOpen(!filtersOpen);
            }
          }}
        >
          {filtersOpen ? <Icon.X size={12} /> : <Icon.Filter size={12} />}
        </div>
      </div>
      {filtersOpen && (
        <div className={styles.FilterTable}>
          {[...Object.keys(TypeDefinitionDisplayStrings), 'extend'].map((name) => (
            <FilterBlock
              color={theme.colors.node.types[name]}
              name={name}
              key={name}
              active={selectedFilters.includes(name)}
              onClick={() =>
                selectedFilters.includes(name)
                  ? setSelectedFilters(selectedFilters.filter((f) => f !== name))
                  : setSelectedFilters([...selectedFilters, name])
              }
            />
          ))}
        </div>
      )}
      <div
        className={styles.NodeList}
        data-cy={cypressGet(GraphQLEditorCypress, 'sidebar', 'explorer', 'children', 'list', 'name')}
      >
        {resultNodes.map((n, index) => (
          <NodeComponent
            onChangeUnfolded={(node, unfolded) => {
              if (unfolded && !unfoldedNodeIdList.includes(node.id)) {
                unfoldedNodeIdList.push(node.id);
              } else if (unfoldedNodeIdList.includes(node.id)) {
                unfoldedNodeIdList.splice(unfoldedNodeIdList.indexOf(node.id), 1);
              }
              setUnfoldedNodeIdList([...unfoldedNodeIdList]);
            }}
            selectedNodeIds={selectedNodes.map((sn) => sn.id)}
            searchPhrase={phrase || ''}
            unfoldBySearch={expandTree[index]}
            key={n.id}
            relatives={visibleNodes.filter((cn) => cn.definition.type === n.name)}
            indentLevel={0}
            centerNode={(id) => {
              centerOnNodeByID(id);
            }}
            centerType={(definition) => {
              if (definition.parent) {
                const parentNode = visibleNodes.find(
                  (node) => node.definition === definition.parent && node.name === definition.type!,
                );
                if (parentNode) {
                  const { id } = parentNode;
                  centerOnNodeByID(id);
                }
              }
            }}
            node={n}
          />
        ))}
        <div style={{ marginBottom: filtersOpen ? 260 : 150 }} />
      </div>
    </div>
  );
};
