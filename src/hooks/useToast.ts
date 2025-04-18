import { useSetRecoilState } from 'recoil';
import { toastAtom } from '@/atoms/toastAtom';

let toastId = 0;

export const useToast = () => {
  const setToasts = useSetRecoilState(toastAtom);

  const show = (message: string, duration = 2000) => {
    const id = ++toastId;
    const newToast = { id, message };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return { show };
};
