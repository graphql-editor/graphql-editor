import React, { useState } from 'react';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
const Input = themed(
  ({
    colors: {
      background: { mainFurthest },
      text,
    },
  }) =>
    style({
      border: 0,
      background: `${mainFurthest}44`,
      borderRadius: 4,
      color: text,
      minWidth: 30,
      fontFamily: fontFamily,
      fontSize: 10,
      textAlign: 'center',
      padding: `2px 0`,
    }),
);
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
  const { theme } = useTheme();
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
        className={Input(theme)}
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
