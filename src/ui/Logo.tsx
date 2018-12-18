import * as React from 'react';

export const Logo = ({
  width = 'auto',
  height = 'auto'
}: {
  width?: 'auto' | number;
  height?: 'auto' | number;
}) => <img src={require('../assets/export/logo@3x.png')} style={{ width, height }} />;
