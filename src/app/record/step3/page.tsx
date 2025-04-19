// src/app/record/step3/page.tsx
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { IoSearch, IoClose } from 'react-icons/io5';
import { emotionRecordState } from '@/atoms/recordAtoms';
import { Button } from '@/components/common';
import styled from 'styled-components';

const CompleteButtonContainer = styled.div`
  position: fixed;
  bottom: 5px;
  left: 0;
  right: 0;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  z-index: 99999;
  display: flex;
  justify-content: center;
  padding: 16px 24px 30px 24px;
  background-color: white;
`;

// 컴포넌트 import
import KeywordModal from '../../../components/pages/Record/KeywordModal';
import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  ClearButton,
  SearchResultsContainer,
  SearchResultItem,
  TagsContainer,
  Tag,
  TagText,
  TagCloseButton,
  EmptyStateContainer,
  HistoryButton,
  HistoryButtonText,
  HistoryButtonLink,
} from '@/components/styles/RecordStep3.styles';

export default function RecordKeywordsPage() {
  const router = useRouter();
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);
  const [searchText, setSearchText] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(recordData.keywords || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  // 모든 키워드 목록
  const allKeywords = [
    '행복한',
    '웃음',
    '즐거움',
    '감사',
    '설렘',
    '기쁨',
    '즐거운',
    '신남',
    '행복',
    '만족',
    '화남',
    '분노',
    '짜증',
    '불만',
    '답답함',
    '슬픔',
    '우울',
    '공허',
    '그리움',
    '외로움',
  ];

  // page.tsx에 추가
  useEffect(() => {
    const layoutButton =
      document.querySelector('.ButtonContainer') ||
      document.querySelector('div[style*="z-index: 10"]');
    if (layoutButton && layoutButton instanceof HTMLElement) {
      if (isModalOpen) {
        layoutButton.style.visibility = 'hidden'; // display: none 대신 visibility 사용
      } else {
        layoutButton.style.visibility = 'visible';
      }
    }
  }, [isModalOpen]);

  // 검색어에 따라 결과 필터링
  useEffect(() => {
    if (!searchText) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = allKeywords.filter((keyword) =>
      keyword.toLowerCase().includes(searchText.toLowerCase())
    );

    setSearchResults(filtered);
    setShowResults(filtered.length > 0);
  }, [searchText]);

  // 외부 클릭 시 검색 결과 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const current = searchContainerRef.current;
      const target = event.target as Node;

      if (current && target && !current.contains(target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // 컴포넌트 마운트 시 현재 단계 업데이트
  useEffect(() => {
    setRecordData((prev) => ({
      ...prev,
      currentStep: 3,
    }));
  }, [setRecordData]);

  // 모달이 열렸을 때 다음 버튼 숨기기
  useEffect(() => {
    const buttonContainer = document.querySelector('div[style*="z-index: 10"]') as HTMLElement;
    if (buttonContainer) {
      if (isModalOpen) {
        buttonContainer.style.display = 'none';
      } else {
        buttonContainer.style.display = 'flex';
      }
    }
  }, [isModalOpen]);

  // 검색어 입력 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
    if (e.target.value) {
      setShowResults(true);
    }
  };

  // 검색 결과 선택 핸들러
  const handleSelectSearchResult = (keyword: string) => {
    handleToggleKeyword(keyword);
    setSearchText('');
    setShowResults(false);
  };

  // 검색창 클리어 핸들러
  const handleClearSearch = () => {
    setSearchText('');
    setShowResults(false);
  };

  // 키워드 토글 핸들러
  const handleToggleKeyword = (keyword: string) => {
    setSelectedKeywords((prev) => {
      const newKeywords = prev.includes(keyword)
        ? prev.filter((k) => k !== keyword)
        : [...prev, keyword];

      // Recoil 상태 업데이트
      setRecordData((prevData) => ({
        ...prevData,
        keywords: newKeywords,
      }));

      return newKeywords;
    });
  };

  // 태그 삭제 핸들러
  const handleTagRemove = (keyword: string) => {
    handleToggleKeyword(keyword);
  };

  // 다음 단계로 이동
  const handleNext = useCallback(() => {
    router.push('/record/step4');
  }, [router]);

  // 감정 어휘 탐색 모달 열기
  const handleOpenDictionary = () => {
    setIsModalOpen(true);
  };

  // 감정 어휘 탐색 모달 닫기
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // 숨겨진 다음 버튼 (레이아웃의 다음 버튼과 연결)
  useEffect(() => {
    const nextButton = document.getElementById('hidden-next-button');
    if (nextButton) {
      nextButton.onclick = () => handleNext();
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      const nextButton = document.getElementById('hidden-next-button');
      if (nextButton) {
        nextButton.onclick = null;
      }
    };
  }, [handleNext]);

  return (
    <>
      <div ref={searchContainerRef}>
        <SearchContainer>
          <SearchIcon>
            <IoSearch size={20} />
          </SearchIcon>
          <SearchInput
            type="text"
            placeholder="검색해보세요"
            value={searchText}
            onChange={handleSearchChange}
          />
          {searchText && (
            <ClearButton onClick={handleClearSearch}>
              <IoClose size={20} />
            </ClearButton>
          )}
        </SearchContainer>

        {showResults && (
          <SearchResultsContainer>
            {searchResults.map((keyword) => (
              <SearchResultItem key={keyword} onClick={() => handleSelectSearchResult(keyword)}>
                {keyword}
              </SearchResultItem>
            ))}
          </SearchResultsContainer>
        )}
      </div>

      {selectedKeywords.length > 0 && (
        <TagsContainer>
          {selectedKeywords.map((keyword) => (
            <Tag key={keyword}>
              <TagText>{keyword}</TagText>
              <TagCloseButton onClick={() => handleTagRemove(keyword)}>
                <IoClose size={16} />
              </TagCloseButton>
            </Tag>
          ))}
        </TagsContainer>
      )}

      <EmptyStateContainer>
        <HistoryButton onClick={handleOpenDictionary}>
          <HistoryButtonText>다양한 감정들이 무엇이 있는지 보고싶나요?</HistoryButtonText>
          <HistoryButtonLink>감정 어휘 구경하기</HistoryButtonLink>
        </HistoryButton>
      </EmptyStateContainer>

      {/* 키워드 모달 */}
      <KeywordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedKeywords={selectedKeywords}
        onToggleKeyword={handleToggleKeyword}
      />
      {isModalOpen && (
        <CompleteButtonContainer>
          <Button
            variant="primary"
            size="large"
            fullWidth={false}
            onClick={() => setIsModalOpen(false)}
            style={{ width: '356px', height: '44px' }}
          >
            완료
          </Button>
        </CompleteButtonContainer>
      )}

      {/* 숨겨진 다음 버튼 */}
      <button
        id="hidden-next-button"
        type="button"
        style={{ display: 'none' }}
        onClick={handleNext}
      />
    </>
  );
}
