import * as React from 'react';

export interface IconProps {
  size: number;
  fill?: string;
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
  ></svg>
);

export const Grid = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-grid"
  >
    <rect x="3" y="3" width="7" height="7"></rect>
    <rect x="14" y="3" width="7" height="7"></rect>
    <rect x="14" y="14" width="7" height="7"></rect>
    <rect x="3" y="14" width="7" height="7"></rect>
  </svg>
);
export const CPU = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-cpu"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
    <rect x="9" y="9" width="6" height="6"></rect>
    <line x1="9" y1="1" x2="9" y2="4"></line>
    <line x1="15" y1="1" x2="15" y2="4"></line>
    <line x1="9" y1="20" x2="9" y2="23"></line>
    <line x1="15" y1="20" x2="15" y2="23"></line>
    <line x1="20" y1="9" x2="23" y2="9"></line>
    <line x1="20" y1="14" x2="23" y2="14"></line>
    <line x1="1" y1="9" x2="4" y2="9"></line>
    <line x1="1" y1="14" x2="4" y2="14"></line>
  </svg>
);

export const Library = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-package"
  >
    <line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

export const Docs = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-file-text"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

export const UpDownArrow = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    width={props.size}
    height={props.size}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7 16V4m0 0L3 8m4-4 4 4m6 0v12m0 0 4-4m-4 4-4-4"
    />
  </svg>
);

export const ToggleCode = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 18 10"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'translateY(1px)' }}
  >
    <path d="M5.35349 1.35326L1.70697 4.99974L5.35346 8.64621C5.40122 8.69234 5.43931 8.74751 5.46551 8.80851C5.49172 8.86951 5.50551 8.93512 5.50609 9.00151C5.50667 9.0679 5.49401 9.13374 5.46887 9.19519C5.44373 9.25664 5.40661 9.31247 5.35966 9.35941C5.31271 9.40636 5.25689 9.44349 5.19544 9.46863C5.13399 9.49377 5.06815 9.50642 5.00176 9.50584C4.93537 9.50526 4.86976 9.49147 4.80876 9.46527C4.74776 9.43906 4.69259 9.40097 4.64646 9.35321L0.646464 5.35322C0.60003 5.3068 0.563196 5.25169 0.538065 5.19104C0.512935 5.13038 0.5 5.06537 0.5 4.99972C0.5 4.93406 0.512935 4.86905 0.538065 4.80839C0.563196 4.74774 0.60003 4.69263 0.646464 4.64621L4.64646 0.646215C4.74076 0.555136 4.86707 0.504739 4.99816 0.505878C5.12926 0.507017 5.25467 0.559602 5.34737 0.652306C5.44008 0.74501 5.49266 0.870416 5.4938 1.00151C5.49494 1.13261 5.44454 1.25891 5.35346 1.35322L5.35349 1.35326ZM12.6465 9.35325C12.6929 9.39969 12.748 9.43652 12.8087 9.46165C12.8693 9.48678 12.9343 9.49971 13 9.49971C13.0656 9.49971 13.1307 9.48678 13.1913 9.46165C13.252 9.43652 13.3071 9.39969 13.3535 9.35325L17.3535 5.35326C17.3999 5.30684 17.4368 5.25173 17.4619 5.19108C17.487 5.13042 17.5 5.06541 17.5 4.99976C17.5 4.9341 17.487 4.86909 17.4619 4.80843C17.4368 4.74778 17.3999 4.69267 17.3535 4.64626L13.3535 0.646255C13.2592 0.555176 13.1329 0.504779 13.0018 0.505918C12.8707 0.507058 12.7453 0.559642 12.6526 0.652346C12.5599 0.74505 12.5073 0.870456 12.5062 1.00155C12.505 1.13265 12.5554 1.25895 12.6465 1.35326L16.293 4.99974L12.6465 8.64621C12.6 8.69263 12.5632 8.74774 12.5381 8.8084C12.5129 8.86905 12.5 8.93407 12.5 8.99973C12.5 9.06539 12.5129 9.1304 12.538 9.19106C12.5632 9.25172 12.6 9.30684 12.6465 9.35325H12.6465Z" />
  </svg>
);

