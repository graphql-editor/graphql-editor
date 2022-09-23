import { OptionsMenu } from '@/Graf/Node/components';
import { useTreesState } from '@/state/containers';
import { Options, ParserField, compileType } from 'graphql-js-tree';
import React, { useState } from 'react';

interface NodeChangeFieldTypeMenuProps {
  hideMenu: () => void;
  node: ParserField;
}

const checkOptions = (node: ParserField) => {
  const allRequired = node.args.every(
    (arg) => arg.type.fieldType.type === Options.required,
  );
  const allNonRequired = node.args.every(
    (arg) => arg.type.fieldType.type !== Options.required,
  );
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
            const argType = compileType(arg.type.fieldType);
            if (!argType.endsWith('!')) {
              arg.type.fieldType = {
                type: Options.required,
                nest: arg.type.fieldType,
              };
            }
          });
        } else if (o === 'non-required') {
          node.args?.forEach((arg) => {
            if (arg.type.fieldType.type === Options.required) {
              arg.type.fieldType = {
                ...arg.type.fieldType.nest,
              };
            }
          });
        }
        setOpts(checkOptions(node));
        const idx = tree.nodes.findIndex((n) => n.name === node.name);
        tree.nodes.splice(idx, 1, node);
        setTree({ nodes: tree.nodes }, false);
      }}
      hideMenu={hideMenu}
      menuName={'Mark all fields'}
    />
  );
};
