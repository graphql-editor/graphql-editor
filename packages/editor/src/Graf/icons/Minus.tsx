import React from 'react';
export const Minus: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="4"
      viewBox="0 0 18 4"
      {...props}
    >
      <path
        fill="#fff"
        d="M0 1C0 0.447715 0.447715 0 1 0H17C17.5523 0 18 0.447715 18 1C18 1.55228 17.5523 2 17 2H1C0.447715 2 0 1.55228 0 1Z"
        transform="scale(2)"
      ></path>
    </svg>
  );
};
