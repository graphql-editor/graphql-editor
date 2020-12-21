import React, { useRef, useEffect } from 'react';
import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { DOM } from '@/Graf/DOM';

const Main = style({
  background: Colors.grey[9],
  color: Colors.grey[3],
  padding: 10,
  fontSize: 12,
  resize: 'none',
  borderRadius: 4,
  outline: 'none',
  border: `1px solid ${Colors.grey[3]}00`,
  $nest: {
    '&:focus': {
      border: `1px solid ${Colors.grey[3]}`,
    },
  },
});

export const ActiveDescription: React.FC<{
  value: string;
  onChange: (changedValue: string) => void;
  isLocked?: boolean;
}> = ({ onChange, value, isLocked }) => {
  const DescriptionRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (DescriptionRef.current) {
      DescriptionRef.current.style.height = `${DescriptionRef.current.scrollHeight}px`;
    }
  }, [DescriptionRef.current]);
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
        defaultValue={value}
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
      onMouseDown={(e) => {
        DOM.panLock = true;
      }}
      onFocus={(e) => {
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
        DOM.panLock = true;
      }}
      onBlur={() => {
        DOM.panLock = false;
        if (DescriptionRef.current) {
          onChange(DescriptionRef.current.value);
        }
      }}
      onInput={(e) => {
        DOM.panLock = true;
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
      }}
      className={`${Main} `}
      defaultValue={value}
    ></textarea>
  );
};
