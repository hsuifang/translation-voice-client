import { useState } from 'react';
import { Grid, Flex, useToast, Text } from '@chakra-ui/react';
// component
import Recorder from './components/Recorder';
import SelectOptions from './components/SelectOptions';
import ChatItem from './components/ChatItem';

import dayjs from 'dayjs';
import { useSpeechTranslate } from './services/mutations';
import { useSystemSupportModels, useSystemSupportLangs } from './services/queries';

import base64ToBlob from './utils/base64ToBlob';

import useChatStore from './store/useChatStore';

const LANGS = ['en', 'zh', 'ja', 'ko', 'pl'] as const;
type Lang = (typeof LANGS)[number];

const KINDS = ['opposite', 'self'] as const;
type Kind = (typeof KINDS)[number];
type RecordContentState = {
  lang: Lang;
  kind: Kind;
  text: string;
  url: string;
  autoPlay: boolean;
  selected: boolean;
}[];

// 對話筐類型

const contentInitItem = (lang: Lang, kind: Kind) => ({
  kind,
  lang,
  text: '',
  url: '',
  autoPlay: false,
  selected: false,
});

const Chat = () => {
  // style
  const toast = useToast();

  // store
  const {
    modelLang: storeModelLang,
    chatLang: storeChatLang,
    viewMode: storeViewMode,
    availableModelLangs,
    availableVoiceLangs,
    changeViewMode,
    changeChatLang,
    changeModelLang,
  } = useChatStore();

  const contentInit = KINDS.map((kind) => contentInitItem(storeChatLang[kind] as Lang, kind));

  const [recordContent, setRecordContent] = useState<RecordContentState>(contentInit);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectOptions = ({ kind, key, value }: { kind: Kind; key: 'lang' | 'model'; value: string }) => {
    setRecordContent((prev) => prev.map((content) => (content.kind === kind ? { ...content, [key]: value } : content)));
  };

  const handleSetIsRecording = (isRecording: boolean, kind: Kind) => {
    setIsRecording(isRecording);
    setRecordContent((prev) =>
      prev.map((content) =>
        content.kind === kind
          ? { ...content, selected: isRecording, url: '' }
          : { ...content, selected: false, url: '' },
      ),
    );
  };

  // upload audio
  const { mutateAsync: speechTranslateReq } = useSpeechTranslate();

  /**
   * Updates the blob with the given source language.
   *
   * @param {Blob} blob - The blob to upoload to server.
   * @param {Kind} sourceLang - The source language.
   * @return {void} This function does not return a value.
   */
  const handleUpdateBlob = (blob: Blob, sourceLang: Kind) => {
    const url = URL.createObjectURL(blob);
    const mediaElement = new Audio(url);
    mediaElement.addEventListener('loadedmetadata', () => {
      if (mediaElement.duration < 1 || mediaElement.duration > 11) {
        toast({
          status: 'error',
          description: '錄音長度須介於 1 秒 ~ 10 秒 ',
          position: 'top',
        });
        return;
      } else {
        setRecordContent((prev) =>
          prev.map((content) => (content.kind === sourceLang ? { ...content, url, autoPlay: false } : content)),
        );
        handleUpload(blob);
      }
    });
    mediaElement.load();
  };

  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    const audioFile = new File([blob], `record-${dayjs().format('YYYYMMDDHHmmss')}.wav`, { type: 'audio/wav' });
    try {
      let source_lang: Lang | null = null,
        target_lang: Lang | null = null;
      let source_area: Kind | null = null,
        target_area: Kind | null = null;

      recordContent.forEach((content) => {
        if (content.selected) {
          source_lang = source_lang ?? content.lang;
          source_area = source_area ?? content.kind;
        } else {
          target_lang = target_lang ?? content.lang;
          target_area = target_area ?? content.kind;
        }
      });

      if (!source_lang || !target_lang) return;

      const { source_text, target_text, file } = await speechTranslateReq({
        file: audioFile,
        source_lang,
        target_lang,
        model: storeModelLang,
      });

      // Convert base64 string to Blob
      const audioBlob = base64ToBlob(file, 'audio/wav');
      const audioURL = URL.createObjectURL(audioBlob);

      setRecordContent((prev) =>
        prev.map((content) => {
          if (content.kind === source_area) {
            return { ...content, text: source_text };
          } else if (content.kind === target_area) {
            return { ...content, text: target_text, autoPlay: true, url: audioURL };
          } else {
            return content;
          }
        }),
      );
    } catch (error) {
      toast({
        status: 'error',
        description: '錄音發生錯誤',
        position: 'top',
      });
    } finally {
      setIsUploading(false);
    }
  };

  useSystemSupportModels();
  useSystemSupportLangs();

  return (
    <Grid
      templateRows="5% 45% 45%"
      rowGap="16px"
      w="clamp(400px, 100%, 500px)"
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
        <Flex w="200px" gap="5px">
          <SelectOptions
            style={{ width: '100px' }}
            size="xs"
            value={storeModelLang}
            disabled={isRecording}
            setValue={(val) => changeModelLang(val as 'evonne' | 'laura' | 'auto')}
            options={availableModelLangs.map((lang) => ({ key: lang, value: lang }))}
          />
          <SelectOptions
            style={{ width: '100px' }}
            size="xs"
            value={storeViewMode}
            disabled={isRecording}
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
          templateRows="90% 10%"
          transform={storeViewMode === 'pm' && idx === 0 ? 'rotate(180deg)' : ''}
        >
          <ChatItem
            isLoading={isUploading}
            text={content.text}
            autoPlay={content.autoPlay}
            url={content.url}
            title={content.lang}
          >
            <Recorder
              disabledBtn={isRecording && !content.selected}
              updateBlob={(blob) => handleUpdateBlob(blob, content.kind)}
              setIsRecording={(isRecording) => handleSetIsRecording(isRecording, content.kind)}
              isRecording={isRecording}
              recordLimitTime={10}
            />
          </ChatItem>

          <SelectOptions
            value={content.lang}
            disabled={isRecording}
            setValue={(val) => {
              handleSelectOptions({ kind: content.kind, key: 'lang', value: val });
              changeChatLang(content.kind, val as Lang);
            }}
            options={availableVoiceLangs.map((lang) => ({ key: lang, value: lang }))}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Chat;
