import { style, keyframes } from 'typestyle';
import { Colors } from './colors';
import * as vars from './vars';

const fadeIn = keyframes({
  '0%': {
    opacity: 0.0
  },
  '100%': {
    opacity: 1.0
  }
});

export const OverlayStyle = style({
  position: 'fixed',
  background: '#000000aa',
  height: '100vh',
  width: '100vw',
  top: 0,
  left: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  animationName: fadeIn,
  animationDuration: '0.5s',
  zIndex: 5
});

export const Dialog = style({
  borderRadius: 10,
  background: Colors.grey[0],
  color: Colors.grey[6],
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20
});

export const Close = style({
  alignSelf: 'flex-end',
  fontSize: 24,
  cursor: 'pointer',
  color: Colors.main[6],
  transition: vars.transition,
  $nest: {
    '&:hover': {
      color: Colors.main[0]
    }
  }
});

export const DialogContent = style({
  textAlign: 'center',
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  width: 800,
  padding: `60px 200px`,
  $nest: {
    p: {
      lineHeight: 2.5,
      fontWeight: 300,
      fontSize: 18
    },
    h2: {
      color: Colors.main[0],
      fontWeight: 700,
      fontSize: 24,
      margin: 0,
      marginBottom: 15
    },
    h3: {
      color: Colors.grey[4],
      fontWeight: 300,
      fontSize: 18,
      margin: 0
    },
    input: {
      border: 0,
      borderBottom: `1px solid ${Colors.main[0]}`,
      padding: `15px 0 5px 0`,
      fontSize: 18,
      background: 'transparent',
      textAlign: 'center',
      $nest: {
        '&.url': {
          width: '100%',
          fontSize: 12
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
