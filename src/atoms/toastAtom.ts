import { atom } from 'recoil';

export interface ToastMessage {
  id: number;
  message: string;
}

export const toastAtom = atom<ToastMessage[]>({
  key: 'toastAtom',
  default: [],
});
