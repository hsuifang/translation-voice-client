import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import langMapping from '../utils/langMapping.json';

const VoiceLangMapping: Record<string, string> = langMapping;

// Define the shape of the chatLang object
interface ChatSettings {
  self: string;
  opposite: string;
}

// Define the shape of the store's state
type Language = { key: string; value: string };
interface IChatStoreState {
  modelLang: ChatSettings;
  chatLang: ChatSettings;
  availableModelLangs: string[];
  availableVoiceLangs: Language[];
  viewMode: 'normal' | 'pm';
  changeModelLang: (role: 'self' | 'opposite', model: string) => void;
  changeViewMode: (mode: 'normal' | 'pm') => void;
  changeChatLang: (role: 'self' | 'opposite', lang: string) => void;
  setAvailableModelLangs: (langs: string[]) => void;
  setAvailableVoiceLangs: (langs: string[]) => void;
  reset: () => void;
}

type ChatStorePersist = (
  config: (set: any, get: any) => IChatStoreState,
  options: PersistOptions<IChatStoreState>,
) => (set: any, get: any, api: any) => IChatStoreState;

const useChatStore = create<IChatStoreState>(
  (persist as ChatStorePersist)(
    (set, get) => ({
      modelLang: {
        self: 'auto',
        opposite: 'auto',
      },
      chatLang: {
        self: 'ja',
        opposite: 'en',
      },
      availableModelLangs: [], // 模組清單
      availableVoiceLangs: [],
      viewMode: 'normal', // 檢視模式
      changeModelLang: (role: 'self' | 'opposite', model: string) =>
        set({ modelLang: { ...get().modelLang, [role]: model } }),
      changeViewMode: (mode: 'normal' | 'pm') => set({ viewMode: mode }),
      changeChatLang: (role: 'self' | 'opposite', lang: string) =>
        set({ chatLang: { ...get().chatLang, [role]: lang } }),
      setAvailableModelLangs: (models: string[]) => set({ availableModelLangs: models }),
      setAvailableVoiceLangs: (langs: string[]) =>
        set({
          availableVoiceLangs: langs.map((lang: string) => ({
            key: VoiceLangMapping[lang] || lang,
            value: lang,
          })),
        }),
      reset: () => set({ modelLang: 'evonne', viewMode: 'normal' }),
    }),
    {
      name: 'chatLang',
    },
  ),
);

export default useChatStore;
