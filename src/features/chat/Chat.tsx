import { Grid, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react'; // TODO MODELLANGSWITCH
import useMediaDevices from './hooks/useMediaDevices';
import { memo } from 'react';
// component
import { useChat } from './hooks/useChat';
import { useToast } from '@chakra-ui/react';
import { useSystemSupportModels, useSystemSupportLangs } from './services/queries';
import useChatStore from './store/useChatStore';
import ModelLangSwitch from './components/ModelLangSwitch';
import Recorder from './components/Recorder';
import SelectOptions from './components/SelectOptions';
import ChatItem from './components/ChatItem';

const RecorderMemo = memo(Recorder);

const Chat = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isGetUserMediaSuccess = useRef(false);
  const { getUserMediaStream, stream } = useMediaDevices();
  // store
  const {
    modelLang: storeModelLang,
    chatLang: storeChatLang,
    viewMode: storeViewMode,
    changeViewMode,
    changeChatLang,
    changeModelLang,
  } = useChatStore();

  const [settingsKind, setSettingsKind] = useState<'self' | 'opposite'>('self');
  const handleSettingsSwitch = ({
    kind,
    key,
    value,
  }: {
    kind: 'self' | 'opposite';
    key: 'model' | 'lang';
    value: string;
  }) => {
    handleSelectLangOrModel({ kind: settingsKind, key, value });
    if (key === 'model') {
      changeModelLang(kind, value);
    } else {
      changeChatLang(kind, value);
    }
  };

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

  const handleGetUserMediaSuccess = async () => {
    if (!isGetUserMediaSuccess.current) {
      isGetUserMediaSuccess.current = true;
      await getUserMediaStream({ audio: { deviceId: 'default', channelCount: 1, sampleRate: 16000 } });
    }
  };

  useEffect(() => {
    handleGetUserMediaSuccess();
  }, []);

  return (
    <>
      <ModelLangSwitch
        language={storeChatLang[settingsKind]}
        model={storeModelLang[settingsKind]}
        isOpen={isOpen}
        onClose={onClose}
        changeModelLang={({ key, value }) => handleSettingsSwitch({ kind: settingsKind, key, value })}
      />

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
          <Text fontSize="20px" as="abbr" fontFamily="mono" fontWeight={600} letterSpacing="1px" color={'gray.300'}>
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
              triggerSettings={() => {
                setSettingsKind(content.kind);
                onOpen();
              }}
              handleUpdateText={(str) => handleUpdateTypingText(str, content.kind)}
            >
              <RecorderMemo
                disabledBtn={(isProcessing && !content.selected) || isUploading}
                updateBlob={(blob) => handleUpdateBlob(blob, content.kind)}
                setIsRecording={(isRecording) => handleSetIsProcessing(isRecording, content.kind)}
                isRecording={isProcessing}
                recordLimitTime={10}
                stream={stream}
              />
            </ChatItem>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Chat;
