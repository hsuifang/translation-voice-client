import req from '@/lib/api';
import { Nullable } from '@/types/utils';

export const speechTranslate = async (file: Nullable<Blob>) => {
  const result = await req.post(
    '/v1/end2end/speech-translate',
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      responseType: 'blob',
    },
  );
  return result.data;
};
