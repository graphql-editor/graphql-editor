import * as React from 'react';

export interface IconProps {
  size: number;
}

export const Hide = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-arrow-left"
    viewBox="0 0 24 24"
  >
    <path d="M19 12L5 12"></path>
    <path d="M12 19L5 12 12 5"></path>
  </svg>
);
export const Code = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-code"
    viewBox="0 0 24 24"
  >
    <path d="M16 18L22 12 16 6"></path>
    <path d="M8 6L2 12 8 18"></path>
  </svg>
);
export const FullScreen = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-maximize"
    viewBox="0 0 24 24"
  >
    <path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"></path>
  </svg>
);
