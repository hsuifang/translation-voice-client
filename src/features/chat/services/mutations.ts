import { useMutation } from '@tanstack/react-query';
import { Nullable } from '@/types/utils';
import { speechTranslate } from './api';

export const useSpeachTranslate = () => {
  return useMutation({
    mutationFn: async ({
      file,
      source_lang,
      target_lang,
    }: {
      file: Nullable<Blob>;
      source_lang: string;
      target_lang: string;
    }) => {
      const result = await speechTranslate({ file, source_lang, target_lang });
      return result;
    },
  });
};
