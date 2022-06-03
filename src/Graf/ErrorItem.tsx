import { useErrorsState, useTheme } from '@/state/containers';
import { themed } from '@/Theming/utils';
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

const ErrorItemWrapper = style({
  marginLeft: 16,
  marginRight: 16,
});

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  const { theme } = useTheme();
  const { setErrorRowNumber } = useErrorsState();

  const getRowNumber = () => parseInt(error.split(',')[1].split(':')[1]) + 1;

  getRowNumber();
  return (
    <div className={ErrorItemWrapper}>
      <p>{error + '}'}</p>
      <button
        className={ButtonStyles(theme)}
        onClick={() => setErrorRowNumber(getRowNumber())}
      >
        Resolve error
      </button>
    </div>
  );
};
