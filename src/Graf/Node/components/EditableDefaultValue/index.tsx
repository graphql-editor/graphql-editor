import React, { useState } from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { fontFamily } from '@/vars';
const Input = style({
  border: 0,
  background: `${Colors.grey[10]}44`,
  borderRadius: 4,
  color: Colors.grey[0],
  minWidth: 30,
  fontFamily: fontFamily,
  fontSize: 10,
  textAlign: 'center',
  padding: `2px 0`,
});
interface EditableDefaultValueProps {
  value: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  style?: React.CSSProperties;
}
export const EditableDefaultValue: React.FC<EditableDefaultValueProps> = ({
  value,
  onChange,
  autoFocus,
  style = {},
}) => {
  const [editedValue, setEditedValue] = useState(value);
  const [focus, setFocus] = useState(!!autoFocus);
  const checkEdit = () => {
    setFocus(false);
    if (onChange) {
      if (editedValue !== value) {
        onChange(editedValue);
      }
    }
  };
  return (
    <>
      <input
        autoFocus={focus}
        className={Input}
        disabled={!onChange}
        value={editedValue}
        style={{ width: `${editedValue.length + 3}ch`, ...style }}
        onBlur={checkEdit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            checkEdit();
          }
        }}
        onChange={(e) => setEditedValue(e.target.value)}
      />
    </>
  );
};
