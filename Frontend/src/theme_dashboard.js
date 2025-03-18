// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1D3D8F', // for card header and accents
    },
    secondary: {
      main: '#FF644A', // for important text and labels
    },
    background: {
      default: '#0F1E2F', // overall background color
      paper: '#253A63', // for card background
    },
    text: {
      primary: '#FFFFFF', // main text color
      secondary: '#F0F0F0', // secondary text color
    },
  },
});

export default theme;
