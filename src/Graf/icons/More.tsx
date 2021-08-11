import React from 'react';
export const More: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#fff',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 7 2"
      {...props}
    >
      <circle cx="0.921" cy="0.921" r="0.921" fill={fill}></circle>
      <circle cx="6.079" cy="0.921" r="0.921" fill={fill}></circle>
      <circle cx="3.5" cy="0.921" r="0.921" fill={fill}></circle>
    </svg>
  );
};
