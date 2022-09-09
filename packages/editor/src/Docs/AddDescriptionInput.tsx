import styled from '@emotion/styled';
import React, { useState } from 'react';

const DescriptionInput = styled.input`
  background-color: ${({ theme }) => theme.background.mainFurther};
  border-radius: 5px;
  color: ${({ theme }) => theme.text};
  border: 0;
  width: 60%;
  min-width: 0;
  height: 36px;
  padding: 0 10px;
  font-size: 14px;
  outline: 0;
  position: relative;
  margin: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.background.mainClose};

  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
  &:focus {
    border-bottom-color: ${({ theme }) => theme.background.mainCloser};
  }
`;

type AddDescriptionInputProps = {
  onSubmit: (description: string) => void;
  defaultValue: string;
};

export const AddDescriptionInput: React.FC<AddDescriptionInputProps> = ({
  onSubmit,
  defaultValue,
}) => {
  const [newDescription, setNewDescription] = useState(defaultValue);

  return (
    <DescriptionInput
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onSubmit(newDescription);
        }
      }}
      placeholder="No description"
      type="text"
      value={newDescription}
      onChange={(e) => setNewDescription(e.target.value)}
      onBlur={() => onSubmit(newDescription)}
    />
  );
};
