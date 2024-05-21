import { create } from 'zustand';

export interface IParamsStore {
  queryStr: {
    examDate?: string;
    examId?: string;
    medicalId?: string;
  };
  items: any[];
  setQureyStr: (params: IParamsStore['queryStr']) => void;
  setListData: (list: any[]) => void;
  getQueryStr: () => IParamsStore['queryStr'];
}

const useHomeParams = create<IParamsStore>((set, get) => ({
  queryStr: {
    examDate: '',
    examId: '',
    medicalId: '',
  },
  items: [],
  setQureyStr: (params: IParamsStore['queryStr']) => set({ queryStr: { ...get().queryStr, ...params } }),
  setListData: (list: any[]) => set({ items: list }),
  getQueryStr: () => get().queryStr,
}));

export default useHomeParams;
