import { style } from 'typestyle';
import { fontFamily } from '@/vars';
import { themed } from '@/Theming/utils';

export const TitleOfPane = themed(
  ({
    colors: {
      code: {
        titleOfPane: { color },
      },
    },
  }) =>
    style({
      padding: `10px 15px`,
      fontFamily,
      fontSize: 12,
      textTransform: 'uppercase',
      color,
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      width: '100%',
      zIndex: 3,
      position: 'absolute',
    }),
);
export enum StatusDotProps {
  sync = 'sync',
  readonly = 'readonly',
}

export const StatusDot = themed(
  ({
    colors: {
      code: { syncStatus },
    },
  }) =>
    style({
      borderRadius: '50%',
      width: 8,
      height: 8,
      background: syncStatus.background,
      $nest: {
        [`&.${StatusDotProps.sync}`]: {
          background: syncStatus.sync,
        },
        [`&.${StatusDotProps.readonly}`]: {
          background: syncStatus.readonly,
        },
      },
    }),
);