export const RelationView = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 20 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.50001 7.45043V9.00097C3.5007 9.6638 3.76432 10.2993 4.23301 10.768C4.7017 11.2367 5.33718 11.5003 6.00001 11.501H9.50001V14.5515C8.62421 14.6779 7.8288 15.1314 7.27386 15.8206C6.71891 16.5098 6.44562 17.3837 6.50899 18.2663C6.57236 19.1489 6.96768 19.9747 7.61539 20.5776C8.26311 21.1804 9.11514 21.5156 10 21.5156C10.8849 21.5156 11.7369 21.1804 12.3846 20.5776C13.0323 19.9747 13.4277 19.1489 13.491 18.2663C13.5544 17.3837 13.2811 16.5098 12.7262 15.8206C12.1712 15.1314 11.3758 14.6779 10.5 14.5515V11.501H14C14.6628 11.5003 15.2983 11.2367 15.767 10.768C16.2357 10.2993 16.4993 9.6638 16.5 9.00097V7.45043C17.3758 7.32402 18.1712 6.87057 18.7262 6.18135C19.2811 5.49213 19.5544 4.61828 19.491 3.73568C19.4277 2.85309 19.0323 2.02725 18.3846 1.42437C17.7369 0.821493 16.8849 0.486328 16 0.486328C15.1151 0.486328 14.2631 0.821493 13.6154 1.42437C12.9677 2.02725 12.5724 2.85309 12.509 3.73568C12.4456 4.61828 12.7189 5.49213 13.2739 6.18135C13.8288 6.87057 14.6242 7.32402 15.5 7.45043V9.00097C15.4996 9.39866 15.3414 9.77994 15.0602 10.0612C14.779 10.3424 14.3977 10.5005 14 10.501H6.00001C5.60231 10.5005 5.22104 10.3424 4.93983 10.0612C4.65861 9.77994 4.50044 9.39866 4.50001 9.00097V7.45043C5.3758 7.32402 6.17121 6.87057 6.72615 6.18135C7.2811 5.49213 7.55439 4.61828 7.49102 3.73568C7.42765 2.85309 7.03233 2.02725 6.38462 1.42437C5.7369 0.821493 4.88488 0.486328 4.00001 0.486328C3.11514 0.486328 2.26311 0.821493 1.61539 1.42437C0.96768 2.02725 0.57236 2.85309 0.508992 3.73568C0.445624 4.61828 0.718913 5.49213 1.27386 6.18135C1.8288 6.87057 2.62421 7.32402 3.50001 7.45043V7.45043ZM13.5 4.00097C13.5 3.50652 13.6466 3.02317 13.9213 2.61204C14.196 2.20092 14.5865 1.88049 15.0433 1.69127C15.5001 1.50205 16.0028 1.45254 16.4877 1.54901C16.9727 1.64547 17.4181 1.88357 17.7678 2.2332C18.1174 2.58283 18.3555 3.02829 18.452 3.51324C18.5484 3.9982 18.4989 4.50086 18.3097 4.95768C18.1205 5.41449 17.8001 5.80494 17.3889 6.07964C16.9778 6.35435 16.4945 6.50097 16 6.50097C15.3372 6.50027 14.7017 6.23666 14.233 5.76797C13.7643 5.29928 13.5007 4.6638 13.5 4.00097V4.00097ZM12.5 18.001C12.5 18.4954 12.3534 18.9788 12.0787 19.3899C11.804 19.801 11.4135 20.1214 10.9567 20.3107C10.4999 20.4999 9.99723 20.5494 9.51228 20.4529C9.02733 20.3565 8.58187 20.1184 8.23224 19.7687C7.88261 19.4191 7.64451 18.9736 7.54804 18.4887C7.45158 18.0037 7.50109 17.5011 7.69031 17.0443C7.87953 16.5874 8.19996 16.197 8.61108 15.9223C9.0222 15.6476 9.50555 15.501 10 15.501C10.6628 15.5017 11.2983 15.7653 11.767 16.234C12.2357 16.7027 12.4993 17.3381 12.5 18.001V18.001ZM4.00001 1.50097C4.49446 1.50097 4.97781 1.64759 5.38893 1.9223C5.80005 2.197 6.12049 2.58745 6.3097 3.04426C6.49892 3.50108 6.54843 4.00374 6.45197 4.4887C6.35551 4.97365 6.1174 5.41911 5.76777 5.76874C5.41814 6.11837 4.97268 6.35647 4.48773 6.45293C4.00278 6.5494 3.50011 6.49989 3.0433 6.31067C2.58648 6.12145 2.19604 5.80102 1.92133 5.3899C1.64663 4.97877 1.50001 4.49542 1.50001 4.00097C1.5007 3.33814 1.76432 2.70266 2.23301 2.23397C2.7017 1.76528 3.33718 1.50167 4.00001 1.50097V1.50097Z" />
  </svg>
);

