import React, { useEffect, useState } from 'react';
import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import cx from 'classnames';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';
const Input = themed(({ colors: { text } }) =>
  style({
    border: 0,
    background: 'transparent',
    color: text,
    minWidth: 'auto',
    padding: 0,
    fontFamily: fontFamily,
    fontSize: FIELD_NAME_SIZE,
  }),
);
const InputIsError = themed(({ colors: { error } }) =>
  style({
    color: error,
  }),
);
export const EditableText: React.FC<{
  value: string;
  onChange?: (value: string) => void;
  autoFocus?: boolean;
  style?: React.CSSProperties;
  exclude?: string[];
}> = ({ value, onChange, autoFocus, style = {}, exclude = [] }) => {
  const [editedValue, setEditedValue] = useState('');
  const [focus, setFocus] = useState(!!autoFocus);
  const [isError, setIsError] = useState(false);
  const { theme } = useTheme();
  const checkEdit = () => {
    setFocus(false);
    if (isError) {
      setEditedValue(value);
      return;
    }
    if (editedValue && onChange) {
      if (editedValue !== value) {
        onChange(editedValue);
      }
    } else {
      setEditedValue(value);
    }
  };
  useEffect(() => {
    setIsError(exclude.includes(editedValue));
  }, [editedValue]);
  useEffect(() => {
    setEditedValue(value);
  }, [value]);
  return (
    <>
      {onChange ? (
        <input
          autoFocus={focus}
          className={cx(Input(theme), {
            [InputIsError(theme)]: isError,
          })}
          value={editedValue}
          pattern="[_A-Za-z][_0-9A-Za-z]*"
          style={{ width: `${editedValue.length}ch`, ...style }}
          title={isError ? 'Name already exists' : 'rename'}
          onBlur={checkEdit}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkEdit();
            }
          }}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        <span style={{ ...style }}>{editedValue}</span>
      )}
    </>
  );
};
