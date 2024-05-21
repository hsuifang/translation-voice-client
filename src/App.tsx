import { Flex, Box } from '@chakra-ui/react';
import Chat from './features/chat/Chat';

function App() {
  return (
    <Flex h="100vh" justifyContent={'center'} alignItems={'center'}>
      <Box p="20px" h="fit-content" w="100%">
        <Chat />
      </Box>
    </Flex>
  );
}

export default App;
