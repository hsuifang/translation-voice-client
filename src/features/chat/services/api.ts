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

/**
 * Translates speech using a custom model.
 *
 * @param {Object} params - The parameters for the translation.
 * @param {Nullable<Blob>} params.file - The audio file to translate.
 * @param {string} params.source_lang - The source language of the audio.
 * @param {string} params.target_lang - The target language for the translation.
 * @param {'evonne' | 'laura' | 'audo'} [params.name='auto'] - The name of the custom model to use.
 * @return {Promise<any>} A promise that resolves to the translated text.
 */
export const speechTranslateCustomModel = async ({
  file,
  source_lang,
  target_lang,
  name = 'auto',
}: {
  file: Nullable<Blob>;
  source_lang: string;
  target_lang: string;
  name?: 'evonne' | 'laura' | 'auto';
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

export const textTranslate = async ({
  source_text,
  source_lang,
  target_lang,
  name = 'auto',
}: {
  source_text: string;
  source_lang: string;
  target_lang: string;
  name: string;
}) => {
  const result = await req.post(
    '/v1/end2end/text-translate-custom',
    { source_text, source_lang, target_lang, name },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return result.data;
};

/**
 * Retrieves the list of supported languages from the system.
 * @return {Promise<string[]>} A promise that resolves to an array of strings representing the supported languages.
 */
export const getSystemSupportLang = async (): Promise<string[]> => {
  const result = await req.get('/v1/end2end/get-support-languages');
  return result.data;
};

/**
 * Retrieves the list of supported models from the system.
 * @return {Promise<string[]>} A promise that resolves to an array of strings representing the supported models.
 */
export const getSystemSupportModels = async (): Promise<string[]> => {
  const result = await req.get('/v1/end2end/get-custom-models');
  return result.data;
};
