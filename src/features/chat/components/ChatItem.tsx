import { Box, Grid, IconButton, Flex, Textarea, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import VoiceAnimation from './VoiceAnimation';
import AudioController from './AudioController';

import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { IoMdSettings } from 'react-icons/io';
// TODO MODELLANGSWITCH
import ModelLangSwitch from './ModelLangSwitch';

interface IChatItemProps {
  isProcess: boolean;
  language: string;
  model: string;
  setModel: (model: string) => void;
  setLanguage: (lang: string) => void;
  handleUpdateText: (text: string) => void; // typing時會觸發
  text: string;
  url: string;
  autoPlay: boolean;
  children?: React.ReactNode;
}

const StyledTypingText = styled(Textarea)`
  overflow-y: scroll;
  scroll-behavior: smooth;
  font-family: monospace;
  font-size: 16px;
  height: 100%;
  border: none;
  resize: none;
  border-radius: 8px;
  padding: 0;
`;

const ChatItem = ({
  isProcess,
  language,
  setLanguage,
  model,
  setModel,
  text,
  url,
  autoPlay = false,
  handleUpdateText,
  children,
}: IChatItemProps) => {
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
    <>
      {/* <ModelLangSwitch kind="self" language={language} model={model} /> */}
      <Grid
        position="relative"
        templateRows="1fr auto"
        w="100%"
        bg="white"
        borderRadius="8px"
        padding="16px 0 16px 16px"
        paddingRight="0"
      >
        {/* text */}
        {isProcess ? (
          <Box>
            <VoiceAnimation />
          </Box>
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
        <Grid templateColumns="1fr auto" paddingRight="16px" gap="8px" alignItems="end">
          <Flex alignContent="center" paddingRight="8px" alignItems={'center'}>
            <Flex borderRight="2px solid #ddd" paddingRight="8px" alignItems={'center'}>
              <IconButton
                size="xs"
                data-testid="sendText-entry"
                aria-label="toggle recording button"
                icon={<IoMdSettings size={16} />}
              />
              <Text fontSize="10px" fontWeight="bold" fontFamily="mono" marginLeft="8px">
                VOICE: {model} LANG: {language}
              </Text>
            </Flex>
            <Box padding="0 8px">
              <IconButton
                icon={isTyping ? <FaMicrophone /> : <IoSend size={8} />}
                size="xs"
                data-testid="sendText-entry"
                aria-label="toggle recording button"
                onClick={() => setIsTyping(!isTyping)}
              />
            </Box>
            <Box borderLeft="2px solid #ddd" padding="0 8px">
              <AudioController url={url} autoPlay={autoPlay} />
            </Box>
          </Flex>
          {isTyping ? (
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
        </Grid>
      </Grid>
    </>
  );
};

export default ChatItem;
