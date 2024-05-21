// 1. Import the extendTheme function
import { extendTheme } from '@chakra-ui/react';
import Tag from './tag';
import { inputTheme } from './input';
import { buttonTheme } from './button';
import { selectTheme } from './select';

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: {
    100: '#9dc3e6',
    200: '#1f4e79',
    300: '#5abfc3',
    400: '#5abfc3',
    500: '#1f4e79',
    600: '#5abfc3',
    700: '#5abfc3',
    800: '#5abfc3',
    900: '#5abfc3',
  },
};

const theme = extendTheme({
  colors,
  fonts: {
    body: `'Roboto', sans-serif`,
  },
  components: {
    Tag,
    Input: inputTheme,
    Button: buttonTheme,
    Select: selectTheme,
  },
});

export default theme;
