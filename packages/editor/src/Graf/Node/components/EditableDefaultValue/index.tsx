import React, { useState } from 'react';
import { fontFamily } from '@/vars';
import styled from '@emotion/styled';

const Input = styled.input`
  border: 0;
  background: ${({ theme }) => theme.background.mainFurthest}44;
  border-radius: 4px;
  color: ${({ theme }) => theme.text};
  min-width: 30px;
  font-family: ${fontFamily};
  font-size: 10px;
  text-align: center;
  padding: 2px 0;
`;

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
  const checkEdit = () => {
    if (onChange) {
      if (editedValue !== value) {
        onChange(editedValue);
      }
    }
  };
  return (
    <>
      <Input
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
