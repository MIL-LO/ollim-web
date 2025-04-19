// src/components/KeywordModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import Button from '../../../components/common/Button';
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
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  // 탭 데이터
  const tabs = ['행복한', '즐거운', '분노', '슬픔'];

  // 각 탭별 키워드 데이터
  const keywordsByTab = {
    행복한: ['행복한', '웃음', '즐거움', '감사', '설렘'],
    즐거운: ['기쁨', '즐거운', '신남', '행복', '만족'],
    분노: ['화남', '분노', '짜증', '불만', '답답함'],
    슬픔: ['슬픔', '우울', '공허', '그리움', '외로움'],
  };

  // 포털 요소 설정
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // 포털 컨테이너 생성 또는 획득
      let element = document.getElementById('keyword-modal-portal');
      if (!element) {
        element = document.createElement('div');
        element.id = 'keyword-modal-portal';
        document.body.appendChild(element);
      }
      setPortalElement(element);

      // 컴포넌트 언마운트 시 정리
      return () => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      };
    }
  }, []);

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      // 버튼 컨테이너 스타일 적용
      const buttonContainers = document.querySelectorAll(
        '.ButtonContainer, div[style*="z-index: 10"]'
      );
      buttonContainers.forEach((el) => {
        if (el instanceof HTMLElement) {
          el.style.zIndex = '10';
        }
      });

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // 완료 버튼 클릭 핸들러
  const handleComplete = () => {
    onClose();
  };

  // 배경 클릭 시 모달 닫기
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !portalElement) return null;

  // 포털을 사용하여 모달 렌더링
  return createPortal(
    <ModalRoot>
      <ModalBackdrop onClick={handleBackdropClick}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <CloseButton onClick={onClose}>취소</CloseButton>
            <CompleteButton onClick={handleComplete}>완료</CompleteButton>
          </ModalHeader>

          <ModalContent>
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
                  <KeywordItem
                    key={keyword}
                    selected={false}
                    onClick={() => onToggleKeyword(keyword)}
                  >
                    {keyword}
                  </KeywordItem>
                );
              })}
            </KeywordList>

            <ButtonContainer>
              <Button variant="primary" size="large" fullWidth={true} onClick={handleComplete}>
                완료
              </Button>
            </ButtonContainer>
          </ModalContent>
        </ModalContainer>
      </ModalBackdrop>
    </ModalRoot>,
    portalElement
  );
};

export default KeywordModal;

// 스타일 컴포넌트 정의
const ModalRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999999; /* 극단적으로 높은 z-index */
`;

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(4, 25, 43, 0.8);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 9999999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 480px;
  background-color: white;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  overflow: hidden;
  z-index: 10000000; /* 모달 컨테이너는 배경보다 더 높게 */
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 16px;
  border-bottom: 1px solid #f2f2f2;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
`;

const CompleteButton = styled.button`
  background: none;
  border: none;
  color: #00afd8;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  overflow-y: auto;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border-bottom: 1px solid #f2f2f2;
  padding: 0 16px;
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 24px 30px;
  width: 100%;
`;
