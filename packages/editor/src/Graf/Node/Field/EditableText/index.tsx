import React, { useEffect, useRef, useState } from 'react';
import { fontFamilySans } from '@/vars';
import styled from '@emotion/styled';
import { GRAF_FIELD_NAME_SIZE } from '@/Graf/constants';

const Input = styled.input<{ isError?: boolean }>`
  border: 0;
  background-color: transparent;
  color: ${({ theme, isError }) => (isError ? theme.error : theme.text)};
  min-width: auto;
  padding: 0;
  font-family: ${fontFamilySans};
  font-size: ${GRAF_FIELD_NAME_SIZE}px;
`;

export const EditableText: React.FC<{
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  exclude?: string[];
}> = ({ value, onChange, style = {}, exclude = [] }) => {
  const [editedValue, setEditedValue] = useState('');
  const [isError, setIsError] = useState(false);
  const [w, setW] = useState(20);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const checkEdit = () => {
    inputRef.current?.blur();
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
  useEffect(() => {
    setW(spanRef.current?.offsetWidth || w);
  }, [editedValue, onChange]);
  return (
    <>
      {!!onChange ? (
        <>
          <Input
            ref={inputRef}
            isError={isError}
            value={editedValue}
            pattern="[_A-Za-z][_0-9A-Za-z]*"
            style={{ width: `${w}px`, ...style }}
            title={isError ? 'Name already exists' : 'rename'}
            onBlur={(e) => {
              checkEdit();
            }}
            onClick={(e) => (e.target as any).focus()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                checkEdit();
              }
            }}
            onChange={(e) => setEditedValue(e.target.value)}
          />
          <HiddenSpan style={{ ...style }} ref={spanRef}>
            {editedValue}
          </HiddenSpan>
        </>
      ) : (
        <span style={{ ...style }}>{editedValue}</span>
      )}
    </>
  );
};

const HiddenSpan = styled.span`
  visibility: hidden;
  padding: 0;
  font-family: ${fontFamilySans};
  left: 0;
  position: absolute;
  pointer-events: none;
  font-size: ${GRAF_FIELD_NAME_SIZE}px;
`;
