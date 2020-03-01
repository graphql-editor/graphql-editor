import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { theme } from '../../Graph/theme';
import * as Icon from '../icons';
import * as styles from './style/Explorer';
import { scrollToSelectedNode } from '../utils';
import { EditorNode, EditorNodeDefinition } from '../../Models';
import { NodeNameHighlighted } from './NodeNameHighlited';

export interface NodeComponentProps {
  node: EditorNode;
  centerNode: (id: string) => void;
  centerType: (parentDefition: EditorNodeDefinition) => void;
  relatives?: EditorNode[];
  indentLevel?: number;
  selectedNodeIds: string[];
  searchPhrase?: string;
  unfoldBySearch?: EditorNode | null;
  onChangeUnfolded: (node: EditorNode, unfold: boolean) => void;
}
export const NodeComponent = ({
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
