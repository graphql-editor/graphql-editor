import React, { useState, useEffect } from 'react';
import { OptionsMenu } from '@/Graf/Node/components';
import { ParserField, Directive } from 'graphql-zeus';
import { useTreesState } from '@/state/containers/trees';
interface NodeDirectiveOptionsMenuProps {
  node: ParserField;
  hideMenu: () => void;
}
const configureOpts = (node: ParserField) => {
  let { directiveOptions = [] } = node.type;
  let opts: Record<string, boolean> = {};
  Object.keys(Directive).map((k) => {
    const v = Directive[k as keyof typeof Directive];
    opts[v] = !!directiveOptions.includes(v);
  });
  return opts;
};
export const NodeDirectiveOptionsMenu: React.FC<NodeDirectiveOptionsMenuProps> = ({ node, hideMenu }) => {
  const { tree, setTree } = useTreesState();
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.directiveOptions]);
  return (
    <OptionsMenu
      hideMenu={hideMenu}
      options={opts}
      onCheck={(o) => {
        const turnOff = !!node.type.directiveOptions?.includes(o as Directive);
        if (turnOff) {
          node.type.directiveOptions = node.type.directiveOptions?.filter((opt) => opt !== o);
        } else {
          node.type.directiveOptions = [...(node.type.directiveOptions || []), o as Directive];
        }
        setTree({ ...tree });
      }}
    />
  );
};
