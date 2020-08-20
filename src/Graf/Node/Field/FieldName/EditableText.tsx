import React, { useState } from 'react';
import { style } from 'typestyle';
import { Colors } from '@Colors';
import { fontFamily } from '@vars';
import { DOM } from '@Graf/DOM';
const Input = style({
  border: 0,
  background: 'transparent',
  color: Colors.grey[0],
  minWidth: 'auto',
  padding: 0,
  fontFamily: fontFamily,
  fontSize: 10,
});
export const EditableText: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const checkEdit = () => {
    DOM.panLock = false;
    if (editedValue) {
      onChange(editedValue);
    } else {
      setEditedValue(value);
    }
    setIsEdited(false);
  };
  return (
    <>
      {isEdited ? (
        <input
          autoFocus
          className={Input}
          value={editedValue}
          size={editedValue.length + 1}
          onFocus={() => {
            DOM.panLock = true;
          }}
          onBlur={checkEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkEdit();
            }
          }}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        <span onClick={() => setIsEdited(true)}>{editedValue}</span>
      )}
    </>
  );
};
