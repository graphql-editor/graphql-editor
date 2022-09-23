import * as React from 'react';
import { SVGProps } from 'react';

export const Error = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill={props.fill}
    viewBox="0 0 240 240"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={120} cy={120} r={120} fill={props.fill} />
    <rect x={98} y={30} width={44} height={122} rx={22} fill="#fff" />
    <circle cx={120} cy={193} r={22} fill="#fff" />
  </svg>
);
