import React from 'react';
export const Search: React.FC<React.SVGProps<SVGSVGElement>> = ({
  width = 11,
  height = 11,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 11 11"
      {...props}
    >
      <path
        fill="#666"
        d="M11 9.727L7.772 6.504A4.22 4.22 0 100 4.22a4.22 4.22 0 006.504 3.552l3.223 3.222L11 9.727zM1.136 4.22A3.092 3.092 0 014.22 1.136 3.088 3.088 0 017.305 4.22a3.085 3.085 0 11-6.17 0z"
      ></path>
    </svg>
  );
};
