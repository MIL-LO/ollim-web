'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { IoCamera, IoChevronDown } from 'react-icons/io5';
import { emotionRecordState } from '@/atoms/recordAtoms';
import { Section, SectionTitle, ImageUploadButton } from '@/components/styles/RecordStep2.styles';
import styled from 'styled-components';
import { BottomSheetModal } from '@/components/pages/view/BottomSheetModal';

interface CollectionTextProps {
  value: string;
}
// 추가할 스타일 컴포넌트
const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  background-color: #d2f6ff;
  border-radius: 16px;
  padding: 6px 12px;
  font-size: 14px;
  color: #00afd8;
  font-weight: 500;
`;

const BadgeText = styled.span`
  margin-right: 8px;
`;

const DeleteButton = styled.button`
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

// 넓은 텍스트 영역 스타일 추가
const WideTextArea = styled.textarea`
  width: 90%;
  max-width: 400px;
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

// 사진 섹션 스타일 추가
const PhotoSection = styled(Section)`
  align-items: flex-start;
  margin-left: 24px;
`;

// 컬렉션 관련 스타일
const CollectionSection = styled(Section)`
  align-items: flex-start;
  margin-left: 24px;
  width: 90%;
`;

const CollectionInput = styled.div`
  width: 100%;
  height: 48px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0 16px;
  font-size: 14px;
  background-color: white;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #00afd8;
  }
`;

const CollectionText = styled.span<CollectionTextProps>`
  color: ${(props) => (props.value === '선택해주세요' ? '#BDBDBD' : '#333')};
`;

const CollectionListWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CollectionButton = styled.button<{ isSelected: boolean }>`
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

const ModalHeader = styled.div`
  height: 48px;
  background-color: #d2f6ff;
  color: #00afd8;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`;

// 컬렉션 옵션
const collectionOptions = ['학교생활', '연애', '직장생활', '다이어트', '학원'];

export default function RecordDetailPage() {
  const router = useRouter();
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);
  const [content, setContent] = useState(recordData.content || '');
  const [date, setDate] = useState(recordData.date || '');
  const [collection, setCollection] = useState(recordData.collection || '');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 컴포넌트 마운트 시 현재 단계 업데이트
  useEffect(() => {
    setRecordData((prev) => ({
      ...prev,
      currentStep: 2,
    }));
  }, [setRecordData]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Recoil 상태 업데이트
    setRecordData((prev) => ({
      ...prev,
      content: newContent,
    }));
  };

  const handleCollectionSelect = (option: string) => {
    setCollection(option);
    setIsModalOpen(false);

    // 컬렉션 선택 시 즉시 Recoil 상태 업데이트
    setRecordData((prev) => ({
      ...prev,
      collection: option,
    }));
  };

  const handleImageUpload = () => {
    // 이미지 업로드 로직
    console.log('Image upload clicked');
  };

  // useCallback으로 handleNext 함수 메모이제이션
  const handleNext = useCallback(() => {
    // 다음 단계로 이동
    router.push('/record/step3');
  }, [router]);

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
      <Section>
        <WideTextArea value={content} onChange={handleContentChange} placeholder="작성해주세요." />
      </Section>

      <PhotoSection>
        <SectionTitle>첨부하고 싶은 사진이 있나요?</SectionTitle>
        <ImageUploadButton onClick={handleImageUpload}>
          <IoCamera size={24} color="#757575" />
        </ImageUploadButton>
      </PhotoSection>

      <CollectionSection>
        <SectionTitle>어떤 컬렉션에 저장할까?</SectionTitle>
        <CollectionInput onClick={() => setIsModalOpen(true)}>
          <CollectionText>{collection || '선택해주세요'}</CollectionText>
          <IoChevronDown size={18} color="#BDBDBD" />
        </CollectionInput>

        {/* 선택된 컬렉션이 있을 때만 뱃지 표시 */}
        {collection && (
          <BadgeContainer>
            <Badge>
              <BadgeText>{collection}</BadgeText>
              <DeleteButton
                onClick={() => {
                  setCollection('');
                  setRecordData((prev) => ({
                    ...prev,
                    collection: '',
                  }));
                }}
              >
                ×
              </DeleteButton>
            </Badge>
          </BadgeContainer>
        )}
      </CollectionSection>

      {/* 컬렉션 선택 모달 */}
      {isModalOpen && (
        <BottomSheetModal onClose={() => setIsModalOpen(false)}>
          <ModalHeader>학교생활</ModalHeader>
          <CollectionListWrap>
            {collectionOptions.map((option) => (
              <CollectionButton
                key={option}
                onClick={() => handleCollectionSelect(option)}
                isSelected={collection === option}
              >
                {option}
              </CollectionButton>
            ))}
          </CollectionListWrap>
        </BottomSheetModal>
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
