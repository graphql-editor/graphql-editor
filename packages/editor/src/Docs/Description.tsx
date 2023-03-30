import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Main = styled.textarea`
  background: ${({ theme }) => theme.neutral[600]};
  color: ${({ theme }) => theme.text.default};
  padding: 10px;
  font-size: 12px;
  width: 100%;
  border: 0;
  resize: none;
  outline: none;
  cursor: pointer;
  border-radius: 10px;
  font-family: ${fontFamilySans};
  &:focus {
    cursor: auto;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
`;

export const Description: React.FC<{
  value: string;
  onChange: (changedValue: string) => void;
  isLocked?: boolean;
}> = ({ onChange, value, isLocked }) => {
  const [text, setText] = useState(value);
  const DescriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    setText(value);
  }, [value]);
  useEffect(() => {
    if (DescriptionRef.current) {
      DescriptionRef.current.style.height = 'auto';
      DescriptionRef.current.style.height =
        DescriptionRef.current.scrollHeight + 'px';
    }
  }, [DescriptionRef.current]);
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
      autoFocus={true}
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
