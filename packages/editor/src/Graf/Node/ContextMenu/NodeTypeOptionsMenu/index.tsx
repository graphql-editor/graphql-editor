import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@/Graf/Node/components';
import { ParserField, Options } from 'graphql-js-tree';
import { useTreesState } from '@/state/containers/trees';
interface NodeTypeOptionsMenuProps {
  node: ParserField;
  hideMenu: () => void;
}

const configureOpts = (node: ParserField) => {
  let { options = [] } = node.type;
  const t = node.type.name;
  const r = !!options.includes(Options.required);
  const a = !!options.includes(Options.array);
  const ar = !!options.includes(Options.arrayRequired);
  const opts: Record<string, boolean> = {
    [`${t}`]: !r && !a && !ar,
    [`${t}!`]: r && !a && !ar,
    [`[${t}]`]: a && !r && !ar,
    [`[${t}!]`]: a && r && !ar,
    [`[${t}!]!`]: r && a && ar,
    [`[${t}]!`]: a && ar && !r,
  };
  return opts;
};
const configureNode = (node: ParserField, optionString: string) => {
  const t = node.type.name;
  const isRequired = [`${t}!`, `[${t}!]`, `[${t}!]!`].includes(optionString);
  const isArray = [`[${t}]`, `[${t}]!`, `[${t}!]`, `[${t}!]!`].includes(
    optionString,
  );
  const isArrayRequired = [`[${t}]!`, `[${t}!]!`].includes(optionString);
  node.type.options = [];
  if (isRequired) node.type.options.push(Options.required);
  if (isArrayRequired) node.type.options.push(Options.arrayRequired);
  if (isArray) node.type.options.push(Options.array);
  return;
};

export const NodeTypeOptionsMenu: React.FC<NodeTypeOptionsMenuProps> = ({
  node,
  hideMenu,
}) => {
  const { tree, setTree } = useTreesState();
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.options]);
  return (
    <OptionsMenu
      menuName={'Node kind'}
      hideMenu={hideMenu}
      options={opts}
      onCheck={(o) => {
        configureNode(node, o);
        setTree({ ...tree });
      }}
    />
  );
};
