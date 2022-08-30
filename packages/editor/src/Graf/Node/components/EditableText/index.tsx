import React, { useEffect, useState } from 'react';
import { fontFamily } from '@/vars';
import { FIELD_NAME_SIZE } from '@/Graf/constants';
import { useVisualState } from '@/state/containers';
import styled from '@emotion/styled';

const Input = styled.input<{ isError?: boolean }>`
  border: 0;
  background-color: transparent;
  color: ${({ theme, isError }) => (isError ? theme.error : theme.text)};
  min-width: auto;
  padding: 0;
  font-family: ${fontFamily};
  font-size: ${FIELD_NAME_SIZE}px;
`;

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
  const { setDraggingAllowed, _setDraggingAllowed } = useVisualState();
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
        <Input
          autoFocus={focus}
          isError={isError}
          value={editedValue}
          pattern="[_A-Za-z][_0-9A-Za-z]*"
          style={{ width: `${editedValue.length}ch`, ...style }}
          title={isError ? 'Name already exists' : 'rename'}
          onBlur={(e) => {
            checkEdit();
          }}
          onMouseLeave={() => {
            setDraggingAllowed(true);
          }}
          onMouseOver={(e) => {
            setDraggingAllowed(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkEdit();
            }
          }}
          onClick={() => {
            _setDraggingAllowed(false);
          }}
          onChange={(e) => setEditedValue(e.target.value)}
        />
      ) : (
        <span style={{ ...style }}>{editedValue}</span>
      )}
    </>
  );
};