export const DiagramView = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 22 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19 10.5H13C12.3372 10.5007 11.7017 10.7643 11.233 11.233C10.7643 11.7017 10.5007 12.3372 10.5 13V19C10.5007 19.6628 10.7643 20.2983 11.233 20.767C11.7017 21.2357 12.3372 21.4993 13 21.5H19C19.6628 21.4993 20.2983 21.2357 20.767 20.767C21.2357 20.2983 21.4993 19.6628 21.5 19V13C21.4993 12.3372 21.2357 11.7017 20.767 11.233C20.2983 10.7643 19.6628 10.5007 19 10.5ZM20.5 19C20.4996 19.3977 20.3414 19.779 20.0602 20.0602C19.779 20.3414 19.3977 20.4996 19 20.5H13C12.6023 20.4996 12.221 20.3414 11.9398 20.0602C11.6586 19.779 11.5004 19.3977 11.5 19V13C11.5004 12.6023 11.6586 12.221 11.9398 11.9398C12.221 11.6586 12.6023 11.5004 13 11.5H19C19.3977 11.5004 19.779 11.6586 20.0602 11.9398C20.3414 12.221 20.4996 12.6023 20.5 13V19ZM15.5 9V8C15.4996 7.60231 15.3414 7.22103 15.0602 6.93982C14.779 6.65861 14.3977 6.50043 14 6.5H8C7.60231 6.50043 7.22103 6.65861 6.93982 6.93982C6.65861 7.22103 6.50043 7.60231 6.5 8V14C6.50043 14.3977 6.65861 14.779 6.93982 15.0602C7.22103 15.3414 7.60231 15.4996 8 15.5H9V16.5H8C7.33717 16.4993 6.70169 16.2357 6.233 15.767C5.76431 15.2983 5.5007 14.6628 5.5 14V8C5.5007 7.33717 5.76431 6.70169 6.233 6.233C6.70169 5.76431 7.33717 5.5007 8 5.5H14C14.6628 5.5007 15.2983 5.76431 15.767 6.233C16.2357 6.70169 16.4993 7.33717 16.5 8V9H15.5ZM0.5 9V3C0.500696 2.33717 0.764312 1.70169 1.233 1.233C1.70169 0.764312 2.33717 0.500696 3 0.5H9C9.66283 0.500696 10.2983 0.764312 10.767 1.233C11.2357 1.70169 11.4993 2.33717 11.5 3V4H10.5V3C10.4996 2.60231 10.3414 2.22103 10.0602 1.93982C9.77897 1.65861 9.39769 1.50043 9 1.5H3C2.60231 1.50043 2.22103 1.65861 1.93982 1.93982C1.65861 2.22103 1.50043 2.60231 1.5 3V9C1.50043 9.39769 1.65861 9.77897 1.93982 10.0602C2.22103 10.3414 2.60231 10.4996 3 10.5H4V11.5H3C2.33717 11.4993 1.70169 11.2357 1.233 10.767C0.764312 10.2983 0.500696 9.66283 0.5 9Z" />
  </svg>
);

