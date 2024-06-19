import { Box, Grid, IconButton, Flex, Textarea, Text, Tag } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import VoiceAnimation from './VoiceAnimation';
import AudioController from './AudioController';

import { FaMicrophone } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { RiCharacterRecognitionFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';

interface IChatItemProps {
  isProcess: boolean;
  language: string;
  model: string;
  handleUpdateText: (text: string) => void; // typing時會觸發
  triggerSettings: () => void;
  text: string;
  url: string | null;
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

// @ignore
const StyledShowSelectedText = styled(Flex)`
  align-items: center;
  border-right: 2px dashed #ddd;
  padding-right: 8px;
  margin-right: 8px;
  p,
  label {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    font-family: monospace;
    margin-left: 5px;
  }
  span {
    font-family: monospace;
  }
  @media screen and (max-width: 400px) {
    label {
      display: none;
    }
  }
`;

const StyledGridWrapper = styled(Grid)`
  position: relative;
  grid-template-rows: 1fr auto;
  width: 100%;
  background-color: white;
  border-radius: 8px;
  padding: 16px 0 16px 16px;
  padding-right: 0;

  @media screen and (max-width: 400px) {
    padding-bottom: 8px;
  }
`;

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
          <Flex padding={{ base: '0', md: '0 8px' }} alignItems={'center'} width="100%" color={'#999'}>
            <IconButton
              padding={'0'}
              size="sm"
              variant="ghost"
              data-testid="sendText-entry"
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
                data-testid="sendText-entry"
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
