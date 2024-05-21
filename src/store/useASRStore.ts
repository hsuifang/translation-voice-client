import { create } from 'zustand';
import dayjs from 'dayjs';

interface IMessage {
  msg: string;
  time: string;
}

export interface IASRStore {
  message: IMessage[];
  setMessage: (msg: string) => void;
}

const useASRStore = create<IASRStore>((set, get) => ({
  message: [],
  setMessage: (msg) => set({ message: [{ msg, time: dayjs().format('HH:mm:ss') }, ...get().message] }),
}));

export default useASRStore;
