import cx from 'classnames';
import { TypeDefinitionDisplayStrings } from 'graphql-zeus';
import { Node, NodeDefinition } from 'graphsource';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../../Graph';
import { theme } from '../../Graph/theme';
import * as Icon from '../icons';
import { TitleOfPane } from './Components';
import * as styles from './style/Explorer';
import { cypressGet, c } from '../../cypress_constants';
import {
  getSearchExpandTree,
  getSelectedExpandTree,
  getQueryMatchingNodeTree,
  getNextSelectedNode,
  flattenNodeTree,
  KeyboardNavDirection,
  scrollToSelectedNode,
} from './utils';
export interface ExplorerProps {
  controller: GraphController;
  selectedNodes: Node[];
}

interface NodeComponentProps {
  node: Node;
  centerNode: (id: string) => void;
  centerType: (parentDefition: NodeDefinition) => void;
  relatives?: Node[];
  indentLevel?: number;
  selectedNodeIds: string[];
  searchPhrase?: string;
  unfoldBySearch?: Node | null;
  onChangeUnfolded: (node: Node, unfold: boolean) => void;
}

interface NodeNameHighlightedProps {
  name: string;
  searchPhrase: string;
}

const NodeNameHighlighted: React.FC<NodeNameHighlightedProps> = ({ name = '', searchPhrase = '' }) => {
  if (!searchPhrase || name.toLowerCase().indexOf(searchPhrase.toLowerCase()) < 0) {
    return <>{name}</>;
  }

  const searchStartIndex = name.toLowerCase().indexOf(searchPhrase.toLowerCase());
  const searchEndIndex = searchStartIndex + searchPhrase.length;

  return (
    <>
      {name.substring(0, searchStartIndex)}
      <span className={cx(styles.Highlight)}>{name.substring(searchStartIndex, searchEndIndex)}</span>
      {name.substr(searchEndIndex)}
    </>
  );
};

const NodeComponent = ({
  node,
  centerNode,
  centerType,
  selectedNodeIds,
  relatives,
  indentLevel = 0,
  searchPhrase = '',
  unfoldBySearch,
  onChangeUnfolded,
}: NodeComponentProps) => {
  const [unfold, setUnfold] = useState<boolean>(false);
  const [showRelatives, setShowRelatives] = useState<boolean>(false);

  const nodeInputs = node.inputs ? node.inputs : [];
  const hasInputs = nodeInputs.length > 0;
  const hasRelatives = relatives && relatives.length > 0;

  const hasMatchingChildren = unfoldBySearch && unfoldBySearch.inputs && unfoldBySearch.inputs.length > 0;

  useEffect(() => {
    onChangeUnfolded(node, unfold);
  }, [unfold]);

  useEffect(() => {
    if (hasMatchingChildren) {
      setUnfold(true);
    }
  }, [unfoldBySearch]);

  useEffect(() => {
    if (selectedNodeIds.includes(node.id)) {
      scrollToSelectedNode(elementRef.current || undefined);
    }
  }, [selectedNodeIds.includes(node.id)]);

  const elementRef = React.createRef<HTMLDivElement>();

  return (
    <>
      <div
        onClick={() => centerNode(node.id)}
        className={cx(styles.Node, {
          active: selectedNodeIds.includes(node.id),
        })}
        key={node.id}
        style={{
          marginLeft: indentLevel * 10,
        }}
        ref={elementRef}
      >
        {hasInputs ? (
          <div
            className={styles.NodeIcon}
            title={unfold ? 'hide fields' : 'show fields'}
            onClick={(e) => {
              e.stopPropagation();
              if (hasInputs) {
                setUnfold(!unfold);
              }
            }}
          >
            {unfold ? <Icon.Minus size={15} /> : <Icon.Plus size={15} />}
          </div>
        ) : (
          <div className={styles.NodeIcon}>
            <div style={{ width: 15, height: 15 }} />
          </div>
        )}
        {hasRelatives ? (
          <div
            title={showRelatives ? 'hide usages' : 'show usages'}
            className={styles.NodeIcon}
            onClick={(e) => {
              e.stopPropagation();
              setShowRelatives(!showRelatives);
            }}
          >
            {showRelatives ? <Icon.ToggleOn size={15} /> : <Icon.ToggleOff size={15} />}
          </div>
        ) : (
          <div className={styles.NodeIcon}>
            <div style={{ width: 15, height: 15 }} />
          </div>
        )}
        <div className={styles.NodeTitle}>
          <NodeNameHighlighted name={node.name} searchPhrase={searchPhrase} />
        </div>
        <div
          className={cx(styles.NodeType, {
            [styles.NodeTypeHoverable]: !!node.definition.parent,
          })}
          style={{
            color: theme.colors.node.types[node.definition.type],
          }}
          onClick={() => {
            centerType(node.definition);
          }}
        >
          {node.definition.type}
        </div>
      </div>
      {unfold &&
        nodeInputs.map((n, index) => (
          <NodeComponent
            key={n.id}
            node={n}
            centerNode={centerNode}
            centerType={centerType}
            indentLevel={indentLevel + 1}
            selectedNodeIds={selectedNodeIds}
            searchPhrase={searchPhrase}
            unfoldBySearch={unfoldBySearch?.inputs?.find((input) => input.id === n.id)}
            onChangeUnfolded={onChangeUnfolded}
          />
        ))}
      {unfold && showRelatives && <div className={styles.NodeSpacer} />}
      {showRelatives &&
        relatives &&
        relatives.map((n) => (
          <NodeComponent
            key={n.id}
            node={n}
            centerNode={centerNode}
            centerType={centerType}
            indentLevel={indentLevel + 1}
            selectedNodeIds={selectedNodeIds}
            searchPhrase={searchPhrase}
            onChangeUnfolded={() => {}}
          />
        ))}
    </>
  );
};

