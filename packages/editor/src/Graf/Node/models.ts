import { ParserField } from 'graphql-js-tree';

export interface FieldProps {
  node: ParserField;
  inputOpen: boolean;
  outputOpen: boolean;
  onInputClick: () => void;
  onOutputClick: () => void;
  inputDisabled?: boolean;
  outputDisabled?: boolean;
  isLocked?: boolean;
  onDelete: () => void;
  onUpdate: (updatedNode: ParserField) => void;
  parentNode: ParserField;
  setParentDraggable?: (drag: boolean) => void;
}
