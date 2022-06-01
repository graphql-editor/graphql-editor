import React from 'react';

type ErrorItemProps = {
  error: String;
};

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  console.log('dadsasd', error.replaceAll('{', '').replaceAll('}', ''));

  return <div>{error.replaceAll('{', '').replaceAll('}', '')}</div>;
};
