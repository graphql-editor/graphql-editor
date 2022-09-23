import React from 'react';
export const MoreValues: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill = '#30C1FF',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="9"
      height="8"
      fill="none"
      viewBox="0 0 9 8"
      {...props}
    >
      <path
        fill={fill}
        d="M1.129.813v6.359h.797v.813H0V0h1.926v.813H1.13zM2.574 3.504h1.384v-1.36h1.084v1.36h1.384v.976H5.042v1.36H3.958V4.48H2.574v-.976zM7.074.813V0H9v8H7.074v-.813h.797V.828h-.797V.813z"
      ></path>
    </svg>
  );
};
