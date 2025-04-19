// src/components/KeywordModal.tsx
'use client';

import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { BottomSheetModal } from '@/components/pages/view/BottomSheetModal';
import styled from 'styled-components';

interface KeywordModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedKeywords: string[];
  onToggleKeyword: (keyword: string) => void;
}

const KeywordModal: React.FC<KeywordModalProps> = ({
  isOpen,
  onClose,
  selectedKeywords,
  onToggleKeyword,
}) => {
  const [activeTab, setActiveTab] = useState('즐거운');

  // 탭 데이터
  const tabs = ['행복한', '즐거운', '분노', '슬픔'];

  // 각 탭별 키워드 데이터
  const keywordsByTab = {
    행복한: ['행복한', '웃음', '즐거움', '감사', '설렘'],
    즐거운: ['기쁨', '즐거운', '신남', '행복', '만족'],
    분노: ['화남', '분노', '짜증', '불만', '답답함'],
    슬픔: ['슬픔', '우울', '공허', '그리움', '외로움'],
  };

  if (!isOpen) return null;

  return (
    <BottomSheetModal onClose={onClose} onNext={onClose} nextText="완료" style={{ zIndex: 9999 }}>
      <TabContainer>
        {tabs.map((tab) => (
          <Tab key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
            {tab}
          </Tab>
        ))}
      </TabContainer>

      <KeywordList>
        {keywordsByTab[activeTab].map((keyword) => {
          const isSelected = selectedKeywords.includes(keyword);
          return isSelected ? (
            <SelectedKeywordTag key={keyword} onClick={() => onToggleKeyword(keyword)}>
              <TagText>{keyword}</TagText>
              <TagCloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleKeyword(keyword);
                }}
              >
                <IoClose size={16} />
              </TagCloseButton>
            </SelectedKeywordTag>
          ) : (
            <KeywordItem key={keyword} selected={false} onClick={() => onToggleKeyword(keyword)}>
              {keyword}
            </KeywordItem>
          );
        })}
      </KeywordList>
    </BottomSheetModal>
  );
};

export default KeywordModal;

// 스타일 컴포넌트 정의
const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 16px;
  z-index: 1010;
`;

const Tab = styled.div<{ active: boolean }>`
  text-align: center;
  padding: 12px 8px;
  font-size: 16px;
  font-weight: ${(props) => (props.active ? '700' : '400')};
  color: ${(props) => (props.active ? '#00AFD8' : '#A5B7C6')};
  border-bottom: ${(props) => (props.active ? '2px solid #00AFD8' : 'none')};
  cursor: pointer;
  flex: 1;
`;

const KeywordList = styled.div`
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1010;
`;

const SelectedKeywordTag = styled.div`
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

const TagText = styled.span`
  margin-right: 8px;
`;

const TagCloseButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: #00afd8;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KeywordItem = styled.div<{ selected: boolean }>`
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