export const HierarchyView = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 18 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M1.272 7.34204L7.55081 11.1003C7.98849 11.3632 8.48941 11.5021 8.99996 11.5022C9.51051 11.5023 10.0115 11.3635 10.4493 11.1008L16.7285 7.34155C16.9633 7.20475 17.1581 7.00879 17.2934 6.77322C17.4288 6.53766 17.5 6.27071 17.5 5.99902C17.5 5.72733 17.4288 5.46039 17.2934 5.22482C17.1581 4.98925 16.9633 4.79329 16.7285 4.65649L10.4493 0.898192C10.0116 0.635096 9.51065 0.496094 9.00003 0.496094C8.48941 0.496094 7.98843 0.635096 7.55081 0.898192V0.897702L1.272 4.65649C1.03713 4.79325 0.842239 4.98922 0.70678 5.22484C0.571322 5.46046 0.500035 5.72748 0.500035 5.99927C0.500035 6.27105 0.571322 6.53808 0.70678 6.7737C0.842239 7.00932 1.03713 7.20529 1.272 7.34204ZM1.78567 5.51489L8.06445 1.75614V1.75561C8.34798 1.58865 8.67103 1.50065 9.00007 1.50073C9.3291 1.50082 9.65211 1.58899 9.93555 1.7561L16.2148 5.5144C16.3013 5.56241 16.3733 5.63267 16.4234 5.71788C16.4736 5.80309 16.5 5.90015 16.5 5.99902C16.5 6.09789 16.4736 6.19496 16.4234 6.28017C16.3733 6.36538 16.3013 6.43563 16.2148 6.48364L9.93555 10.2429C9.65205 10.41 9.32898 10.498 8.99993 10.4979C8.67088 10.4978 8.34786 10.4096 8.06445 10.2424L1.78564 6.48364C1.6991 6.43578 1.62696 6.36561 1.57673 6.28043C1.52649 6.19525 1.5 6.09816 1.5 5.99927C1.5 5.90037 1.52649 5.80329 1.57673 5.7181C1.62696 5.63292 1.6991 5.56275 1.78564 5.51489H1.78567ZM0.5 10.9993C0.50044 10.7276 0.571917 10.4607 0.707339 10.2252C0.84276 9.98961 1.03742 9.79357 1.272 9.65649L1.74515 9.37322L2.7189 9.95622L1.78567 10.5149C1.69913 10.5627 1.62699 10.6329 1.57676 10.7181C1.52652 10.8033 1.50003 10.9004 1.50003 10.9993C1.50003 11.0981 1.52652 11.1952 1.57676 11.2804C1.62699 11.3656 1.69913 11.4358 1.78567 11.4836L8.06448 15.2424C8.34789 15.4096 8.67091 15.4978 8.99996 15.4979C9.32901 15.498 9.65208 15.4099 9.93558 15.2429L16.2149 11.4836C16.3013 11.4356 16.3733 11.3654 16.4234 11.2802C16.4736 11.1949 16.5 11.0979 16.5 10.999C16.5 10.9001 16.4736 10.8031 16.4234 10.7179C16.3733 10.6327 16.3013 10.5624 16.2149 10.5144L15.282 9.95614L16.2556 9.3735L16.7285 9.6565C16.9632 9.7933 17.158 9.98926 17.2934 10.2248C17.4287 10.4604 17.5 10.7273 17.5 10.999C17.5 11.2707 17.4287 11.5377 17.2934 11.7732C17.158 12.0088 16.9632 12.2048 16.7285 12.3416L10.4492 16.1008C10.0114 16.3635 9.51044 16.5023 8.99989 16.5022C8.48934 16.5021 7.98842 16.3632 7.55074 16.1004L1.272 12.342C1.03742 12.205 0.842762 12.0089 0.70734 11.7734C0.571919 11.5378 0.500442 11.271 0.5 10.9993ZM0.5 15.9993C0.50044 15.7276 0.571917 15.4607 0.707339 15.2252C0.84276 14.9896 1.03742 14.7936 1.272 14.6565L1.74515 14.3732L2.7189 14.9562L1.78567 15.5149C1.69913 15.5627 1.62699 15.6329 1.57676 15.7181C1.52652 15.8033 1.50003 15.9004 1.50003 15.9993C1.50003 16.0981 1.52652 16.1952 1.57676 16.2804C1.62699 16.3656 1.69913 16.4358 1.78567 16.4836L8.06448 20.2424C8.34789 20.4096 8.67091 20.4978 8.99996 20.4979C9.32901 20.498 9.65208 20.4099 9.93558 20.2429L16.2149 16.4836C16.3013 16.4356 16.3733 16.3654 16.4234 16.2802C16.4736 16.1949 16.5 16.0979 16.5 15.999C16.5 15.9001 16.4736 15.8031 16.4234 15.7179C16.3733 15.6327 16.3013 15.5624 16.2149 15.5144L15.282 14.9561L16.2556 14.3735L16.7285 14.6565C16.9632 14.7933 17.158 14.9893 17.2934 15.2248C17.4287 15.4604 17.5 15.7273 17.5 15.999C17.5 16.2707 17.4287 16.5377 17.2934 16.7732C17.158 17.0088 16.9632 17.2048 16.7285 17.3416L10.4492 21.1008C10.0114 21.3635 9.51044 21.5023 8.99989 21.5022C8.48934 21.5021 7.98842 21.3632 7.55074 21.1004L1.272 17.342C1.03742 17.205 0.842762 17.0089 0.70734 16.7734C0.571919 16.5378 0.500442 16.271 0.5 15.9993Z" />
  </svg>
);

