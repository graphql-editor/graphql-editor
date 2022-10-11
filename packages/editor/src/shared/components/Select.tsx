import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useOnClickOutside } from '@/Graf/Node/hooks';
import { Arrow } from '@/editor/icons';
import { transition } from '@/vars';

const SELECT_HEIGHT = 36;

const Main = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background: ${({ theme }) => theme.background.mainFurther};
  padding-right: 11px;
  font-size: 14px;
  width: 100%;
  max-width: 160px;
`;
const Value = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  min-height: ${SELECT_HEIGHT}px;
  padding: 9px 16px;
  color: ${({ theme }) => theme.text};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  word-break: break-word;
  padding-right: 25px;
`;
const Placeholder = styled.div<{ isOpen?: boolean }>`
  display: flex;
  align-items: center;
  min-height: ${SELECT_HEIGHT}px;
  padding: 9px 16px;
  background: ${({ theme }) => theme.background.mainFurther};
  color: ${({ theme }) => theme.disabled};
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  border-bottom-right-radius: ${({ isOpen }) => (isOpen ? '0px' : '5px')};
  word-break: break-word;
  padding-right: 25px;
`;
const Options = styled.div`
  position: fixed;
  z-index: 100;
  background: ${({ theme }) => theme.background.mainFurther};
  border: ${({ theme }) => theme.background.mainFurther} solid 1px;
  color: ${({ theme }) => theme.text};
  max-height: 300px;
  overflow-y: auto;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top: 0;
  transform: translateY(-3px);
  animation: show 0.25s;

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
const Option = styled.div<{ color?: string }>`
  min-height: ${SELECT_HEIGHT}px;
  padding: 9px 16px;
  transition: ${transition};
  color: ${({ color, theme }) => color || theme.text};
  word-break: break-word;

  &:hover {
    background: ${({ theme }) => theme.background.mainFar};
  }
`;
const DropDownArrowPlacement = styled.div<{ open: boolean }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  color: ${({ theme }) => theme.text};
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  svg {
    transition: transform 0.4s ease;
    transform: ${({ open }) => (open ? 'rotate(180deg)' : 'none')};
  }
`;

const ValueIconContainer = styled.div`
  position: relative;
`;

interface SelectProps<T> {
  value: T;
  placeholder: string;
  empty?: string;
  options: Array<{
    label: string;
    value: T;
    color?: string;
  }>;
  onChange: (value: T) => void;
}

export const Select: React.FC<SelectProps<any>> = ({
  value,
  options,
  onChange,
  placeholder,

  empty = '--------------',
}) => {
  const [open, setOpen] = useState(false);
  const currentValue = options.find((o) => o.value === value);
  const selectRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(selectRef, () => setOpen(false));

  const [selectDimensions, setSelectDimensions] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    if (!selectRef.current) return;
    const { top, left, width, height } =
      selectRef.current.getBoundingClientRect();
    setSelectDimensions({
      top,
      left,
      width,
      height,
    });
  }, [open, selectRef.current]);

  useEffect(() => {
    function getScrollParent(
      node: HTMLDivElement | null,
    ): HTMLDivElement | null {
      if (node == null) {
        return null;
      }

      if (node.scrollHeight > node.clientHeight) {
        return node;
      } else {
        return getScrollParent(node.parentNode as HTMLDivElement);
      }
    }
    const scrollParent = getScrollParent(selectRef.current);

    if (!scrollParent) return;

    const scrollHandler = () => {
      setOpen(false);
    };

    if (open) scrollParent.addEventListener('scroll', scrollHandler);
    if (!open) scrollParent.removeEventListener('scroll', scrollHandler);

    return () => {
      scrollParent.removeEventListener('scroll', scrollHandler);
    };
  }, [selectRef.current, open]);

  return (
    <Main ref={selectRef} onClick={() => setOpen(!open)}>
      <ValueIconContainer>
        {currentValue ? (
          <Value isOpen={open}>{currentValue.label}</Value>
        ) : (
          <Placeholder isOpen={open}>{placeholder}</Placeholder>
        )}
        <DropDownArrowPlacement open={open}>
          <Arrow size={12} />
        </DropDownArrowPlacement>
      </ValueIconContainer>

      {open && (
        <Options
          style={{
            width: selectDimensions.width,
            top: selectDimensions.top + selectDimensions.height,
            left: selectDimensions.left,
          }}
        >
          {empty !== '' && (
            <Option
              onClick={() => {
                setOpen(false);
                onChange(undefined);
              }}
            >
              {empty}
            </Option>
          )}
          {options.map((o) => (
            <Option
              color={o.color}
              key={o.label}
              onClick={() => {
                setOpen(false);
                onChange(o.value);
              }}
            >
              {o.label}
            </Option>
          ))}
        </Options>
      )}
    </Main>
  );
};
