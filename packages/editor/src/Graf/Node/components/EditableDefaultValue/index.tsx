import React, { useState } from 'react';
import { fontFamilySans, transition } from '@/vars';
import styled from '@emotion/styled';

const Input = styled.input`
  border: 0;
  background: ${({ theme }) => theme.background.mainFurthest}00;
  color: ${({ theme }) => theme.text};
  min-width: 18ch;
  font-family: ${fontFamilySans};
  font-size: 12px;
  text-align: left;
  padding: 0.25rem 1rem;
  outline: 0;
  transition: ${transition};
  border-bottom: 1px solid ${({ theme }) => theme.active}00;
  :focus {
    outline: 0;
    border-bottom: 1px solid ${({ theme }) => theme.active};
  }
`;

interface EditableDefaultValueProps {
  value: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export const EditableDefaultValue: React.FC<EditableDefaultValueProps> = ({
  value,
  onChange,
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
        style={{ width: `${editedValue.length + 5}ch`, ...style }}
        onBlur={checkEdit}
        placeholder="Default value"
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
