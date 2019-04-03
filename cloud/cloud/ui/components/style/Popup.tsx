import { style, keyframes } from 'typestyle';
import { vars, Colors, mix } from '../../../../../src';
import { TOP_BAR_HEIGHT } from '../../../../constants';

const fadeIn = keyframes({
  '0%': {
    opacity: 0.0
  },
  '100%': {
    opacity: 1.0
  }
});
export const DIALOG_WIDTH = 400;
export const Dialog = style({
  position: 'fixed',
  top: TOP_BAR_HEIGHT,
  right: 0,
  animationName: fadeIn,
  animationDuration: '0.5s',
  zIndex: 3,
  background: mix(Colors.grey[9],Colors.main[9]),
  color: Colors.grey[0],
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: `calc(100vh - ${TOP_BAR_HEIGHT}px)`,
  width: DIALOG_WIDTH,
  padding: `10px 20px`
});

export const Close = style({
  alignSelf: 'flex-end',
  fontSize: 24,
  cursor: 'pointer',
  color: Colors.grey[0],
  transition: vars.transition,
  $nest: {
    '&:hover': {
      color: Colors.red[0]
    }
  }
});

export const DialogContent = style({
  textAlign: 'left',
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxWidth: 800,
  $nest: {
    p: {
      lineHeight: 1.5,
      fontWeight: 400,
      fontSize: 12,
      margin: 0,
      marginBottom: 15
    },
    h2: {
      color: Colors.main[0],
      fontWeight: 700,
      fontSize: 24,
      margin: 0,
      marginBottom: 25
    },
    h3: {
      color: Colors.green[1],
      fontWeight: 700,
      fontSize: 14,
      margin: 0,
      marginBottom: 25
    },
    input: {
      border: 0,
      borderBottom: `1px solid ${Colors.main[0]}`,
      padding: `15px 0 5px 0`,
      fontSize: 18,
      background: 'transparent',
      textAlign: 'center',
      color: Colors.main[0],
      $nest: {
        '&.url': {
          width: '100%',
          fontSize: 12
        },
        '&::placeholder': {
          color: Colors.main[0]
        }
      }
    }
  }
});

export const DialogActions = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center'
});
export const DialogProjects = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridGap: 10,
  marginBottom: 50,
  alignSelf: 'stretch'
});
export const DialogCode = style({
  background: Colors.grey[10],
  borderRadius: 4,
  boxShadow: `${Colors.grey[9]} 0 2px 4px`,
  padding: 20,
  alignSelf: 'stretch',
  overflowX: 'hidden',
  maxWidth: DIALOG_WIDTH-40,
  marginBottom: 25
});
