import { Box, Grid, Text, Tag, TagLabel, Flex } from '@chakra-ui/react';
import VoiceAnimation from './VoiceAnimation';

interface IChatItemProps {
  isLoading: boolean;
  text: string;
  url: string;
  title: string;
  autoPlay: boolean;
  children?: React.ReactNode;
}

const ChatItem = ({
  isLoading,
  text = '請錄製語音訊息...',
  url,
  title,
  autoPlay = false,
  children,
}: IChatItemProps) => {
  return (
    <Box bg="gray.50" position="relative" borderRadius="8px" padding="10px">
      <Tag
        zIndex="2"
        size="sm"
        border="yellow"
        variant="solid"
        colorScheme="green"
        position="absolute"
        right="5px"
        top="5px"
      >
        <TagLabel fontWeight="bold">{title}</TagLabel>
      </Tag>
      <Grid position="relative" templateRows="1fr auto" w="100%" borderRadius="8px" height="100%">
        {isLoading ? (
          <VoiceAnimation />
        ) : (
          <Text pt="14px" px="10px" overflowY="scroll" scrollBehavior="smooth" fontFamily="monospace" fontSize="16px">
            {text}
          </Text>
        )}

        <Flex justifyContent="space-between" alignItems="end">
          <Box w={children ? '70%' : '100%'}>
            {url && (
              <audio controls autoPlay={autoPlay} aria-label="Voice Message">
                <source src={url} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </Box>
          {children}
        </Flex>
      </Grid>
    </Box>
  );
};

export default ChatItem;
