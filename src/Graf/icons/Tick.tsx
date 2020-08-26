import React from 'react';
import { Colors } from '@Colors';
export const Tick = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 5 3">
      <path
        fill={`${Colors.green[0]}`}
        d="M3.834.271L2.119 2.007l-.963-.962-.395.395 1.358 1.362L4.229.663 3.834.271z"
      ></path>
    </svg>
  );
};
