// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    fontSize: 14, // Base font size, affecting 1rem
    h1: { fontSize: '2.125rem' }, // smaller than the default MUI h1
    h2: { fontSize: '1.75rem' },
    h3: { fontSize: '1.5rem' },
    h4: { fontSize: '1.25rem' },
    h5: { fontSize: '1rem' },
    h6: { fontSize: '0.875rem' },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.75rem' },
    subtitle1: { fontSize: '0.875rem' },
    subtitle2: { fontSize: '0.75rem' },
    button: { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem' },
    overline: { fontSize: '0.625rem' },
  },
});

export default theme;
