import React, { useState, useEffect } from "react";
import { OptionsMenu } from "@/Graf/Node/components";
import {
  ParserField,
  compileType,
  getTypeName,
  decompileType,
  FieldType,
} from "graphql-js-tree";
interface NodeTypeOptionsMenuProps {
  node: ParserField;
  hideMenu: () => void;
  onCheck: (f: FieldType) => void;
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
export const NodeTypeOptionsMenu = React.forwardRef<
  HTMLDivElement,
  NodeTypeOptionsMenuProps
>(({ node, hideMenu, onCheck, ...props }, ref) => {
  const [opts, setOpts] = useState(configureOpts(node));
  useEffect(() => {
    setOpts(configureOpts(node));
  }, [node.type.fieldType]);
  return (
    <OptionsMenu
      {...props}
      ref={ref}
      menuName={"Node kind"}
      hideMenu={hideMenu}
      options={opts}
      onCheck={(o) => {
        onCheck(decompileType(o));
      }}
    />
  );
});
