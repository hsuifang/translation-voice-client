import { Box, Text } from '@chakra-ui/react';
import SelectOptions from './SelectOptions';
import useChatStore from '../store/useChatStore';

const KINDS = ['opposite', 'self'] as const;
type Kind = (typeof KINDS)[number];

const ModelLangSwitch = ({ kind, language, model }: { kind: Kind; language: string; model: string }) => {
  const { availableVoiceLangs, availableModelLangs } = useChatStore();

  const handleSelectOptions = ({ key, value }: { key: 'lang' | 'model'; value: string }) => {
    console.log(key, value, kind);
  };

  return (
    <Box>
      <Text>選擇模型</Text>
      <SelectOptions
        style={{ width: '100px' }}
        size="xs"
        value={model}
        setValue={(val) => handleSelectOptions({ key: 'model', value: val })}
        options={availableModelLangs.map((lang) => ({ key: lang, value: lang }))}
      />
      <Text>選擇語言</Text>
      <SelectOptions
        variant="fill"
        size="xs"
        value={language}
        setValue={(val) => handleSelectOptions({ key: 'lang', value: val })}
        options={availableVoiceLangs}
      />
    </Box>
  );
};

export default ModelLangSwitch;
