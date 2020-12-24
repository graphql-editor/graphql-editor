import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@/Graf/Node/components';
import { ParserField, OperationType } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
interface NodeOperationsMenuProps {
  node: ParserField;
  hideMenu: () => void;
}
const configureOpts = (node: ParserField) => {
  let { operations = [] } = node.type;
  let opts: Record<string, boolean> = {};
  opts[OperationType.query] = !!operations.includes(OperationType.query);
  opts[OperationType.mutation] = !!operations.includes(OperationType.mutation);
  opts[OperationType.subscription] = !!operations.includes(OperationType.subscription);
  return opts;
};
export const NodeOperationsMenu: React.FC<NodeOperationsMenuProps> = ({ node, hideMenu }) => {
  const { tree, setTree } = useTreesState();
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.operations]);
  return (
    <OptionsMenu
      hideMenu={hideMenu}
      menuName={'Operations'}
      options={opts}
      onCheck={(o) => {
        const turnOff = !!node.type.operations?.includes(o as OperationType);
        tree.nodes.forEach((n) => {
          const { operations } = n.type;
          if (operations) {
            const i = operations.findIndex((to) => to === o);
            if (i !== -1) {
              operations.splice(i, 1);
            }
          }
        });
        if (turnOff) {
          node.type.operations = node.type.operations?.filter((opt) => opt !== o);
        } else {
          node.type.operations = [...(node.type.operations || []), o as OperationType];
        }
        setTree({ ...tree });
      }}
    />
  );
};
