import { Box, SimpleGrid } from '@chakra-ui/react';
// @ts-ignore
import styles from './animation.module.css';

const VoiceAnimation = () => {
  return (
    <SimpleGrid bottom="0" gap={1} templateColumns="repeat(5, 1fr)" width="75px" className="bubble-animation">
      <Box w="10px" h="10px" bg="blue.100" borderRadius="50%"></Box>
      <Box w="10px" h="10px" bg="blue.100" borderRadius="50%"></Box>
      <Box w="10px" h="10px" bg="blue.100" borderRadius="50%"></Box>
      {/* <Box w="10px" h="10px" bg="blue.100" borderRadius="50%"></Box>
      <Box w="10px" h="10px" bg="blue.100" borderRadius="50%"></Box> */}
    </SimpleGrid>
  );
};

export default VoiceAnimation;
