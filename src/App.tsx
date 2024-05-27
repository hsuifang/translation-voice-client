import { Flex, Box } from '@chakra-ui/react';
import Chat from './features/chat';

function App() {
  return (
    <Flex justifyContent="center" alignItems="center" w="100%" height="100dvh">
      <Box h="fit-content" w="100%" height="100%">
        <Chat />
      </Box>
    </Flex>
  );
}

export default App;
