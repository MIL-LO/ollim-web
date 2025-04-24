// 하단에서 슬라이드되어 올라오는 선택옵션 패널

import styled from 'styled-components';
import { ExitSVG } from '../../../../public/svg/Icons';
import { useEffect } from 'react';
import ModalWrapper from '@/components/common/Modal/ModalWrapper';

interface Props {
  onClose: () => void;
  onNext?: () => void;
  nextText?: string;
  nextDisabled?: boolean;
  children: React.ReactNode;
}
export const BottomSheetModal = ({
  onClose,
  onNext,
  nextText = '확인',
  nextDisabled = false,
  children,
}: Props) => {
  return (
    <ModalWrapper onClose={onClose}>
      <Modal>
        <button
          className="exitBtn"
          onClick={onClose}
          style={{ marginRight: '16px', height: '44px' }}
        >
          <ExitSVG color="#04192B" />
        </button>

        <Content>{children}</Content>

        {onNext && (
          <BtnWrap>
            <NextBtn onClick={onNext} disabled={nextDisabled}>
              {nextText}
            </NextBtn>
          </BtnWrap>
        )}
      </Modal>
    </ModalWrapper>
  );
};

const Modal = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 13px;

  padding-bottom: 34px;
  z-index: 2;

  width: 100%;

  border-radius: 16px 16px 0 0;
  background-color: #fff;
  box-shadow: 0 0 20px 2px rgba(4, 25, 43, 0.1);
`;

const BtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 17px;

  width: 100%;
  height: 68px;
`;

const NextBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 44px;

  border-radius: 16px;
  background-color: ${({ disabled }) => (disabled ? '#C0EBF5' : '#00AFD8')};

  color: #fff;
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.5rem;
  letter-spacing: -1%;

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  min-height: 100px;
`;
