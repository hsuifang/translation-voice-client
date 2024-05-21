import { inputAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(inputAnatomy.keys);

const form = definePartsStyle({
  field: {
    border: '1px solid',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderBottomColor: '#999',
    borderRadius: 0,
    fontSize: '20px',
    color: '#222',
    padding: 0,

    // Let's also provide dark mode alternatives
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.800',
    },
  },
  addon: {
    border: '1px solid',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    paddingLeft: 0,
    fontWeight: 600,
    _dark: {
      borderColor: 'gray.600',
      background: 'gray.600',
      color: 'gray.400',
    },
  },
});

export const inputTheme = defineMultiStyleConfig({
  variants: { form },
});
