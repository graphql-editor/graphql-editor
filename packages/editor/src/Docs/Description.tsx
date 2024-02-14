import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const Main = styled.textarea`
  background: ${({ theme }) => theme.neutrals.L6};
  color: ${({ theme }) => theme.text.default};
  width: 100%;
  margin: 0;
  border: 0;
  padding: 0.5rem;
  resize: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fontFamilySans};
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
      DescriptionRef.current.style.height = "auto";
      DescriptionRef.current.style.height =
        DescriptionRef.current.scrollHeight + "px";
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
        e.currentTarget.style.height = "auto";
        if (DescriptionRef.current) {
          onChange(text);
        }
      }}
      onChange={(e) => {
        setText(e.target.value);
        e.currentTarget.style.height = "auto";
        e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
      }}
      value={text}
    />
  );
};
