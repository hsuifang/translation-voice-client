import { Box, Grid, Text, Flex } from '@chakra-ui/react';
import VoiceAnimation from './VoiceAnimation';
import SelectOptions from './SelectOptions';
import useChatStore from '../store/useChatStore';

interface IChatItemProps {
  isLoading: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  text: string;
  url: string;
  autoPlay: boolean;
  children?: React.ReactNode;
}

const ChatItem = ({ isLoading, language, setLanguage, text, url, autoPlay = false, children }: IChatItemProps) => {
  const { availableVoiceLangs } = useChatStore();
  return (
    <Box bg="gray.50" position="relative" borderRadius="8px" padding="10px">
      <Flex justifyContent="end" position="absolute" top="5px" right="5px" zIndex="1">
        <Box width="clamp(50px, 100%, 100px)">
          <SelectOptions
            variant="fill"
            size="xs"
            value={language}
            disabled={isLoading}
            setValue={setLanguage}
            style={{ bgColor: 'gray.100', bg: 'green.400', color: 'white' }}
            options={availableVoiceLangs}
          />
        </Box>
      </Flex>
      {/* </Box> */}
      <Grid position="relative" templateRows="1fr auto" w="100%" borderRadius="8px" height="100%">
        {isLoading ? (
          <VoiceAnimation />
        ) : (
          <Text pt="30px" px="10px" overflowY="scroll" scrollBehavior="smooth" fontFamily="monospace" fontSize="16px">
            {text || '請錄製語音訊息...'}
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
