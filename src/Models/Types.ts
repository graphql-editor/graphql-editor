import { NodeDefinition, AcceptedNodeDefinition } from 'graphsource';

export class ScalarTypes {
  static String = 'String';
  static Boolean = 'Boolean';
  static ID = 'ID';
  static Int = 'Int';
  static Float = 'Float';
  static EnumValue = 'EnumValue';
}
export class ObjectTypes {
  static type = 'type';
  static interface = 'interface';
  static input = 'input';
  static enum = 'enum';
  static union = 'union';
  static scalar = 'scalar';
}

interface GraphQLNodeParams {
  argument?: boolean;
  field?: boolean;
  defaultValue?:boolean;
  defaultEnumValue?:boolean;
  unionType?:boolean;
}

export type EditorNodeDefinition = NodeDefinition<GraphQLNodeParams>;

export type AcceptedEditorNodeDefinition = AcceptedNodeDefinition<GraphQLNodeParams>;
