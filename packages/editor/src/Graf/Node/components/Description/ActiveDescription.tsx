import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Main = styled.textarea`
  background: ${({ theme }) => theme.background.mainFurther};
  color: ${({ theme }) => theme.text};
  padding: 10px;
  font-size: 12px;
  border: 0;
  resize: none;
  outline: none;
  cursor: pointer;
  margin: 5px;
  border-radius: 5px;
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
  if (isLocked) {
    if (!value) {
      return <></>;
    }
    return (
      <Main
        disabled={true}
        rows={1}
        data-gramm_editor="false"
        ref={DescriptionRef}
        value={text}
      />
    );
  }
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
        if (DescriptionRef.current) {
          onChange(text);
        }
      }}
      onChange={(e) => {
        setText(e.target.value);
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
      }}
      value={text}
    />
  );
};
