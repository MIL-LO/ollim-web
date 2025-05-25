/* 상단네비게이션 (뒤로가기, 현재페이지제목, 더보기) */

import styled from 'styled-components';
import { LeftArrowSVG, SearchSVG } from '../../../public/svg/Icons';
import { ReactNode, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { EditToggle } from '../pages/diary/DiaryPreviewList';

interface Props {
  title: string;
  rightIcon?: ReactNode;
  onClickRightIcon?: () => void;
}

const TopNavigation = ({ title, rightIcon, onClickRightIcon }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isEditToggle, setIsEditToggle] = useState<boolean>(false);
  const isDiaryDetailPage = /^\/diary\/\d+$/.test(pathname);

  return (
    <Layout>
      <button onClick={() => router.back()}>
        <LeftArrowSVG />
      </button>
      <Title>{title}</Title>
      <RightBtn
        onClick={() => {
          if (onClickRightIcon) onClickRightIcon();
          setIsEditToggle(!isEditToggle);
        }}
      >
        {rightIcon}
        {isDiaryDetailPage && isEditToggle && (
          <EditToggle exit={() => setIsEditToggle(false)} onEdit={() => ''} onDel={() => ''} />
        )}
      </RightBtn>
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

const RightBtn = styled.button`
  position: relative;
`;