export const DocsView = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 18 22"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12.9395 1.23243C12.7079 0.999423 12.4323 0.814702 12.1288 0.688976C11.8253 0.563249 11.4999 0.49902 11.1714 0.500011H3C2.33717 0.500707 1.70169 0.764323 1.233 1.23301C0.764312 1.7017 0.500696 2.33718 0.5 3.00001V19C0.500696 19.6628 0.764312 20.2983 1.233 20.767C1.70169 21.2357 2.33717 21.4993 3 21.5H15C15.6628 21.4993 16.2983 21.2357 16.767 20.767C17.2357 20.2983 17.4993 19.6628 17.5 19V6.82813C17.5008 6.49972 17.4365 6.1744 17.3108 5.871C17.1851 5.5676 17.0005 5.29214 16.7676 5.06056L12.9395 1.23243ZM11.5 1.53901C11.7773 1.60001 12.0314 1.73894 12.2324 1.93946L16.0606 5.76759C16.2599 5.96934 16.3983 6.22319 16.4599 6.50001H13C12.6023 6.49958 12.221 6.3414 11.9398 6.06019C11.6586 5.77898 11.5004 5.3977 11.5 5.00001V1.53901ZM16.5 19C16.4996 19.3977 16.3414 19.779 16.0602 20.0602C15.779 20.3414 15.3977 20.4996 15 20.5H3C2.60231 20.4996 2.22103 20.3414 1.93982 20.0602C1.65861 19.779 1.50043 19.3977 1.5 19V3.00001C1.50043 2.60232 1.65861 2.22104 1.93982 1.93983C2.22103 1.65862 2.60231 1.50045 3 1.50001H10.5V5.00001C10.5007 5.66284 10.7643 6.29832 11.233 6.76701C11.7017 7.2357 12.3372 7.49932 13 7.50001H16.5V19ZM13 10.5C13.1326 10.5 13.2598 10.5527 13.3536 10.6465C13.4473 10.7402 13.5 10.8674 13.5 11C13.5 11.1326 13.4473 11.2598 13.3536 11.3536C13.2598 11.4473 13.1326 11.5 13 11.5H5C4.86739 11.5 4.74021 11.4473 4.64645 11.3536C4.55268 11.2598 4.5 11.1326 4.5 11C4.5 10.8674 4.55268 10.7402 4.64645 10.6465C4.74021 10.5527 4.86739 10.5 5 10.5H13ZM13.5 14C13.5 14.0657 13.4871 14.1307 13.462 14.1914C13.4369 14.2521 13.4001 14.3072 13.3536 14.3537C13.3072 14.4001 13.2521 14.4369 13.1914 14.462C13.1307 14.4871 13.0657 14.5 13 14.5H5C4.86739 14.5 4.74021 14.4473 4.64645 14.3536C4.55268 14.2598 4.5 14.1326 4.5 14C4.5 13.8674 4.55268 13.7402 4.64645 13.6465C4.74021 13.5527 4.86739 13.5 5 13.5H13C13.0657 13.5 13.1307 13.5129 13.1914 13.538C13.2521 13.5631 13.3072 13.5999 13.3536 13.6464C13.4001 13.6928 13.4369 13.7479 13.462 13.8086C13.4871 13.8693 13.5 13.9343 13.5 14ZM13.5 17C13.5 17.0657 13.4871 17.1307 13.462 17.1914C13.4369 17.2521 13.4001 17.3072 13.3536 17.3536C13.3072 17.4001 13.2521 17.4369 13.1914 17.462C13.1307 17.4871 13.0657 17.5 13 17.5H5C4.86739 17.5 4.74021 17.4473 4.64645 17.3536C4.55268 17.2598 4.5 17.1326 4.5 17C4.5 16.8674 4.55268 16.7402 4.64645 16.6465C4.74021 16.5527 4.86739 16.5 5 16.5H13C13.0657 16.5 13.1307 16.5129 13.1914 16.538C13.2521 16.5631 13.3072 16.5999 13.3536 16.6464C13.4001 16.6928 13.4369 16.7479 13.462 16.8086C13.4871 16.8693 13.5 16.9343 13.5 17Z" />
  </svg>
);

