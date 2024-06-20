import { Box, Grid, IconButton, Flex, Text, Tag } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import VoiceAnimation from './VoiceAnimation';
import AudioController from './AudioController';
import { StyledTypingText, StyledShowSelectedText, StyledGridWrapper } from './ChatItem.styled';

import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { RiCharacterRecognitionFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';

interface IChatItemProps {
  isProcess: boolean;
  language: string;
  model: string;
  handleUpdateText: (text: string) => void;
  triggerSettings: () => void;
  text: string;
  url: string | null;
  autoPlay: boolean;
  children?: React.ReactNode;
}

const ChatItem = ({
  isProcess,
  language,
  model,
  text,
  url,
  autoPlay = false,
  handleUpdateText,
  children,
  triggerSettings,
}: IChatItemProps) => {
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const handleIsTyping = (text: string) => {
    setTypingText(text);
  };

  const toggleClickTextBox = (isTyping: boolean) => {
    if (isTyping && typingText === '') {
      setTypingText(text);
    } else {
      setTypingText('');
    }
    setIsTyping(isTyping);
  };

  useEffect(() => {
    if (isProcess) {
      setIsTyping(false);
      setTypingText('');
    }
  }, [isProcess]);

  return (
    <>
      <StyledGridWrapper border={isTyping && !isProcess ? '2px dashed #666' : '1px solid transparent'}>
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
            readOnly={!isTyping || isProcess}
            placeholder="請錄製/輸入語音訊息..."
            onChange={(e) => {
              handleIsTyping(e.target.value);
            }}
          />
        )}
        <Grid templateColumns="1fr auto" paddingRight="16px" gap="8px" alignItems="end">
          <Flex padding={{ base: '0', md: '0 8px' }} alignItems="center" width="100%" color={'#999'}>
            <IconButton
              padding={'0'}
              size="sm"
              variant="ghost"
              data-testid="switchSettings-entry"
              aria-label="toggle recording button"
              color="inherit"
              icon={<IoMdSettings size="20" color="inherit" />}
              onClick={triggerSettings}
            />
            <StyledShowSelectedText>
              <Text as="label" marginRight="4px">
                VOICE:
              </Text>
              <Tag variant="solid" size="sm" marginRight="4px">
                {model}
              </Tag>
              <Text as="label" marginRight="4px">
                LANG:
              </Text>
              <Tag variant="solid" size="sm">
                {language}
              </Tag>
            </StyledShowSelectedText>
            <Flex justifyContent={{ base: 'flex-start', md: 'center' }} flexGrow="1">
              <Flex padding={{ base: '0 4px', md: '0 8px' }} justifyContent="center">
                <AudioController url={url} autoPlay={autoPlay} />
              </Flex>
              <IconButton
                icon={isTyping ? <FaMicrophone size={20} /> : <RiCharacterRecognitionFill size={24} />}
                data-testid="toggleTyping-entry"
                aria-label="toggle recording button"
                onClick={() => toggleClickTextBox(!isTyping)}
                variant="ghost"
                colorScheme="gray"
                _hover={{ background: 'white' }}
                _active={{ background: 'white' }}
                borderRadius={'50%'}
              />
            </Flex>
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
      </StyledGridWrapper>
    </>
  );
};

export default ChatItem;
