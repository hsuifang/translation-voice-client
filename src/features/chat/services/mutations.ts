import { useMutation } from '@tanstack/react-query';
import { Nullable } from '@/types/utils';
import { speechTranslate } from './api';

export const useSpeachTranslate = () => {
  return useMutation({
    mutationFn: async (file: Nullable<Blob>) => {
      const result = await speechTranslate(file);
      return result;
    },
  });
};
