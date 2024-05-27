import req from '@/lib/api';
import { Nullable } from '@/types/utils';

export const speechTranslate = async ({
  file,
  source_lang,
  target_lang,
}: {
  file: Nullable<Blob>;
  source_lang: string;
  target_lang: string;
}) => {
  const result = await req.post(
    '/v1/end2end/speech-translate',
    { file, source_lang, target_lang },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return result.data;
};

export const speechTranslateCustomModel = async ({
  file,
  source_lang,
  target_lang,
  name = ' ',
}: {
  file: Nullable<Blob>;
  source_lang: string;
  target_lang: string;
  name?: 'evonne' | 'laura' | ' ';
}) => {
  const result = await req.post(
    '/v1/end2end/speech-translate-custom',
    { file, source_lang, target_lang, name },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return result.data;
};
