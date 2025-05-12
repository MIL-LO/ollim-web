import styled from 'styled-components';
import DiaryPreviewList from '../DiaryPreviewList';
import { diariesByCollection, diaryCollections, diaryMockData } from '../MockData';
import { BelowArrowSVG } from '../../../../../public/svg/Icons';
import { useState } from 'react';
import { BottomSheetModal } from '../BottomSheetModal';

interface SelectedCollectionProps {
  selectedCollectionId: string;
}

export const SelectedCollection = ({
  selectedCollectionId,
  onSelectCollection,
}: SelectedCollectionProps & {
  onSelectCollection: (id: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredList = diariesByCollection[selectedCollectionId] || [];
  const selectedCollection = diaryCollections.find(
    (collection) => collection.id === selectedCollectionId
  );
  const collectionName = selectedCollection?.name ?? '오류';

  const handleCollectionNameClick = (id: string) => {
    onSelectCollection(id);
    setIsModalOpen(false);
  };

  return (
    <>
      {/* 콜렉션 이름 */}
      <CollectionToggle onClick={() => setIsModalOpen(true)}>
        <span>{collectionName}</span>
        <BelowArrowSVG />
      </CollectionToggle>

      {/* 해당 콜렉션 일기 리스트 */}
      <DiaryPreviewList listData={filteredList} />

      {/* 콜렉션 토글 모달 */}
      {isModalOpen && (
        <BottomSheetModal onClose={() => setIsModalOpen(false)}>
          <CollectionListWrap>
            {diaryCollections.map((col) => (
              <CollectionButton
                key={col.id}
                onClick={() => handleCollectionNameClick(col.id)}
                isSelected={col.id === selectedCollectionId}
              >
                {col.name}
              </CollectionButton>
            ))}
          </CollectionListWrap>
        </BottomSheetModal>
      )}
    </>
  );
};

const CollectionToggle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;

  height: 44px;

  font-size: 1.0625rem;
  font-weight: 700;
  color: #04192b;
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
