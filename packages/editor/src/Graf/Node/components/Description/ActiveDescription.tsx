import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { fontFamilySans } from '@/vars';

const Main = styled.textarea`
  background: ${({ theme }) => theme.background.mainFurthest};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
  width: 100%;
  border: 0;
  resize: none;
  outline: none;
  cursor: pointer;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  font-family: ${fontFamilySans};
  font-size: 14px;
  &:focus {
    cursor: auto;
  }
  &::placeholder {
    color: ${({ theme }) => theme.disabled};
  }
`;

const MainWrapper = styled.div`
  padding: 0.33rem;
  border: 0;
  border-bottom-color: ${({ theme }) => theme.active};
  border-bottom-width: 1px;
  border-bottom-style: solid;
  display: flex;
  align-items: center;
`;
export const ActiveDescription: React.FC<{
  value: string;
  onChange: (changedValue: string) => void;
  isLocked?: boolean;
}> = ({ onChange, value, isLocked }) => {
  const [text, setText] = useState(value);
  const DescriptionRef = useRef<HTMLTextAreaElement>(null);
  const destroyRef = useRef(value);
  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (value !== destroyRef.current && !isLocked) {
        onChange(destroyRef.current);
      }
    };
  }, []);

  return (
    <MainWrapper>
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
            destroyRef.current = text;
            onChange(text);
          }
        }}
        onChange={(e) => {
          if (isLocked) return;
          setText(e.target.value);
          destroyRef.current = e.target.value;
          e.currentTarget.style.height = 'auto';
          e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
        }}
        value={text}
      />
    </MainWrapper>
  );
};
