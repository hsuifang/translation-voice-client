import { useState } from 'react';
import dayjs from 'dayjs';

import { useSpeechTranslate, useTextTranslate } from '../services/mutations';
import base64ToBlob from '../utils/base64ToBlob';

// 畫面視窗類型
const KINDS = ['opposite', 'self'] as const;
type Kind = (typeof KINDS)[number];

type RecordContentState = {
  lang: string;
  kind: Kind;
  text: string;
  url: string | null;
  autoPlay: boolean;
  selected: boolean;
  model: string;
}[];

// 對話筐類型

const contentInitItem = ({ kind, lang, model }: { kind: Kind; lang: string; model: string }) => ({
  kind,
  lang,
  model,
  text: '',
  url: '',
  autoPlay: false,
  selected: false,
});

export const useChat = ({
  chatLang,
  modelLang,
}: {
  chatLang: Record<Kind, string>;
  modelLang: Record<Kind, string>;
}) => {
  // style
  const [errorMsg, setErrorMsg] = useState('');
  const contentInit = KINDS.map((kind) => contentInitItem({ kind, lang: chatLang[kind], model: modelLang[kind] }));

  const [recordContent, setRecordContent] = useState<RecordContentState>(contentInit);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSelectLangOrModel = ({ kind, key, value }: { kind: Kind; key: 'lang' | 'model'; value: string }) => {
    setRecordContent((prev) => prev.map((content) => (content.kind === kind ? { ...content, [key]: value } : content)));
  };

  const handleSetIsProcessing = (isProcessing: boolean, kind: Kind) => {
    setIsProcessing(isProcessing);
    setRecordContent((prev) =>
      prev.map((content) =>
        content.kind === kind
          ? { ...content, text: isProcessing ? 'recording...' : '', selected: isProcessing, url: null }
          : { ...content, text: isProcessing ? 'recording...' : '', selected: false, url: null },
      ),
    );
  };
  // upload audio or text
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
        setErrorMsg('錄音長度須介於 1 秒 ~ 10 秒 ');

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

  const getSourceLang = (target?: string) => {
    let source_lang: string | null = null,
      target_lang: string | null = null,
      source_model: string | null = null;

    let source_area: Kind | null = null,
      target_area: Kind | null = null;

    recordContent.forEach((content) => {
      if (content.kind === target || content.selected) {
        source_lang = source_lang ?? content.lang;
        source_area = source_area ?? content.kind;
        source_model = source_model ?? content.model;
      } else {
        target_lang = target_lang ?? content.lang;
        target_area = target_area ?? content.kind;
      }
    });

    return { source_lang, target_lang, source_area, target_area, source_model };
  };

  // TODO: 整合 handleUpload 和 handleUpdateTypingText

  const handleUpload = async (blob: Blob) => {
    setIsUploading(true);
    const audioFile = new File([blob], `record-${dayjs().format('YYYYMMDDHHmmss')}.wav`, { type: 'audio/wav' });
    try {
      const { source_lang, target_lang, source_area, target_area, source_model } = getSourceLang();
      if (!source_lang || !target_lang || !source_model) return;

      const { source_text, target_text, file } = await speechTranslateReq({
        file: audioFile,
        source_lang,
        target_lang,
        model: source_model,
      });
      // Convert base64 string to Blob
      const audioBlob = file && base64ToBlob(file, 'audio/wav');
      const audioURL = file && URL.createObjectURL(audioBlob);

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
      setErrorMsg('錄音發生錯誤');
    } finally {
      setIsUploading(false);
    }
  };

  const { mutateAsync: textTranslateReq } = useTextTranslate();

  const handleUpdateTypingText = async (text: string, kind: Kind) => {
    setIsUploading(true);

    try {
      const { source_lang, target_lang, source_area, target_area, source_model } = getSourceLang(kind);
      if (!source_lang || !target_lang || !source_model) return;

      const { source_text, target_text, file } = await textTranslateReq({
        source_text: text,
        source_lang,
        target_lang,
        model: source_model,
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
      setErrorMsg('上傳發生錯誤');
    } finally {
      setIsUploading(false);
    }
  };

  return {
    recordContent,
    isProcessing,
    isUploading,
    handleUpdateTypingText,
    handleSelectLangOrModel,
    handleSetIsProcessing,
    handleUpdateBlob,
    errorMsg,
    setErrorMsg,
  };
};
