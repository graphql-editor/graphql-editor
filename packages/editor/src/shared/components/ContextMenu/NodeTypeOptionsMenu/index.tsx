import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@/Graf/Node/components';
import {
  ParserField,
  compileType,
  getTypeName,
  decompileType,
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
  const { updateNode } = useTreesState();
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
        configureNode(node, o);
        updateNode(node, parentNode);
      }}
    />
  );
});
