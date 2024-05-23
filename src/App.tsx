import { Flex, Box } from '@chakra-ui/react';
import Chat from './features/chat/Chat';

function App() {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} w="100%" position="fixed" height="100vh">
      <Box p="20px" h="fit-content" w="100%" position="fixed" height={'100%'} top={0}>
        <Chat />
      </Box>
    </Flex>
  );
}

export default App;
