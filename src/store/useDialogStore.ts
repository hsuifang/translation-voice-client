import { create } from 'zustand';

export enum Dialog {
  Alert = 'alert',
  Confirm = 'confirm',
}

export type DialogType = {
  isOpen: boolean;
  type: Dialog;
  message: string;
  confirmAction: () => void;
};

export interface IDialogStore {
  dialog: DialogType;
  openDialog: (message: string, type: Dialog, onConfirm: () => void) => void;
  closeDialog: () => void;
}

const useDialogStore = create<IDialogStore>((set) => ({
  dialog: {
    isOpen: false,
    type: Dialog.Alert,
    message: '',
    confirmAction: () => {},
  },
  openDialog: (message, type = Dialog.Alert, onConfirm) =>
    set({ dialog: { isOpen: true, type, message, confirmAction: onConfirm } }),
  closeDialog: () => set({ dialog: { isOpen: false, type: Dialog.Alert, message: '', confirmAction: () => {} } }),
}));

export default useDialogStore;
