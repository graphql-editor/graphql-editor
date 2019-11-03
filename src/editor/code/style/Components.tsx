import { style } from 'typestyle';
import { Colors, mix } from '../../../Colors';
import { fontFamily } from '../../../vars';

export const TitleOfPane = style({
  padding: `10px 15px`,
  fontFamily,
  fontSize: 13,
  textTransform: 'uppercase',
  color: Colors.grey[4],
  background: mix(Colors.grey[8], Colors.grey[9]),
  letterSpacing: 1,
  display: 'flex',
  alignItems: 'center'
});
export enum StatusDotProps {
  sync = 'sync',
  nosync = 'nosync',
  syncing = 'syncing'
}

export const StatusDot = style({
  borderRadius: '50%',
  width: 8,
  height: 8,
  background: Colors.grey[9],
  $nest: {
    [`&.${StatusDotProps.nosync}`]: {
      background: Colors.red[0]
    },
    [`&.${StatusDotProps.sync}`]: {
      background: Colors.green[0]
    },
    [`&.${StatusDotProps.syncing}`]: {
      background: Colors.main[0]
    }
  }
});
