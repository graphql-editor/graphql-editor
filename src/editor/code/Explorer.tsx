import cx from 'classnames';
import { Node } from 'graphsource';
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
  indentLevel?: number;
  selectedNodeIds: string[];
  unfoldMaster?: boolean;
}

const NodeComponent = ({
  node,
  centerNode,
  selectedNodeIds,
  indentLevel = 0,
  unfoldMaster = false
}: NodeComponentProps) => {
  const [unfold, setUnfold] = useState<boolean>(false);
  useEffect(() => {
    setUnfold(unfoldMaster);
  }, [unfoldMaster]);
  const nodeInputs = node.inputs ? node.inputs : [];
  const hasInputs = nodeInputs.length > 0;
  return (
    <>
      <div
        className={cx(styles.Node, {
          active: selectedNodeIds.includes(node.id)
        })}
        key={node.id}
        style={{
          marginLeft: indentLevel * 5
        }}
      >
        <div
          className={styles.NodeIcon}
          onClick={() => {
            if (hasInputs) {
              setUnfold(!unfold);
            }
          }}
        >
          {hasInputs ? (
            unfold ? (
              <Icon.Minus size={15} />
            ) : (
              <Icon.Plus size={15} />
            )
          ) : (
            <div style={{ width: 15, height: 15 }} />
          )}
        </div>
        <div className={styles.NodeTitle} onClick={() => centerNode(node.id)}>
          {node.name}
        </div>
        <div
          className={styles.NodeType}
          style={{
            color: theme.colors.node.types[node.definition.type]
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
            indentLevel={indentLevel + 1}
            selectedNodeIds={selectedNodeIds}
          />
        ))}
    </>
  );
};

export const Explorer = ({ controller, selectedNodes }: ExplorerProps) => {
  const [phrase, setPhrase] = useState<string>('');
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const inputEl = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputEl.current!.focus();
  }, []);
  useEffect(() => {
    setSelectedNodeIds(selectedNodes.map((sn) => sn.id));
  }, [selectedNodes.map((sn) => sn.id).join(',')]);

  let rootNodes = controller.nodes.filter((n) => n.definition.root);
  if (phrase.length > 0) {
    rootNodes = rootNodes.filter((n) => n.name.toLowerCase().match(phrase.toLowerCase()));
  }
  rootNodes.sort((a, b) => (a.name > b.name ? 1 : -1));
  return (
    <div className={styles.Background}>
      <TitleOfPane>Explorer</TitleOfPane>
      <input
        ref={inputEl}
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        className={styles.Title}
        placeholder="Search nodes..."
      />
      <div className={styles.NodeList}>
        {rootNodes.map((n) => (
          <NodeComponent
            selectedNodeIds={selectedNodeIds}
            key={n.id}
            centerNode={(id) => {
              setSelectedNodeIds([id]);
              controller.centerOnNodeByID(id);
            }}
            node={n}
          />
        ))}
        <div style={{ marginBottom: 150 }} />
      </div>
    </div>
  );
};