export const DiffView = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 18 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7.9999 19.5H9.9999C10.3976 19.4995 10.7789 19.3414 11.0601 19.0602C11.3413 18.7789 11.4995 18.3977 11.4999 18V11.1552L17.2572 2.79097C17.4023 2.57718 17.4857 2.32758 17.4982 2.06953C17.5108 1.81148 17.4521 1.55495 17.3285 1.32807C17.1864 1.07307 16.9778 0.861389 16.7249 0.715562C16.4721 0.569735 16.1844 0.495226 15.8925 0.499969H2.10732C1.81544 0.495234 1.52775 0.569749 1.27487 0.715578C1.022 0.861408 0.813408 1.07309 0.671317 1.32809C0.547399 1.5564 0.488937 1.8145 0.502378 2.07392C0.515818 2.33335 0.600639 2.58402 0.747487 2.79831L6.4999 11.1552V18C6.50033 18.3977 6.65851 18.7789 6.93972 19.0602C7.22093 19.3414 7.60221 19.4995 7.9999 19.5ZM1.57558 2.23825C1.5309 2.17491 1.50503 2.10022 1.50097 2.02281C1.49691 1.9454 1.51482 1.86842 1.55263 1.80075C1.60913 1.70504 1.69059 1.62649 1.7883 1.57351C1.88601 1.52053 1.99628 1.49511 2.10732 1.49997H15.8925C16.0035 1.49511 16.1138 1.52053 16.2115 1.57351C16.3092 1.62649 16.3907 1.70504 16.4472 1.80075C16.4847 1.86697 16.5029 1.94238 16.4997 2.01842C16.4965 2.09447 16.472 2.16809 16.4291 2.23093L10.5883 10.7163C10.5307 10.7997 10.4999 10.8986 10.4999 11V18C10.4998 18.1325 10.4471 18.2597 10.3534 18.3534C10.2596 18.4472 10.1325 18.4999 9.9999 18.5H7.9999C7.86732 18.4999 7.74019 18.4472 7.64644 18.3534C7.55269 18.2597 7.49999 18.1325 7.4999 18V11C7.49988 10.8986 7.46905 10.7997 7.41152 10.7163L1.57558 2.23825Z" />
  </svg>
);

