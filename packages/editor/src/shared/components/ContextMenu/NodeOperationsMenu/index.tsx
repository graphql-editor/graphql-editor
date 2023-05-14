import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@/Graf/Node/components';
import { ParserField, OperationType } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
interface NodeOperationsMenuProps {
  node: ParserField;
  hideMenu: () => void;
}
const configureOpts = (node: ParserField) => {
  const { operations = [] } = node.type;
  const opts: Record<string, boolean> = {};
  opts[OperationType.query] = !!operations.includes(OperationType.query);
  opts[OperationType.mutation] = !!operations.includes(OperationType.mutation);
  opts[OperationType.subscription] = !!operations.includes(
    OperationType.subscription,
  );
  return opts;
};
export const NodeOperationsMenu = React.forwardRef<
  HTMLDivElement,
  NodeOperationsMenuProps
>(({ node, hideMenu, ...props }, ref) => {
  const { tree, setTree } = useTreesState();
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.operations]);
  return (
    <OptionsMenu
      {...props}
      ref={ref}
      hideMenu={hideMenu}
      menuName={'Operations'}
      options={opts}
      onCheck={(o) => {
        const turnOff = !!node.type.operations?.includes(o as OperationType);
        console.log(turnOff, node);
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
          node.type.operations = node.type.operations?.filter(
            (opt) => opt !== o,
          );
        } else {
          node.type.operations = [
            ...(node.type.operations || []),
            o as OperationType,
          ];
        }
        console.log(tree.nodes.filter((n) => n.type.operations));
        setTree({ ...tree });
      }}
    />
  );
});
