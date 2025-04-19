'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { IoCamera, IoChevronDown } from 'react-icons/io5';
import { emotionRecordState } from '@/atoms/recordAtoms';
import {
  Section,
  SectionTitle,
  TextArea,
  ImageUploadButton,
  PhotoSection,
  CollectionSection,
  CollectionInput,
  BadgeContainer,
  Badge,
  BadgeText,
  DeleteButton,
  CollectionListWrap,
  CollectionButton,
  ModalHeader,
} from '@/components/styles/RecordStep2.styles';
import { BottomSheetModal } from '@/components/pages/view/BottomSheetModal';
import styled from 'styled-components';

interface CollectionTextProps {
  value: string;
}

const CollectionText = styled.span<CollectionTextProps>`
  color: ${(props) => (props.value === '선택해주세요' ? '#BDBDBD' : '#333')};
`;

// 컬렉션 옵션
const collectionOptions = ['학교생활', '연애', '직장생활', '다이어트', '학원'];

export default function RecordDetailPage() {
  const router = useRouter();
  const [recordData, setRecordData] = useRecoilState(emotionRecordState);
  const [content, setContent] = useState(recordData.content || '');
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
        <TextArea value={content} onChange={handleContentChange} placeholder="작성해주세요." />
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
          <CollectionText value={collection || '선택해주세요'}>
            {collection || '선택해주세요'}
          </CollectionText>
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
