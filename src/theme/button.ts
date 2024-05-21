import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const formSubmit = defineStyle({
  background: 'primary.300',
  color: 'primary.200',
  fontFamily: `'Roboto', sans-serif`,
  fontWeight: '600',
  borderRadius: '24px',
  fontSize: '24px',

  // let's also provide dark mode alternatives
  _dark: {
    background: 'orange.300',
    color: 'orange.800',
  },
});

const pale = defineStyle({
  border: '1px solid transparent',
  fontFamily: `'Roboto', sans-serif`,
  fontWeight: '600',
  padding: '8px',

  _hover: {
    background: '#eee',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { formSubmit, pale },
});
