// 모달 재사용 컴포넌트
// 단일버튼모달 | Alert형모달

import styled from 'styled-components';
import { ExitSVG } from '../../../../public/svg/Icons';
import Button from '../Button';
import { ReactElement } from 'react';
import ModalWrapper from './ModalWrapper';

interface Props {
  onClose: () => void;
  onYes: () => void;
  title: string;
  yesBtnName: string;

  onNo?: () => void;
  descript?: string;
  children?: ReactElement;
  noBtnName?: string;
}
/**단일버튼 모달*/
export const ConfirmModal = ({ onClose, onYes, title, yesBtnName, children }: Props) => {
  return (
    <ModalWrapper onClose={onClose}>
      <Layout>
        <ExitBtn>
          <button onClick={onClose}>
            <ExitSVG color="#04192B" />
          </button>
        </ExitBtn>
        <Container>
          <Title>{title}</Title>
          {children}
          <Button>{yesBtnName}</Button>
        </Container>
      </Layout>
    </ModalWrapper>
  );
};

/**Alert형 버튼 모달 */
export const AlertModal = ({ onClose, onYes, onNo, title, descript }: Props) => {
  return (
    <ModalWrapper onClose={onClose}>
      <Layout>
        <ExitBtn>
          <button onClick={onClose}>
            <ExitSVG color="#04192B" />
          </button>
        </ExitBtn>
        <Container>
          <Title>
            <p>{title}</p>
            <p className="description">{descript}</p>
          </Title>
          <ButtonSet>
            <Button onClick={onNo}>{'취소할래요'}</Button>
            <Button onClick={onYes}>{'삭제할래요'}</Button>
          </ButtonSet>
        </Container>
      </Layout>
    </ModalWrapper>
  );
};

const Layout = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;

  width: 300px;

  padding: 0 16px 24px 16px;

  border-radius: 16px;
  background-color: #fff;
`;

const ExitBtn = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  width: 100%;
  height: 44px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
`;

const Title = styled.div`
  font-size: 1.0625rem;
  line-height: 1.5rem;
  font-weight: 700;
  text-align: center;

  .description {
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
    color: #a5b7c6;
  }
`;

const ButtonSet = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
`;
