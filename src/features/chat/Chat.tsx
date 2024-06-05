import { Grid, Flex, Text } from '@chakra-ui/react';
// component
import Recorder from './components/Recorder';
import SelectOptions from './components/SelectOptions';
import ChatItem from './components/ChatItem';
import { useChat } from './hooks/useChat';
import { useToast } from '@chakra-ui/react';
import { useSystemSupportModels, useSystemSupportLangs } from './services/queries';
import useChatStore from './store/useChatStore';
import { useEffect } from 'react';

const Chat = () => {
  const toast = useToast();
  // store
  const {
    modelLang: storeModelLang,
    chatLang: storeChatLang,
    viewMode: storeViewMode,
    changeViewMode,
    changeChatLang,
  } = useChatStore();

  const {
    recordContent,
    isProcessing,
    isUploading,
    handleSelectLangOrModel,
    handleSetIsProcessing,
    handleUpdateBlob,
    handleUpdateTypingText,
    errorMsg,
    setErrorMsg,
  } = useChat({
    modelLang: storeModelLang,
    chatLang: storeChatLang,
  });

  useSystemSupportModels();
  useSystemSupportLangs();

  useEffect(() => {
    if (errorMsg) {
      toast({ title: errorMsg, status: 'error', duration: 3000, isClosable: true, position: 'top' });
      setErrorMsg('');
    }
  }, [errorMsg]);

  return (
    <Grid
      templateRows="5% 45% 45%"
      rowGap="16px"
      w="clamp(100%, 100%, 500px)"
      h="100%"
      mx="auto"
      borderRadius="8px"
      padding="20px"
      bg="gray.500"
    >
      <Flex as="header" justifyContent="space-between">
        <Text fontSize="20px" as="abbr">
          TRANSLATION
        </Text>
        <Flex>
          <SelectOptions
            style={{ width: '100px' }}
            size="xs"
            value={storeViewMode}
            disabled={isProcessing}
            setValue={(val) => changeViewMode(val as 'pm' | 'normal')}
            options={[
              {
                key: '禮貌模式',
                value: 'pm',
              },
              {
                key: '一般模式',
                value: 'normal',
              },
            ]}
          />
        </Flex>
      </Flex>

      {recordContent.map((content, idx) => (
        <Grid
          key={content.kind}
          templateRows="100%"
          transform={storeViewMode === 'pm' && idx === 0 ? 'rotate(180deg)' : ''}
        >
          <ChatItem
            isProcess={isUploading}
            text={content.text}
            autoPlay={content.autoPlay}
            url={content.url}
            language={content.lang}
            model={content.model}
            setModel={(val) => handleSelectLangOrModel({ kind: content.kind, key: 'model', value: val })}
            setLanguage={(val) => {
              handleSelectLangOrModel({ kind: content.kind, key: 'lang', value: val });
              changeChatLang(content.kind, val);
            }}
            handleUpdateText={(str) => handleUpdateTypingText(str, content.kind)}
          >
            <Recorder
              disabledBtn={(isProcessing && !content.selected) || isUploading}
              updateBlob={(blob) => handleUpdateBlob(blob, content.kind)}
              setIsRecording={(isRecording) => handleSetIsProcessing(isRecording, content.kind)}
              isRecording={isProcessing}
              recordLimitTime={10}
            />
          </ChatItem>
        </Grid>
      ))}
    </Grid>
  );
};

export default Chat;
