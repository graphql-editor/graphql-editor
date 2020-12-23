import React, { useEffect, useState } from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { fontFamily } from '@/vars';
import { DOM } from '@/Graf/DOM';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
const Input = style({
  border: 0,
  background: 'transparent',
  color: Colors.grey[0],
  minWidth: 'auto',
  padding: 0,
  fontFamily: fontFamily,
  fontSize: FIELD_NAME_SIZE,
});
export const EditableText: React.FC<{
  value: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  fontSize?: number;
}> = ({ value, onChange, autoFocus, fontSize }) => {
  const [editedValue, setEditedValue] = useState('');
  const [focus, setFocus] = useState(!!autoFocus);
  const checkEdit = () => {
    setFocus(false);
    DOM.panLock = false;
    DOM.keyLock = false;
    if (editedValue && onChange) {
      if (editedValue !== value) {
        onChange(editedValue);
      }
    } else {
      setEditedValue(value);
    }
  };
  useEffect(() => {
    setEditedValue(value);
  }, [value]);
  return (
    <>
      {onChange ? (
        <input
          autoFocus={focus}
          className={Input}
          value={editedValue}
          pattern="[_A-Za-z][_0-9A-Za-z]*"
          style={{ width: `${editedValue.length}ch`, fontSize }}
          onFocus={() => {
            DOM.panLock = true;
            DOM.keyLock = true;
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
        <span style={{ fontSize }}>{editedValue}</span>
      )}
    </>
  );
};
