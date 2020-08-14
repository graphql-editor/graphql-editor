import React, { useState } from 'react';
import { style } from 'typestyle';
import { Colors } from '../Colors';
import { fontFamily } from '../vars';
const Input = style({
  border: 0,
  background: 'transparent',
  color: Colors.grey[0],
  minWidth: 'auto',
  fontFamily: fontFamily,
});
export const EditableText: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value }) => {
  const [isEdited, setIsEdited] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  return (
    <>
      {isEdited ? (
        <input
          autoFocus
          className={Input}
          value={editedValue}
          size={editedValue.length + 1}
          onBlur={() => {
            setIsEdited(false);
          }}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        <span onClick={() => setIsEdited(true)}>{value}</span>
      )}
    </>
  );
};
