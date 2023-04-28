import React, { useEffect, useRef, useState } from 'react';
import { fontFamilySans } from '@/vars';
import styled from '@emotion/styled';
import { GRAF_FIELD_NAME_SIZE } from '@/Graf/constants';
import { useDraggable } from '@/Graf/state/draggable';

const Input = styled.input<{ isError?: boolean; isEditable?: boolean }>`
  border: 0;
  background-color: transparent;
  min-width: auto;
  padding: 0;
  font-family: ${fontFamilySans};
  font-size: ${GRAF_FIELD_NAME_SIZE}px;
  color: inherit;
`;

export const EditableText: React.FC<{
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
  exclude?: string[];
}> = ({ value, onChange, style = {}, exclude = [] }) => {
  const [editedValue, setEditedValue] = useState('');
  const { setDraggable } = useDraggable();
  const [isError, setIsError] = useState(false);
  const [w, setW] = useState(20);
  const spanRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const constantValueRef = useRef<string>(value);
  const valueRef = useRef<string>(value);
  const genericId = useRef(Math.random().toString(16));
  const checkEdit = () => {
    constantValueRef.current = editedValue;
    inputRef.current?.blur();
    setDraggable(true);
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
    return () => {
      if (constantValueRef.current !== valueRef.current && onChange) {
        //value was not edited on blur
        onChange(valueRef.current);
      }
    };
  }, []);
  useEffect(() => {
    setIsError(exclude.includes(editedValue));
  }, [editedValue]);
  useEffect(() => {
    setEditedValue(value);
  }, [value]);
  useEffect(() => {
    if (spanRef.current?.offsetWidth) {
      setW(spanRef.current.offsetWidth);
    }
  }, [editedValue]);
  return (
    <>
      {onChange ? (
        <>
          <Input
            id={genericId.current}
            ref={inputRef}
            isError={isError}
            value={editedValue}
            pattern="[_A-Za-z][_0-9A-Za-z]*"
            style={{ width: `${w}px`, ...style }}
            title={isError ? 'Name already exists' : 'rename'}
            onFocus={() => setDraggable(false)}
            onMouseDown={() => setDraggable(false)}
            onBlur={(e) => {
              checkEdit();
            }}
            onClick={(e) => (e.target as any).focus()}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                inputRef?.current?.blur();
              }
            }}
            onChange={(e) => {
              setEditedValue(e.target.value);
              valueRef.current = e.target.value;
            }}
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
