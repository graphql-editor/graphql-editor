import { OptionsMenu } from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers';
import { Options, ParserField } from 'graphql-js-tree';
import React, { useState } from 'react';

interface NodeChangeFieldTypeMenuProps {
  hideMenu: () => void;
  node: ParserField;
}

const checkOptions = (node: ParserField) => {
  const allRequired =
    node.args?.filter((arg) => arg.type.options?.includes(Options.required))
      ?.length === node.args?.length;
  const allNonRequired =
    node.args?.filter((arg) => !arg.type.options?.includes(Options.required))
      ?.length === node.args?.length;
  let opts: Record<string, boolean> = {};
  opts['required'] = allRequired;
  opts['non-required'] = allNonRequired;
  return opts;
};

export const NodeFieldsRequiredMenu: React.FC<NodeChangeFieldTypeMenuProps> = ({
  hideMenu,
  node,
}) => {
  const [opts, setOpts] = useState<Record<string, boolean>>(checkOptions(node));
  const { setTree, tree } = useTreesState();

  return (
    <OptionsMenu
      options={opts}
      onCheck={(o) => {
        if (o === 'required') {
          node.args?.forEach((arg) => {
            arg.type.options = [];
            arg.type.options.push(Options.required);
          });
        } else if (o === 'non-required') {
          node.args?.forEach((arg) => {
            arg.type.options = arg.type.options?.filter(
              (o) => o !== Options.required,
            );
          });
        }
        setOpts(checkOptions(node));
        const idx = tree.nodes.findIndex((n) => n.name === node.name);
        tree.nodes.splice(idx, 1, node);
        setTree({ nodes: tree.nodes, schema: false });
      }}
      hideMenu={hideMenu}
      menuName={'Mark all fields'}
    />
  );
};
