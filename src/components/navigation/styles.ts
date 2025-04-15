import styled from 'styled-components';

export const NavigationWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 160px;
  z-index: 10;
  background: none;
  margin: 0 auto;

  /* Center the navigation on larger screens */
  @media (min-width: 768px) {
    width: 390px;
    max-width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }

  /* Adjust for smaller screens */
  @media (max-width: 360px) {
    height: 150px;
  }

  /* Extra safe area for iOS devices with home indicator */
  @supports (-webkit-touch-callout: none) {
    height: 165px;
  }
`;

export const NavBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  filter: drop-shadow(0px -2px 5px rgba(0, 0, 0, 0.05));

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    max-height: 100%;
  }
`;

export const NavBar = styled.nav`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  position: absolute;
  bottom: 15px;
  z-index: 5;
  background: none;
  padding: 0; /* 패딩 제거 */

  /* More space on smaller screens */
  @media (max-width: 360px) {
    bottom: 15px;
    height: 85px;
  }

  /* Balanced spacing for medium screens */
  @media (min-width: 361px) and (max-width: 480px) {
    bottom: 15px;
    height: 90px;
  }

  /* Comfortable spacing for larger screens */
  @media (min-width: 481px) {
    bottom: 15px;
    height: 95px;
  }

  /* Extra safe area for iOS devices with home indicator */
  @supports (-webkit-touch-callout: none) {
    bottom: 18px;
  }
`;

interface MenuItemProps {
  isActive?: boolean;
  isPrimary?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

export const MenuItem = styled.div<MenuItemProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: ${(props) => (props.isPrimary ? 1 : 0.6)}; /* 중앙 버튼은 그대로, 다른 아이템은 줄임 */
  height: 100%;
  gap: 4px;
  cursor: pointer;
  padding-bottom: 5px;
  position: relative;
  margin-top: ${(props) => (props.isPrimary ? '0' : '15px')};

  /* 첫 번째와 두 번째 아이템 더 왼쪽으로 */
  &:first-child {
    margin-right: 8%; /* 첫 번째 아이템과 두 번째 아이템 사이 간격 */
    margin-left: 5%; /* 왼쪽 끝에서 첫 번째 아이템까지 간격 */
  }

  &:nth-child(2) {
    margin-right: 8%; /* 두 번째 아이템과 중앙 아이템 사이 간격 */
  }

  /* 중앙 아이템 */
  &:nth-child(3) {
    flex: 1.8; /* 중앙 아이템에 더 많은 공간 할당 */
  }

  /* 네 번째와 다섯 번째 아이템 더 오른쪽으로 */
  &:nth-child(4) {
    margin-left: 8%; /* 중앙 아이템과 네 번째 아이템 사이 간격 */
  }

  &:nth-child(5) {
    margin-left: 8%; /* 네 번째 아이템과 다섯 번째 아이템 사이 간격 */
    margin-right: 5%; /* 오른쪽 끝과 다섯 번째 아이템 사이 간격 */
  }

  /* Adjust positioning for very small screens */
  @media (max-width: 320px) {
    padding-bottom: 2px;
    margin-top: ${(props) => (props.isPrimary ? '0' : '12px')};
    gap: 3px;

    &:first-child {
      margin-right: 5%;
      margin-left: 3%;
    }

    &:nth-child(2) {
      margin-right: 5%;
    }

    &:nth-child(4) {
      margin-left: 5%;
    }

    &:nth-child(5) {
      margin-left: 5%;
      margin-right: 3%;
    }
  }

  /* 큰 화면에 맞게 조정 */
  @media (min-width: 768px) {
    margin-top: ${(props) => (props.isPrimary ? '0' : '18px')};
    gap: 5px;

    &:first-child {
      margin-right: 10%;
      margin-left: 6%;
    }

    &:nth-child(2) {
      margin-right: 10%;
    }

    &:nth-child(4) {
      margin-left: 10%;
    }

    &:nth-child(5) {
      margin-left: 10%;
      margin-right: 6%;
    }
  }
`;

export const CenterButton = styled.div`
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #00bcd4;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  & > span {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  /* 작은 화면에 맞게 조정 */
  @media (max-width: 320px) {
    width: 50px;
    height: 50px;
    top: -10px;
  }

  /* 큰 화면에 맞게 조정 */
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
    top: -14px;
  }
`;

interface LabelProps {
  isActive?: boolean;
}

export const MenuLabel = styled.span<LabelProps>`
  font-size: 12px;
  color: ${({ isActive }) => (isActive ? '#000000' : '#E8ECEF')};
  font-weight: ${({ isActive }) => (isActive ? '500' : '400')};
  width: 100%;
  text-align: center;
  white-space: nowrap;
  overflow: visible;
  position: relative;
  bottom: -5px;

  /* Adjust font size for very small screens */
  @media (max-width: 320px) {
    font-size: 10px;
    bottom: -4px;
  }

  /* Larger text for tablets and larger screens */
  @media (min-width: 768px) {
    font-size: 14px;
    bottom: -6px;
  }
`;

export const PrimaryMenuLabel = styled(MenuLabel)`
  margin-top: 25px;
  position: absolute;
  bottom: 22px;
  width: 100%;
  text-align: center;

  /* Adjust positioning for different screen sizes */
  @media (max-width: 320px) {
    margin-top: 22px;
    bottom: 18px;
  }

  @media (min-width: 768px) {
    margin-top: 28px;
    bottom: 24px;
  }
`;

export const IconContainer = styled.div<LabelProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10px;
  height: 10px;
  margin-bottom: 2px;

  & > span {
    width: 20px !important;
    height: 20px !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;

    /* Adjust icon size for smaller screens */
    @media (max-width: 320px) {
      width: 18px !important;
      height: 18px !important;
    }

    /* Larger icons for better visibility on large screens */
    @media (min-width: 768px) {
      width: 22px !important;
      height: 22px !important;
    }
  }

  filter: ${(props) =>
    props.isActive
      ? 'brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(324deg) brightness(96%) contrast(104%)'
      : 'brightness(0) saturate(100%) invert(92%) sepia(4%) saturate(167%) hue-rotate(182deg) brightness(97%) contrast(92%)'};
`;

export const BottomIndicatorArea = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 34px;
  background-color: #f5f5f5;
  z-index: 1;
  border-radius: 0 0 15px 15px;

  /* Adjust height for notch phones and different devices */
  @media (max-height: 700px) {
    height: 30px;
  }

  @media (min-height: 800px) {
    height: 34px;
  }

  /* Extra safe area for iOS devices with home indicator */
  @supports (-webkit-touch-callout: none) {
    height: 36px;
  }
`;
