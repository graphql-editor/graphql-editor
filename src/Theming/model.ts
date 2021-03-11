import { StatusDotProps } from '@/editor/code/style/Components';
import { Colors } from '../Colors';
interface GraphQLColors {
  type: string;
  union: string;
  input: string;
  scalar: string;
  interface: string;
  enum: string;
  directive: string;
  extend: string;
  Extend: string;
  String: string;
  Int: string;
  Boolean: string;
  ID: string;
  Float: string;
}

interface MenuColors {
  icon: {
    active: string;
    inactive: string;
    hover: string;
  };
  background: string;
}
//GRAF
interface GrafColors {
  background: string;
  wrapperBackground: string;
  rootExtendNode: {
    color: string;
    borderColor: string;
  };
  node: {
    background: string;
    color: string;
    selected: string;
    gapBar: string;
    shadow: string;
    iconAreaHoverBackground: string;
    scrollbar: {
      inner: string;
      outer: string;
    };
    error: {
      color: string;
    };
    interface: {
      color: string;
    };
    menu: {
      background: string;
      borderColor: string;
      color: string;
      scrollbar: {
        inner: string;
        outer: string;
      };
      item: {
        color: string;
        hover: string;
      };
      radio: {
        color: string;
        activeColor: string;
      };
    };
  };
}
//RELATION
interface RelationColors {
  scrollbar: {
    inner: string;
    outer: string;
  };
  unknownField: {
    color: string;
    whenActiveParentBackground: string;
    whenActiveFieldPortBackground: string;
  };
  searchInput: {
    background: string;
    color: string;
    placeholder: string;
  };
}
//CODE
interface CodeColors {
  synchronize: {
    color: string;
    disabled: string;
    ready: string;
    readyHover: string;
  };
  titleOfPane: {
    color: string;
  };
  syncStatus: Record<StatusDotProps, string> & {
    background: string;
  };
}

interface Colors {
  colors: GraphQLColors;
  backgrounds: GraphQLColors;
  darkBackgrounds: GraphQLColors;
  textColor: string;
  menu: MenuColors;
  graf: GrafColors;
  relation: RelationColors;
  code: CodeColors;
}

export interface EditorTheme {
  colors: Colors;
}
