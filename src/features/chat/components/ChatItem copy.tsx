import { Box, Grid, IconButton, Flex, Textarea } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import VoiceAnimation from './VoiceAnimation';
import SelectOptions from './SelectOptions';
import useChatStore from '../store/useChatStore';
import { IoSend } from 'react-icons/io5';

interface IChatItemProps {
  isProcess: boolean;
  language: string;
  setLanguage: (lang: string) => void;
  handleUpdateText: (text: string) => void; // typing時會觸發
  text: string;
  url: string;
  autoPlay: boolean;
  children?: React.ReactNode;
}

const StyledTypingText = styled(Textarea)`
  margin-top: 14px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-family: monospace;
  font-size: 16px;
  height: 100%;
  border: none;
  resize: none;
`;

const ChatItem = ({
  isProcess,
  language,
  setLanguage,
  text,
  url,
  autoPlay = false,
  handleUpdateText,
  children,
}: IChatItemProps) => {
  const { availableVoiceLangs } = useChatStore();

  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const handleIsTyping = (text: string) => {
    setTypingText(text);
  };

  const handleClickTextBox = () => {
    if (typingText === '') {
      setTypingText(text);
    }
    setIsTyping(true);
  };

  useEffect(() => {
    if (isProcess) {
      setIsTyping(false);
      setTypingText('');
    }
  }, [isProcess]);

  return (
    <Box bg="gray.50" position="relative" borderRadius="8px" padding="10px">
      <Flex justifyContent="end" position="absolute" top="5px" right="5px" zIndex="1">
        <Box width="clamp(50px, 100%, 100px)">
          <SelectOptions
            variant="fill"
            size="xs"
            value={language}
            disabled={isProcess}
            setValue={setLanguage}
            style={{ bgColor: 'gray.100', bg: 'green.400', color: 'white' }}
            options={availableVoiceLangs}
          />
        </Box>
      </Flex>
      {/* </Box> */}
      <Grid position="relative" templateRows="1fr auto" w="100%" borderRadius="8px" height="100%">
        {isProcess ? (
          <VoiceAnimation />
        ) : (
          <StyledTypingText
            _focusVisible={{ border: 'none' }}
            data-testid="chat-text"
            value={isTyping && !isProcess ? typingText : text}
            maxLength={50}
            onClick={handleClickTextBox}
            placeholder="請錄製/輸入語音訊息..."
            onChange={(e) => {
              handleIsTyping(e.target.value);
            }}
          />
        )}

        <Flex justifyContent="space-between" alignItems="end">
          <Box w={children ? '70%' : '100%'} maxW="240px">
            {!isProcess && url && (
              <audio controls key={url} autoPlay={autoPlay} aria-label="Voice Message">
                <source src={url} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
            )}
          </Box>
          {typingText.length ? (
            <IconButton
              data-testid="sendText-entry"
              aria-label="toggle recording button"
              onClick={() => {
                handleUpdateText(typingText);
                handleIsTyping('');
                setIsTyping(false);
              }}
              borderRadius="50%"
              fontSize={'3xl'}
              minW="50px"
              minH="50px"
              size="lg"
              icon={<IoSend size={16} />}
              color={!isProcess ? 'white' : 'gray.600'}
              colorScheme={!isProcess ? 'facebook' : 'gray'}
            />
          ) : (
            children
          )}
        </Flex>
      </Grid>
    </Box>
  );
};

export default ChatItem;
