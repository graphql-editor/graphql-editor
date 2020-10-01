import { style } from 'typestyle';
import { Colors } from '@/Colors';
import { fontFamily } from '@/vars';

export const TitleOfPane = style({
  padding: `10px 15px`,
  fontFamily,
  fontSize: 12,
  textTransform: 'uppercase',
  color: Colors.grey[4],
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  zIndex: 3,
  position: 'absolute',
});
export enum StatusDotProps {
  sync = 'sync',
  nosync = 'nosync',
  syncing = 'syncing',
  readonly = 'readonly',
}

export const StatusDot = style({
  borderRadius: '50%',
  width: 8,
  height: 8,
  background: Colors.grey[9],
  $nest: {
    [`&.${StatusDotProps.nosync}`]: {
      background: Colors.red[0],
    },
    [`&.${StatusDotProps.sync}`]: {
      background: Colors.green[0],
    },
    [`&.${StatusDotProps.syncing}`]: {
      background: Colors.main[0],
    },
    [`&.${StatusDotProps.readonly}`]: {
      background: Colors.blue[0],
    },
  },
});
