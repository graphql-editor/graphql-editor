import { style } from 'typestyle';
import React, { useEffect } from 'react';
import { themed } from '@/Theming/utils';
import { useTheme } from '@/state/containers';

const Main = themed(({ text, background: { mainFurthest, mainClose } }) =>
  style({
    color: text,
    maxHeight: 200,
    overflowY: 'auto',
    scrollbarColor: `${mainClose} ${mainFurthest}`,
    scrollSnapType: 'y mandatory',
  }),
);

interface MenuScrollingAreaProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  controls?: {
    arrowDown?: () => void;
    arrowUp?: () => void;
  };
}

export const MenuScrollingArea: React.FC<MenuScrollingAreaProps> = ({
  children,
  controls,
  ...props
}) => {
  const { theme } = useTheme();
  useEffect(() => {
    function downHandler(e: KeyboardEvent) {
      const { key } = e;
      if (key === 'ArrowDown') {
        e.preventDefault();
        controls?.arrowDown?.();
      }
      if (key === 'ArrowUp') {
        e.preventDefault();
        controls?.arrowUp?.();
      }
    }
    window.addEventListener('keydown', downHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
  return (
    <div className={Main(theme)} {...props}>
      {children}
    </div>
  );
};
