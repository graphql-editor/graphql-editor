import cx from 'classnames';
import { TypeDefinitionDisplayStrings } from 'graphql-zeus';
import { Node, NodeDefinition } from 'graphsource';
import React, { useEffect, useRef, useState } from 'react';
import { GraphController } from '../../Graph';
import { theme } from '../../Graph/theme';
import * as Icon from '../icons';
import { TitleOfPane } from './Components';
import * as styles from './style/Explorer';
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
  unfoldMaster?: boolean;
}

const NodeComponent = ({
  node,
  centerNode,
  centerType,
  selectedNodeIds,
  relatives,
  indentLevel = 0,
  unfoldMaster = false
}: NodeComponentProps) => {
  const [unfold, setUnfold] = useState<boolean>(false);
  const [showRelatives, setShowRelatives] = useState<boolean>(false);
  useEffect(() => {
    setUnfold(unfoldMaster);
  }, [unfoldMaster]);
  const nodeInputs = node.inputs ? node.inputs : [];
  const hasInputs = nodeInputs.length > 0;
  const hasRelatives = relatives && relatives.length > 0;
  return (
    <>
      <div
        className={cx(styles.Node)}
        key={node.id}
        style={{
          marginLeft: indentLevel * 10
        }}
      >
        {hasInputs ? <div
          className={styles.NodeIcon}
          title={unfold ? "hide fields" : "show fields"}
          onClick={() => {
            if (hasInputs) {
              setUnfold(!unfold);
            }
          }}
        >
          {
            unfold ? (
              <Icon.Minus size={15} />
            ) : (
                <Icon.Plus size={15} />
              )
          }
        </div> : (
            <div
              className={styles.NodeIcon}><div style={{ width: 15, height: 15 }} />
            </div>
          )
        }
        {hasRelatives ? <div title={showRelatives ? "hide usages" : "show usages"} className={styles.NodeIcon} onClick={() => setShowRelatives(!showRelatives)}>
          {showRelatives ? <Icon.ToggleOn size={15} /> : <Icon.ToggleOff size={15} />}
        </div> : (
            <div
              className={styles.NodeIcon}><div style={{ width: 15, height: 15 }} />
            </div>
          )}
        <div
          className={cx(styles.NodeTitle, {
            active: selectedNodeIds.includes(node.id)
          })}
          onClick={() => centerNode(node.id)}
        >
          {node.name}
        </div>
        <div
          className={cx(styles.NodeType, {
            [styles.NodeTypeHoverable]: !!node.definition.parent
          })}
          style={{
            color: theme.colors.node.types[node.definition.type]
          }}
          onClick={() => {
            centerType(node.definition);
          }}
        >
          {node.definition.type}
        </div>
      </div>
      {unfold &&
        nodeInputs.map((n) => (
          <NodeComponent
            key={n.id}
            node={n}
            centerNode={centerNode}
            centerType={centerType}
            indentLevel={indentLevel + 1}
            selectedNodeIds={selectedNodeIds}
          />
        ))}
      {unfold && showRelatives && <div className={styles.NodeSpacer} />}
      {showRelatives && relatives &&
        relatives.map((n) => (
          <NodeComponent
            key={n.id}
            node={n}
            centerNode={centerNode}
            centerType={centerType}
            indentLevel={indentLevel + 1}
            selectedNodeIds={selectedNodeIds}
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
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputEl.current!.focus();
  }, []);
  useEffect(() => {
    setSelectedNodeIds(selectedNodes.map((sn) => sn.id));
  }, [selectedNodes.map((sn) => sn.id).join(',')]);

  let rootNodes = controller.nodes.filter((n) => n.definition.root);
  if (selectedFilters.length > 0) {
    rootNodes = rootNodes.filter((n) => selectedFilters.includes(n.definition.type));
  }
  if (phrase.length > 0) {
    rootNodes = rootNodes.filter((n) => n.name.toLowerCase().match(phrase.toLowerCase()));
  }
  rootNodes.sort((a, b) => (a.name > b.name ? 1 : -1));
  return (
    <div className={styles.Background}>
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
            active: filtersOpen
          })}
          style={{
            ...(selectedFilters.length === 1
              ? {
                color: theme.colors.node.types[selectedFilters[0]]
              }
              : {})
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
        {rootNodes.map((n) => (
          <NodeComponent
            selectedNodeIds={selectedNodeIds}
            key={n.id}
            relatives={controller.nodes.filter((cn) => cn.definition.type === n.name)}
            indentLevel={0}
            centerNode={(id) => {
              setSelectedNodeIds([id]);
              controller.centerOnNodeByID(id);
            }}
            centerType={(definition) => {
              if (definition.parent) {
                const parentNode = controller.nodes.find(
                  (node) => node.definition === definition.parent && node.name === definition.type!
                );
                if (parentNode) {
                  const { id } = parentNode;
                  setSelectedNodeIds([id]);
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
