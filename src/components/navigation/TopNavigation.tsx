/* 상단네비게이션 (뒤로가기, 현재페이지제목, 더보기) */

import styled from 'styled-components';
import { LeftArrowSVG, SearchSVG } from '../../../public/svg/Icons';

const TopNavigation = () => {
  return (
    <Layout>
      <button>
        <LeftArrowSVG />
      </button>
      <Title>감정 모아보기</Title>
      <button>
        <SearchSVG />
      </button>
    </Layout>
  );
};
export default TopNavigation;

const Layout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 16px;

  width: 100%;
  height: 44px;
`;

const Title = styled.div`
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.5rem;

  user-select: none;
`;
