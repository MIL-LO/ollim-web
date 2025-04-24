import styled from 'styled-components';
import { CameraSVG } from '../../../../public/svg/Icons';

export const CameraButton = () => {
  return (
    <Layout>
      <CameraSVG color={'#A5B7C6'} />
    </Layout>
  );
};

const Layout = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);
`;
