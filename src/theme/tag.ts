import { tagAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tagAnatomy.keys);

const md = defineStyle({
  px: '12px',
  py: '4px',
  fontSize: '14px',
  lineHeight: '21px',
  fontWeight: 700,
});

const warning = definePartsStyle({
  container: {
    bg: 'yellow.light',
    color: 'yellow.dark',
  },
});
const info = definePartsStyle({
  container: {
    bg: 'natural.100',
    color: 'natural.800',
  },
});
const light = definePartsStyle({
  container: {
    bg: 'natural.100',
    color: 'natural.500',
  },
});

const tagTheme = defineMultiStyleConfig({
  sizes: {
    md: definePartsStyle({ container: md, label: md }),
  },
  variants: {
    warning,
    info,
    light,
  },
});

export default tagTheme;
