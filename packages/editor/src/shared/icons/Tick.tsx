import React from 'react';
export const Tick: React.FC<React.SVGProps<SVGSVGElement>> = ({ ...props }) => {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 8l2 2 3.75-4.333" strokeLinecap="round" />
    </svg>
  );
};
