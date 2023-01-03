import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Main = styled.textarea`
  background: ${({ theme }) => theme.background.mainFurthest};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 12px;
  border: 0;
  resize: none;
  outline: none;
  cursor: pointer;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border-color: ${({ theme }) => theme.active};
  border-width: 1px;
  font-family: ${fontFamilySans};
  &:focus {
    cursor: auto;
  }
  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;

export const ActiveDescription: React.FC<{
  value: string;
  onChange: (changedValue: string) => void;
  isLocked?: boolean;
}> = ({ onChange, value, isLocked }) => {
  const [text, setText] = useState(value);
  const DescriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <Main
      rows={1}
      data-gramm_editor="false"
      ref={DescriptionRef}
      placeholder="Put your description here"
      onClick={(e) => e.stopPropagation()}
      onMouseMove={(e) => e.stopPropagation()}
      onFocus={(e) => {
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
      }}
      onBlur={(e) => {
        e.currentTarget.style.height = 'auto';
        if (isLocked) return;
        if (DescriptionRef.current) {
          onChange(text);
        }
      }}
      onChange={(e) => {
        if (isLocked) return;
        setText(e.target.value);
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
      }}
      value={text}
    />
  );
};