export const ArrowLeft = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 6 11"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.14629 10.8474L0.146286 5.84736C0.0998533 5.80094 0.0630209 5.74583 0.0378911 5.68518C0.0127613 5.62452 -0.000173812 5.55951 -0.000173809 5.49386C-0.000173806 5.4282 0.0127614 5.36319 0.0378912 5.30254C0.063021 5.24188 0.0998533 5.18677 0.146286 5.14036L5.14629 0.140356C5.24059 0.0492768 5.36689 -0.00112034 5.49799 1.88797e-05C5.62909 0.00115809 5.75449 0.0537425 5.8472 0.146447C5.9399 0.239151 5.99248 0.364557 5.99362 0.495655C5.99476 0.626754 5.94437 0.753055 5.85329 0.847356L1.20681 5.49384L5.8533 10.1403C5.94438 10.2346 5.99477 10.3609 5.99363 10.492C5.99249 10.6231 5.93991 10.7485 5.84721 10.8412C5.7545 10.9339 5.6291 10.9865 5.498 10.9877C5.3669 10.9888 5.2406 10.9384 5.1463 10.8473L5.14629 10.8474Z" />
  </svg>
);

export const SixDots = (props: IconProps) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 10 18"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M0 2.33342C0 2.00378 0.0977484 1.68155 0.280884 1.40746C0.46402 1.13338 0.724317 0.919762 1.02886 0.793616C1.3334 0.66747 1.66852 0.634465 1.99182 0.698773C2.31512 0.763082 2.61209 0.921816 2.84518 1.1549C3.07827 1.38799 3.237 1.68496 3.30131 2.00826C3.36562 2.33157 3.33261 2.66668 3.20647 2.97122C3.08032 3.27576 2.8667 3.53606 2.59262 3.7192C2.31854 3.90233 1.9963 4.00008 1.66667 4.00008C1.22464 4.00008 0.800716 3.82449 0.488155 3.51193C0.175595 3.19937 0 2.77544 0 2.33342ZM1.66667 10.6667C1.9963 10.6667 2.31854 10.569 2.59262 10.3859C2.8667 10.2027 3.08032 9.94243 3.20647 9.63789C3.33261 9.33334 3.36562 8.99823 3.30131 8.67493C3.237 8.35163 3.07827 8.05466 2.84518 7.82157C2.61209 7.58848 2.31512 7.42975 1.99182 7.36544C1.66852 7.30113 1.3334 7.33414 1.02886 7.46028C0.724317 7.58643 0.46402 7.80005 0.280884 8.07413C0.0977484 8.34821 0 8.67045 0 9.00008C0 9.44211 0.175595 9.86603 0.488155 10.1786C0.800716 10.4912 1.22464 10.6667 1.66667 10.6667ZM1.66667 17.3334C1.9963 17.3334 2.31854 17.2357 2.59262 17.0525C2.8667 16.8694 3.08032 16.6091 3.20647 16.3046C3.33261 16 3.36562 15.6649 3.30131 15.3416C3.237 15.0183 3.07827 14.7213 2.84518 14.4882C2.61209 14.2551 2.31512 14.0964 1.99182 14.0321C1.66852 13.9678 1.3334 14.0008 1.02886 14.1269C0.724317 14.2531 0.46402 14.4667 0.280884 14.7408C0.0977484 15.0149 0 15.3371 0 15.6667C0 16.1088 0.175595 16.5327 0.488155 16.8453C0.800716 17.1578 1.22464 17.3334 1.66667 17.3334ZM8.33333 4.00008C8.66297 4.00008 8.9852 3.90233 9.25928 3.7192C9.53337 3.53606 9.74699 3.27576 9.87313 2.97122C9.99928 2.66668 10.0323 2.33157 9.96798 2.00826C9.90367 1.68496 9.74493 1.38799 9.51184 1.1549C9.27876 0.921816 8.98179 0.763082 8.65848 0.698773C8.33518 0.634465 8.00007 0.66747 7.69553 0.793616C7.39098 0.919762 7.13069 1.13338 6.94755 1.40746C6.76442 1.68155 6.66667 2.00378 6.66667 2.33342C6.66667 2.77544 6.84226 3.19937 7.15482 3.51193C7.46738 3.82449 7.89131 4.00008 8.33333 4.00008ZM8.33333 10.6667C8.66297 10.6667 8.9852 10.569 9.25928 10.3859C9.53337 10.2027 9.74699 9.94243 9.87313 9.63789C9.99928 9.33334 10.0323 8.99823 9.96798 8.67493C9.90367 8.35163 9.74493 8.05466 9.51184 7.82157C9.27876 7.58848 8.98179 7.42975 8.65848 7.36544C8.33518 7.30113 8.00007 7.33414 7.69553 7.46028C7.39098 7.58643 7.13069 7.80005 6.94755 8.07413C6.76442 8.34821 6.66667 8.67045 6.66667 9.00008C6.66667 9.44211 6.84226 9.86603 7.15482 10.1786C7.46738 10.4912 7.89131 10.6667 8.33333 10.6667ZM8.33333 17.3334C8.66297 17.3334 8.9852 17.2357 9.25928 17.0525C9.53337 16.8694 9.74699 16.6091 9.87313 16.3046C9.99928 16 10.0323 15.6649 9.96798 15.3416C9.90367 15.0183 9.74493 14.7213 9.51184 14.4882C9.27876 14.2551 8.98179 14.0964 8.65848 14.0321C8.33518 13.9678 8.00007 14.0008 7.69553 14.1269C7.39098 14.2531 7.13069 14.4667 6.94755 14.7408C6.76442 15.0149 6.66667 15.3371 6.66667 15.6667C6.66667 16.1088 6.84226 16.5327 7.15482 16.8453C7.46738 17.1578 7.89131 17.3334 8.33333 17.3334Z" />
  </svg>
);

