import { useMutation } from '@tanstack/react-query';
import { Nullable } from '@/types/utils';
import { speechTranslateCustomModel } from './api';

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
        name: model as 'evonne' | 'laura' | ' ',
      });
      return result;
    },
  });
};
