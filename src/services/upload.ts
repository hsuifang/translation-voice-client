// import api from './api';
import { useMutation } from '@tanstack/react-query';
import { uploadFile } from './api';
import { Nullable } from '@/types/utils';

interface UploadProps {
  exam_id: number;
  file: Nullable<Blob>;
  mode: 'audio' | 'image';
}

// create a upload mutation
export const useUploadMutation = () => {
  return useMutation({
    mutationFn: async ({ exam_id, file, mode }: UploadProps) => {
      const res = await uploadFile({ exam_id, file, mode });
      return res;
    },
  });
};
