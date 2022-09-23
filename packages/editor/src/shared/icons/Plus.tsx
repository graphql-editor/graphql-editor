import React from 'react';
export const Plus: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#fff',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 7 9"
      {...props}
    >
      <path
        fill={fill}
        d="M4.108 3.661h2.776v1.196H4.108v3.145H2.837V4.857H.062V3.661h2.775V.756h1.271V3.66z"
      ></path>
    </svg>
  );
};
