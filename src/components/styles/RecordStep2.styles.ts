// components/styles/RecordStep2.styles.ts
import styled from 'styled-components';

export const SectionTitle = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: #333;
  margin-bottom: 12px;
  text-align: center;
`;

export const SubText = styled.p`
  font-size: 12px;
  color: #666;
  margin-bottom: 16px;
  text-align: center;
`;

export const TextArea = styled.textarea`
  width: 359px;
  height: 284px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  font-size: 14px;
  font-family: inherit;
  resize: none;
  background-color: white;
  margin-bottom: 24px;
  margin-left: auto;
  margin-right: auto;
  display: block;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #00afd8;
  }
`;

export const Section = styled.div`
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImageUploadButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: #f2f2f2;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  margin-bottom: 24px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const DateInput = styled.input`
  width: 359px;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  background-color: white;
  margin-bottom: 24px;
  display: block;
  margin-left: auto;
  margin-right: auto;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #00afd8;
  }
`;

// 드롭다운 컴포넌트에 타입 정의 추가
export const DropdownContainer = styled.div`
  position: relative;
  width: 359px;
  margin: 0 auto;
`;

export const DropdownButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  color: #333;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:focus {
    outline: none;
    border-color: #00afd8;
  }
`;

// isOpen 타입을 명시적으로 정의
export const DropdownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-top: 4px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const DropdownItem = styled.div`
  padding: 12px 16px;
  font-size: 14px;
  color: #333;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  &.selected {
    color: #00afd8;
    font-weight: 500;
  }
`;

// 페이지에서 필요한 추가 스타일
export const PhotoSection = styled(Section)`
  align-items: flex-start;
  margin-left: 24px;
`;

export const CollectionSection = styled(Section)`
  align-items: flex-start;
  margin-left: 24px;
  width: 90%;
`;

export const CollectionInput = styled.div`
  width: 100%;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  background-color: white;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #00afd8;
  }
`;

export const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

export const Badge = styled.div`
  display: flex;
  align-items: center;
  background-color: #d2f6ff;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 14px;
  color: #00afd8;
  font-weight: 500;
`;

export const BadgeText = styled.span`
  margin-right: 8px;
`;

export const DeleteButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #00afd8;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CollectionListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollectionButton = styled.button<{ isSelected: boolean }>`
  height: 44px;
  background-color: ${({ isSelected }) => (isSelected ? '#D2F6FF' : 'none')};
  color: ${({ isSelected }) => (isSelected ? '#00AFD8' : '#A5B7C6')};
  font-weight: ${({ isSelected }) => (isSelected ? 700 : 500)};
  border: none;
  text-align: center;
  cursor: pointer;

  ${({ isSelected }) =>
    !isSelected &&
    `
    &:hover {
      background-color: #f5f9fb;
    }
  `}
`;

export const ModalHeader = styled.div`
  height: 48px;
  background-color: #d2f6ff;
  color: #00afd8;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;
