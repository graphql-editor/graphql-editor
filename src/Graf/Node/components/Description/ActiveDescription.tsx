import React, { useEffect, useRef, useState } from 'react';
import { style } from 'typestyle';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Main = themed(
  ({
    colors: {
      text,
      disabled,
      background: { mainFurthest },
    },
  }) =>
    style({
      background: mainFurthest,
      color: text,
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
        },
        '&::placeholder': {
          color: disabled,
        },
      },
    }),
);

export const ActiveDescription: React.FC<{
  value: string;
  onChange: (changedValue: string) => void;
  isLocked?: boolean;
}> = ({ onChange, value, isLocked }) => {
  const [text, setText] = useState(value);
  const { theme } = useTheme();
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
        className={`${Main(theme)} `}
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
      className={`${Main(theme)} `}
      value={text}
    ></textarea>
  );
};
