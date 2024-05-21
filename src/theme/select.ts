import { selectAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(selectAnatomy.keys);

const flushed = definePartsStyle({
  field: {
    borderBottom: '1px solid',
    borderColor: '#999',
    backgroundColor: 'white',
    _focusWithin: {
      borderColor: '#999',
    },
    _active: {
      borderColor: '#999',
    },
    _focus: {
      borderColor: '#999',
    },
  },
  icon: {
    fontSize: '6xl',
  },
});

export const selectTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'flushed',
  },
  variants: { flushed },
});
