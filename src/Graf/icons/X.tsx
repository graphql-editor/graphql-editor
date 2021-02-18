import React from 'react';
export const X: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#666',
  width = 6,
  height = 6,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 6 6"
      {...props}
    >
      <g fill={fill} clipPath="url(#clip0)">
        <path d="M.51 0L0 .51 5.49 6 6 5.49.51 0z"></path>
        <path d="M5.49 0L0 5.49.51 6 6 .51 5.49 0z"></path>
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H6V6H0z"></path>
        </clipPath>
      </defs>
    </svg>
  );
};