export const Edit = ({ size, fill }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1.20054 10.932C1.19929 10.9388 1.19248 10.9432 1.19153 10.95L0.484422 15.8998C0.473366 15.9766 0.480373 16.055 0.504885 16.1286C0.529396 16.2023 0.570739 16.2692 0.625632 16.3241C0.680524 16.379 0.747454 16.4204 0.821113 16.4449C0.894771 16.4694 0.973127 16.4764 1.04997 16.4653L5.99971 15.7582C6.00653 15.7573 6.01093 15.7505 6.01771 15.7492C6.10893 15.7326 6.19353 15.6904 6.26159 15.6275C6.26748 15.6221 6.27683 15.6227 6.28249 15.617L16.182 5.71751C16.6501 5.24829 16.913 4.61255 16.913 3.94975C16.913 3.28694 16.6501 2.6512 16.182 2.18198L14.7678 0.767767C14.2985 0.299645 13.6628 0.0367494 13 0.0367494C12.3372 0.0367494 11.7015 0.299645 11.2322 0.767767L1.33274 10.6673C1.32708 10.6729 1.32763 10.6823 1.32229 10.6882C1.25935 10.7562 1.21711 10.8408 1.20054 10.932ZM1.56856 15.3812L2.12202 11.5057C2.5635 11.486 3.00424 11.5585 3.41618 11.7185C3.82812 11.8785 4.20223 12.1225 4.51472 12.435C4.8272 12.7475 5.07121 13.1216 5.23122 13.5336C5.39122 13.9455 5.46372 14.3862 5.44409 14.8277L1.56856 15.3812ZM11.9393 1.47487C12.2209 1.19397 12.6023 1.03621 13 1.03621C13.3977 1.03621 13.7791 1.19397 14.0607 1.47487L15.4749 2.88909C15.7558 3.1706 15.9135 3.55206 15.9135 3.94975C15.9135 4.34744 15.7558 4.72889 15.4749 5.01041L14.4142 6.07107L10.8787 2.53553L11.9393 1.47487ZM10.1716 3.24264L13.7071 6.77817L6.41136 14.0739C6.27421 13.1854 5.85756 12.3637 5.22183 11.7279C4.5861 11.0922 3.76436 10.6755 2.87582 10.5384L10.1716 3.24264Z"
      fill={fill || 'black'}
    />
  </svg>
);
