import styled from 'styled-components';

// 검색 관련 스타일
export const SearchContainer = styled.div`
  position: relative;
  width: 90%;
  max-width: 370px;
  margin: 0 auto 20px auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 16px 0 40px;
  font-size: 14px;
  background-color: white;

  &::placeholder {
    color: #bdbdbd;
  }

  &:focus {
    outline: none;
    border-color: #00afd8;
  }
`;

export const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #00afd8;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  color: #bdbdbd;
  font-size: 20px;
  cursor: pointer;
`;

export const SearchResultsContainer = styled.div`
  width: 90%;
  max-width: 330px;
  margin: 0 auto;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const SearchResultItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #f5f5f5;

  &:hover {
    background-color: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
  width: 90%;
  max-width: 330px;
  margin: 0 auto 24px auto;
`;

export const Tag = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #00afd8;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  color: #00afd8;
`;

export const TagText = styled.span`
  margin-right: 8px;
`;

export const TagCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #00afd8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EmptyStateContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
`;

export const HistoryButton = styled.div`
  background-color: #d2f6ff;
  border-radius: 8px;
  padding: 16px;
  margin-top: auto;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 357px;
  height: 80px;
  cursor: pointer;
`;

export const HistoryButtonText = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const HistoryButtonLink = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #00afd8;
`;

// 모달 관련 스타일
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const SelectedKeywordTag = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #00afd8;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  color: #00afd8;
  margin: 6px 0;
  width: fit-content;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  background-color: white;
  width: 100%;
  max-width: 480px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  z-index: 1001;
  padding-top: 8px;
`;

export const ModalHeader = styled.div`
  position: relative;
  margin-bottom: 16px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 8px;
  right: 16px;
  background: none;
  border: none;
  font-size: 24px;
  color: #333;
  cursor: pointer;
  z-index: 10;
`;

export const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 16px;
`;

export const Tab = styled.div<{ active: boolean }>`
  text-align: center;
  padding: 12px 8px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? '700' : '400')};
  color: ${(props) => (props.active ? '#00AFD8' : '#A5B7C6')};
  border-bottom: ${(props) => (props.active ? '2px solid #00AFD8' : 'none')};
  cursor: pointer;
  flex: 1;
`;

export const KeywordList = styled.div`
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
`;

export const SelectedTag = styled.div`
  display: inline-flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #00afd8;
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 12px;
  color: #00afd8;
  float: right;
`;

export const KeywordItem = styled.div<{ selected: boolean }>`
  padding: 12px 0;
  font-size: 14px;
  color: ${(props) => (props.selected ? '#00AFD8' : '#666')};
  font-weight: ${(props) => (props.selected ? '600' : '400')};
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SelectedKeywordBadge = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #00afd8;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 14px;
  color: #00afd8;
  margin-bottom: 8px;
`;

export const ConfirmButton = styled.button`
  width: 100%;
  height: 56px;
  background-color: #00afd8;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
