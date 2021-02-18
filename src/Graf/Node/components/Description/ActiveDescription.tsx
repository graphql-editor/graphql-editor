import React, { useEffect, useRef, useState } from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';

const Main = style({
  background: `${Colors.grey[10]}44`,
  color: Colors.grey[3],
  padding: 10,
  fontSize: 12,
  width: '100%',
  border: 0,
  resize: 'none',
  outline: 'none',
  cursor: 'pointer',
  $nest: {
    '&:focus': {
      cursor: 'auto',
      borderBottom: `1px solid ${Colors.grey[0]}11`,
    },
    '&::placeholder': {
      color: `${Colors.grey[0]}99`,
    },
  },
});

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
      <textarea
        disabled={true}
        rows={1}
        data-gramm_editor="false"
        ref={DescriptionRef}
        className={`${Main} `}
        value={text}
      ></textarea>
    );
  }
  return (
    <textarea
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
      className={`${Main} `}
      value={text}
    ></textarea>
  );
};
