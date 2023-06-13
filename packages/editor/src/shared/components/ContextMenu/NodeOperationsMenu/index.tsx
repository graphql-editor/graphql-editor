import React, { useState, useEffect } from "react";
import { OptionsMenu } from "@/Graf/Node/components";
import { ParserField, OperationType } from "graphql-js-tree";
import { useTreesState } from "@/state/containers/trees";
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
    OperationType.subscription
  );
  return opts;
};
export const NodeOperationsMenu = React.forwardRef<
  HTMLDivElement,
  NodeOperationsMenuProps
>(({ node, hideMenu, ...props }, ref) => {
  const { setOperation, removeOperation } = useTreesState();
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.operations]);
  return (
    <OptionsMenu
      {...props}
      ref={ref}
      hideMenu={hideMenu}
      menuName={"Operations"}
      options={opts}
      onCheck={(o) => {
        node.type.operations?.includes(o as OperationType)
          ? removeOperation(node, o as OperationType)
          : setOperation(node, o as OperationType);
      }}
    />
  );
});

NodeOperationsMenu.displayName = "NodeOperationsMenu";
