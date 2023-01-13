import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@/Graf/Node/components';
import {
  ParserField,
  compileType,
  getTypeName,
  decompileType,
  TypeDefinition,
} from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
interface NodeTypeOptionsMenuProps {
  node: ParserField;
  parentNode: ParserField;
  hideMenu: () => void;
}

const configureOpts = (node: ParserField) => {
  const theType = compileType(node.type.fieldType);
  const t = getTypeName(node.type.fieldType);
  const opts: Record<string, boolean> = {
    [`${t}`]: theType === `${t}`,
    [`${t}!`]: theType === `${t}!`,
    [`[${t}]`]: theType === `[${t}]`,
    [`[${t}!]`]: theType === `[${t}!]`,
    [`[${t}!]!`]: theType === `[${t}!]!`,
    [`[${t}]!`]: theType === `[${t}]!`,
  };
  return opts;
};
const configureNode = (node: ParserField, optionString: string) => {
  node.type.fieldType = decompileType(optionString);
  return;
};

export const NodeTypeOptionsMenu = React.forwardRef<
  HTMLDivElement,
  NodeTypeOptionsMenuProps
>(({ node, parentNode, hideMenu, ...props }, ref) => {
  const { updateNode, allNodes } = useTreesState();
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.fieldType]);
  return (
    <OptionsMenu
      {...props}
      ref={ref}
      menuName={'Node kind'}
      hideMenu={hideMenu}
      options={opts}
      onCheck={(o) => {
        if (parentNode.data.type === TypeDefinition.InterfaceTypeDefinition) {
          const nodesWithThisInterface = allNodes.nodes.filter((el) =>
            el.interfaces.includes(parentNode.name),
          );
          nodesWithThisInterface.forEach((n) => {
            const foundNode = n.args.find((arg) => arg.name === node.name)!;
            configureNode(foundNode, o);
            updateNode(n);
          });
        }

        configureNode(node, o);
        updateNode(node);
      }}
    />
  );
});
