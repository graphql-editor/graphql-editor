import { useErrorsState, useTheme } from '@/state/containers';
import { themed } from '@/Theming/utils';
import { fontFamily } from '@/vars';
import React from 'react';
import { style } from 'typestyle';

type ErrorItemProps = {
  error: string;
};

const ButtonStyles = themed(({ background: { mainFurthest }, error }) =>
  style({
    backgroundColor: mainFurthest,
    border: `2px solid ${error}`,
    color: error,
    padding: '8px 16px',
    cursor: 'pointer',
  }),
);

const Main = style({
  marginLeft: 16,
  marginRight: 16,
});

const Message = themed(({ error, background: { mainFurthest } }) =>
  style({
    fontFamily,
    height: 180,
    fontSize: 14,
    color: error,
    background: mainFurthest,
    border: 0,
    width: '100%',
  }),
);

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { theme } = useTheme();
  const { setErrorRowNumber } = useErrorsState();

  const getRowNumber = () => parseInt(error.split(',')[1].split(':')[1]) + 1;

  return (
    <div className={Main}>
      <textarea
        disabled
        className={Message(theme)}
        value={error.replaceAll('\\', '') + '}'}
      />
      <button
        className={ButtonStyles(theme)}
        onClick={() => setErrorRowNumber(getRowNumber())}
      >
        Resolve error
      </button>
    </div>
  );
};