interface FilterBlockProps {
  name: string;
  onClick: () => void;
  color: string;
  active?: boolean;
}

const FilterBlock = ({ name, onClick, active, color }: FilterBlockProps) => (
  <div onClick={onClick} style={{ color }} className={cx(styles.FilterBlock, { active })}>
    {name}
  </div>
);

export const Explorer = ({ controller, selectedNodes }: ExplorerProps) => {
  const [phrase, setPhrase] = useState<string>('');
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  const [resultNodes, setResultNodes] = useState<Node<{}>[]>([]);
  const [expandTree, setExpandTree] = useState<(Node<{}> | null)[]>([]);
  const [unfoldedNodeIdList, setUnfoldedNodeIdList] = useState<string[]>([]);

  useEffect(() => {
    let currentRootNodes = controller.nodes.filter((n) => n.definition.root);
    currentRootNodes.sort((a, b) => (a.name > b.name ? 1 : -1));

    if (selectedFilters.length > 0) {
      currentRootNodes = currentRootNodes.filter((n) => selectedFilters.includes(n.definition.type));
    }

    if (phrase.length > 0) {
      const sanitizedPhrase = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      currentRootNodes = currentRootNodes.filter((n) => getQueryMatchingNodeTree(n, sanitizedPhrase));
      const searchExpandTree = currentRootNodes.map((n) => getSearchExpandTree(n, sanitizedPhrase));
      setExpandTree(searchExpandTree);
    } else {
      setExpandTree([]);
    }

    setResultNodes(currentRootNodes);
  }, [phrase, selectedFilters]);

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
        controller.centerOnNodeByID(nextSelectedNode.id);
      }
    }
  };

  useEffect(() => {
    inputEl.current?.focus();
  }, [unfoldedNodeIdList]);

  useEffect(() => {
    const currentExpandTree = resultNodes.map((rn) => getSelectedExpandTree(rn, selectedNodes));
    setExpandTree(currentExpandTree);
  }, [selectedNodes]);

  return (
    <div
      className={styles.Background}
      data-cy={cypressGet(c, 'sidebar', 'explorer', 'name')}
      onKeyDown={onInputKeyDown}
      tabIndex={0}
    >
      <TitleOfPane>Explorer</TitleOfPane>
      <div className={styles.Title}>
        <input
          ref={inputEl}
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
      <div className={styles.NodeList}>
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
            relatives={controller.nodes.filter((cn) => cn.definition.type === n.name)}
            indentLevel={0}
            centerNode={(id) => {
              controller.centerOnNodeByID(id);
            }}
            centerType={(definition) => {
              if (definition.parent) {
                const parentNode = controller.nodes.find(
                  (node) => node.definition === definition.parent && node.name === definition.type!,
                );
                if (parentNode) {
                  const { id } = parentNode;
                  controller.centerOnNodeByID(id);
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
