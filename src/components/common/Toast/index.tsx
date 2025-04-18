import { useRecoilValue } from 'recoil';
import { toastAtom } from '@/atoms/toastAtom';
import styled, { keyframes } from 'styled-components';

const Toast = () => {
  const toasts = useRecoilValue(toastAtom);

  return (
    <Wrapper>
      {toasts.map((toast) => (
        <ToastItem key={toast.id}>{toast.message}</ToastItem>
      ))}
    </Wrapper>
  );
};

export default Toast;

const Wrapper = styled.div`
  position: fixed;
  bottom: 128px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  10% { opacity: 1; transform: translateY(0); }
  90% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(20px); }
`;

const ToastItem = styled.div`
  padding: 8px 24px;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(4, 25, 43, 0.1);
  font-size: 0.875rem;
  font-weight: 600;
  color: #04192b;

  animation: ${fadeInOut} 2s ease-in-out forwards;
`;
