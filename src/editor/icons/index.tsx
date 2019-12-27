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

export const Show = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-arrow-right"
    viewBox="0 0 24 24"
  >
    <path d="M5 12L19 12"></path>
    <path d="M12 5L19 12 12 19"></path>
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
export const Layers = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-layers"
    viewBox="0 0 24 24"
  >
    <path d="M12 2L2 7 12 12 22 7 12 2z"></path>
    <path d="M2 17L12 22 22 17"></path>
    <path d="M2 12L12 17 22 12"></path>
  </svg>
);

export const Eye = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-eye"
    viewBox="0 0 24 24"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

export const EyeOff = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-eye-off"
    viewBox="0 0 24 24"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"></path>
    <path d="M1 1L23 23"></path>
  </svg>
);

export const Trash = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-trash-2"
    viewBox="0 0 24 24"
  >
    <path d="M3 6L5 6 21 6"></path>
    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
    <path d="M10 11L10 17"></path>
    <path d="M14 11L14 17"></path>
  </svg>
);

export const Settings = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-settings"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"></path>
  </svg>
);

export const Plus = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-plus-square"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    <path d="M12 8L12 16"></path>
    <path d="M8 12L16 12"></path>
  </svg>
);

export const Minus = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-minus-square"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
    <path d="M8 12L16 12"></path>
  </svg>
);

export const Play = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-play-circle"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M10 8L16 12 10 16 10 8z"></path>
  </svg>
);

export const Filter = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-filter"
    viewBox="0 0 24 24"
  >
    <path d="M22 3L2 3 10 12.46 10 19 14 21 14 12.46 22 3z"></path>
  </svg>
);

export const X = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-x"
    viewBox="0 0 24 24"
  >
    <path d="M18 6L6 18"></path>
    <path d="M6 6L18 18"></path>
  </svg>
);
export const ToggleOff = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-toggle-left"
    viewBox="0 0 24 24"
  >
    <rect width="22" height="14" x="1" y="5" rx="7" ry="7"></rect>
    <circle cx="8" cy="12" r="3"></circle>
  </svg>
);

export const ToggleOn = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-toggle-right"
    viewBox="0 0 24 24"
  >
    <rect width="22" height="14" x="1" y="5" rx="7" ry="7"></rect>
    <circle cx="16" cy="12" r="3"></circle>
  </svg>
);
export const Lock = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    className="feather feather-lock"
    viewBox="0 0 24 24"
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0110 0v4"></path>
  </svg>
);
