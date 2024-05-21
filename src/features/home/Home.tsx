import { Flex, Text, Input, Button } from '@chakra-ui/react';

function Home() {
  return (
    <Flex minH="100vh">
      <Flex direction="column" justify={'center'} align={'center'} w="100%" borderRight="1px solid #ddd">
        <Text>歡迎來到牙科服務</Text>
        <Flex w="50%" mt="16px" data-testid="search-section">
          <Input placeholder="請輸入檢查單號" size="lg" />
          <Button size="lg">搜尋</Button>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Home;
