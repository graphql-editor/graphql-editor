import React from 'react';
import { useTheme } from '@/state/containers';
export const Tick: React.FC<React.SVGProps<SVGSVGElement>> = ({
  fill,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="6"
      height="6"
      fill="none"
      viewBox="0 0 5 3"
      {...props}
    >
      <path
        fill={fill || theme.success}
        d="M3.834.271L2.119 2.007l-.963-.962-.395.395 1.358 1.362L4.229.663 3.834.271z"
      ></path>
    </svg>
  );
};
