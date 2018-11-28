import * as React from 'react';
import * as styles from '../style/OverlayInput';
export const OverlayInput = ({
  placeholder,
  value,
  onChange,
  options = {}
}: {
  placeholder: string;
  value: string;
  onChange: (e: string) => void;
  options?:React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}) => (
  <input
    type="text"
    value={value}
    className={styles.Input}
    placeholder={placeholder}
    onChange={(e) => {
      onChange(e.target.value);
    }}
    {...options}
  />
);
