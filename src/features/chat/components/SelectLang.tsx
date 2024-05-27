import { Select } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

const LANGS = ['zh', 'en', 'ja', 'ko', 'pl'] as const;
type LANG = (typeof LANGS)[number];

interface ISelectLangProps {
  lang: string;
  setLang: (lang: LANG) => void;
  disabled: boolean;
}

const SelectLang = ({ lang, setLang, disabled }: ISelectLangProps) => {
  return (
    <Select
      isDisabled={disabled}
      borderRadius="8px"
      bg="gray.400"
      value={lang}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => setLang(e.target.value as LANG)}
    >
      <option value="zh">中文</option>
      <option value="en">英文</option>
      <option value="ko">韓語</option>
      <option value="ja">日文</option>
      <option value="pl">波文</option>
    </Select>
  );
};

export default SelectLang;
