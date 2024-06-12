import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import { dataIt } from "@/Models";

const Main = styled.textarea`
  background: ${({ theme }) => theme.neutrals.L6};
  color: ${({ theme }) => theme.text.default};
  padding: 1rem;
  width: 100%;
  border: 0;
  resize: none;
  outline: none;
  cursor: pointer;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  font-family: ${({ theme }) => theme.fontFamilySans};
  font-size: 14px;
  &:focus {
    cursor: auto;
  }
  &::placeholder {
    color: ${({ theme }) => theme.text.disabled};
  }
`;

const MainWrapper = styled.div`
  padding: 0.33rem;
  border: 0;
  border-bottom-color: ${({ theme }) => `${theme.divider.main}`};
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
  const currentRef = useRef(value);
  const destroyRef = useRef(value);
  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (currentRef.current !== destroyRef.current && !isLocked) {
        onChange(destroyRef.current);
      }
    };
  }, []);

  return (
    <MainWrapper {...dataIt("nodeDescription")}>
      <Main
        rows={1}
        data-gramm_editor="false"
        ref={DescriptionRef}
        placeholder="Put your description here"
        onClick={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
        onFocus={(e) => {
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.height = "auto";
          if (isLocked) return;
          if (DescriptionRef.current) {
            currentRef.current = text;
            onChange(text);
          }
        }}
        onChange={(e) => {
          if (isLocked) return;
          setText(e.target.value);
          destroyRef.current = e.target.value;
          e.currentTarget.style.height = "auto";
          e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
        }}
        value={text}
      />
    </MainWrapper>
  );
};
