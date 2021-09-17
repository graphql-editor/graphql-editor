import { useTheme } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import { style } from 'typestyle';
import React from 'react';

const Main = themed(({ background: { mainFurthest } }) =>
  style({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    background: mainFurthest,
    cursor: 'pointer',
  }),
);
const Message = themed(({ error, background: { mainFurthest } }) =>
  style({
    fontFamily,
    fontSize: 14,
    padding: 30,
    color: error,
    background: mainFurthest,
    border: 0,
    position: 'relative',
    width: `100%`,
    height: '100%',
  }),
);

export const ErrorLock: React.FC<{ onClick: () => void }> = ({
  onClick,
  children,
}) => {
  const { theme } = useTheme();
  return (
    <div className={Main(theme)} onClick={onClick}>
      <textarea disabled className={Message(theme)}>
        {children}
      </textarea>
    </div>
  );
};
