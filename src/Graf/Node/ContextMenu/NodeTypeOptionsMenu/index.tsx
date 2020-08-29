import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@Graf/Node/components';
import { ParserField, Options } from 'graphql-zeus';
interface NodeTypeOptionsMenuProps {
  node: ParserField;
  onTreeChanged: () => void;
  hideMenu: () => void;
}
const configureOpts = (node: ParserField) => {
  let { options = [] } = node.type;
  let opts: Record<string, boolean> = {};
  opts[Options.required] = !!options.includes(Options.required);
  opts[Options.array] = !!options.includes(Options.array);
  if (opts[Options.array]) {
    opts[Options.arrayRequired] = !!options.includes(Options.arrayRequired);
  }
  return opts;
};
export const NodeTypeOptionsMenu: React.FC<NodeTypeOptionsMenuProps> = ({ node, onTreeChanged, hideMenu }) => {
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.options]);
  return (
    <OptionsMenu
      hideMenu={hideMenu}
      options={opts}
      onCheck={(o) => {
        const turnOff = !!node.type.options?.includes(o as Options);
        if (turnOff) {
          node.type.options = node.type.options?.filter((opt) => opt !== o);
        } else {
          node.type.options = [...(node.type.options || []), o as Options];
        }
        onTreeChanged();
      }}
    />
  );
};
