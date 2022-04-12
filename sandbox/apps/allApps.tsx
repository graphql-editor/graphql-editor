import React from 'react';
import * as apps from '../apps';
import { DarkTheme } from '@/index';

export const allApps = () => {
  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingTop: 32,
        backgroundColor: DarkTheme.contra,
        overflowY: 'auto',
      }}
    >
      <div
        style={{
          height: '40%',
          width: '40%',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {Object.keys(apps).map((app) => (
          <a
            style={{
              width: '12vh',
              height: '12vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: 8,
              color: DarkTheme.backgrounds.String,
              border: `1px solid ${DarkTheme.disabled}`,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
            href={`/?a=${app}`}
          >
            {app}
          </a>
        ))}
      </div>
    </div>
  );
};
