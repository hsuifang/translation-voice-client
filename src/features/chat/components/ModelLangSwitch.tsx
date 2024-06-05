import { Box, Modal, Text, ModalOverlay, ModalContent, ModalCloseButton } from '@chakra-ui/react';
import { useState } from 'react';
import SelectOptions from './SelectOptions';
import useChatStore from '../store/useChatStore';

const KINDS = ['opposite', 'self'] as const;
type Kind = (typeof KINDS)[number];

const ModelLangSwitch = ({
  isOpen,
  onClose,
  language,
  model,
  changeModelLang,
}: {
  language: string;
  model: string;
  isOpen: boolean;
  onClose: () => void;
  changeModelLang: ({ key, value }: { key: 'lang' | 'model'; value: string }) => void;
}) => {
  const { availableVoiceLangs, availableModelLangs } = useChatStore();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />

      <ModalContent margin="50px" display="flex" alignContent={'center'} justifyContent={'center'}>
        <ModalCloseButton />
        <Box p="4">
          <Box mb="4">
            <Text>選擇模型</Text>
            <SelectOptions
              variant="fill"
              size="xs"
              value={model}
              setValue={(val) => changeModelLang({ key: 'model', value: val })}
              options={availableModelLangs.map((lang) => ({ key: lang, value: lang }))}
            />
          </Box>
          <Text>選擇語言</Text>
          <SelectOptions
            variant="fill"
            size="xs"
            value={language}
            setValue={(val) => changeModelLang({ key: 'lang', value: val })}
            options={availableVoiceLangs}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default ModelLangSwitch;
