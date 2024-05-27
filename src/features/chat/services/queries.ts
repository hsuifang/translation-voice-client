import { useQuery } from '@tanstack/react-query';
import { getSystemSupportModels, getSystemSupportLang } from './api';
import useChatStore from '../store/useChatStore';

// fetch list of surppoted models and setTo useStore after suceessful retrieval
export const useSystemSupportModels = () => {
  const { setAvailableModelLangs } = useChatStore();

  return useQuery({
    queryKey: ['system-support-models'],
    queryFn: async () => {
      const result = await getSystemSupportModels();
      setAvailableModelLangs(result);
      return result;
    },
    refetchOnWindowFocus: false,
  });
};

// fetch list of surppoted languages and setTo useStore after suceessful retrieval
export const useSystemSupportLangs = () => {
  const { setAvailableVoiceLangs } = useChatStore();
  return useQuery({
    queryKey: ['system-support-langs'],
    queryFn: async () => {
      const result = await getSystemSupportLang();
      setAvailableVoiceLangs(result);
      return result;
    },
    refetchOnWindowFocus: false,
  });
};
