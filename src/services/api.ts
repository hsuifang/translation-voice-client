import req from '@/lib/api';
import { Nullable } from '@/types/utils';
interface UploadProps {
  exam_id: number;
  file: Nullable<Blob>;
  mode: 'audio' | 'image';
}

export const uploadFile = async ({ exam_id, file, mode }: UploadProps) => {
  const result = await req.post(
    '/api/file/upload',
    { exam_id, file, mode },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return result.data;
};
