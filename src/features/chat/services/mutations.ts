import { useMutation } from '@tanstack/react-query';
import { Nullable } from '@/types/utils';
import { speechTranslateCustomModel, textTranslate } from './api';

export const useSpeechTranslate = () => {
  return useMutation({
    mutationFn: async ({
      file,
      source_lang,
      target_lang,
      model,
    }: {
      file: Nullable<Blob>;
      source_lang: string;
      target_lang: string;
      model: string;
    }) => {
      const result = await speechTranslateCustomModel({
        file,
        source_lang,
        target_lang,
        name: model as 'evonne' | 'laura' | 'auto',
      });
      return result;
    },
  });
};

export const useTextTranslate = () => {
  return useMutation({
    mutationFn: async ({
      source_text,
      source_lang,
      target_lang,
      model,
    }: {
      source_text: string;
      source_lang: string;
      target_lang: string;
      model: string;
    }) => {
      const result = await textTranslate({
        source_text,
        source_lang,
        target_lang,
        name: model as 'evonne' | 'laura' | 'auto',
      });
      return result;
    },
  });
};
