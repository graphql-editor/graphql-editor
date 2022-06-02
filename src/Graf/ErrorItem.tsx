import React from 'react';

type ErrorItemProps = {
  error: String;
};

export const ErrorItem: React.FC<ErrorItemProps> = ({ error }) => {
  return <p>{error + 'adasdadadadadadsdasdasda'}</p>;
};
