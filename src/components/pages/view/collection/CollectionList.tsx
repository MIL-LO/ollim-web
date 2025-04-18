import { useState } from 'react';
import styled from 'styled-components';
import { EditToggle } from '../DiaryPreviewList';
import { KebabMenuSVG, PlusSVG } from '../../../../../public/svg/Icons';
import { AlertModal, ConfirmModal } from '@/components/common/Modal';
import { diaryCollections } from '@/components/pages/view/MockData';
import { useToast } from '@/hooks/useToast';

export const CollectionList = ({
  setSelectedCollection,
}: {
  setSelectedCollection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const toast = useToast();

  // 모달 상태 (콜렉션 수정,삭제,추가 모달)
  const [isEditModal, setIsEditModal] = useState<boolean>(false);
  const [isDelModal, setIsDelModal] = useState<boolean>(false);
  const [isAddModal, setIsAddModal] = useState<boolean>(false);

  // 콜렉션 삭제
  const handleDelCollection = () => {
    setIsDelModal(false);
    toast.show('삭제되었습니다.');
  };

  return (
    <Layout>
      {diaryCollections.map((collection) => (
        <CollectionItem
          key={collection.id}
          collectionId={collection.id}
          collectionName={collection.name}
          diaryCount={collection.diaryCount}
          setIsEditModal={setIsEditModal}
          setIsDelModal={setIsDelModal}
          setSelectedCollection={setSelectedCollection}
        />
      ))}
      <CollectionAddItem setIsAddModal={setIsAddModal} />
      {isEditModal && (
        <ConfirmModal
          title="콜렉션 수정하기"
          onClose={() => setIsEditModal(false)}
          onYes={() => {}}
          yesBtnName="수정"
        >
          <></>
        </ConfirmModal>
      )}

      {isDelModal && (
        <AlertModal
          title="정말 삭제하시겠습니까?"
          descript="삭제하시면 복구할 수 없습니다."
          noBtnName="취소할래요"
          yesBtnName="삭제할래요"
          onClose={() => setIsDelModal(false)}
          onNo={() => setIsDelModal(false)}
          onYes={handleDelCollection}
        />
      )}
      {isAddModal && (
        <ConfirmModal
          title="콜렉션 추가하기"
          onClose={() => setIsAddModal(false)}
          onYes={() => {}}
          yesBtnName="추가"
        >
          <></>
        </ConfirmModal>
      )}
    </Layout>
  );
};

export const CollectionItem = ({
  collectionId,
  collectionName,
  diaryCount,
  setIsEditModal,
  setIsDelModal,
  setSelectedCollection,
}: {
  collectionId: string;
  collectionName: string;
  diaryCount: number;
  setIsEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDelModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedCollection: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isEditToggle, setIsEditToggle] = useState<boolean>(false);

  return (
    <ItemLayout onClick={() => setSelectedCollection(collectionId)}>
      <Count>{diaryCount}</Count>
      <Title>{collectionName}</Title>
      <EditBtn
        onClick={(e) => {
          e.stopPropagation(); // 클릭 전파 방지
          setIsEditToggle(!isEditToggle);
        }}
      >
        <KebabMenuSVG />
        {isEditToggle && (
          <EditToggle
            exit={() => setIsEditToggle(false)}
            onEdit={() => setIsEditModal(true)}
            onDel={() => setIsDelModal(true)}
          />
        )}
      </EditBtn>
    </ItemLayout>
  );
};

export const CollectionAddItem = ({
  setIsAddModal,
}: {
  setIsAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <ItemLayout style={{ opacity: '0.5' }} onClick={() => setIsAddModal(true)}>
      <Title>
        <PlusSVG />
        <p style={{ fontSize: '12px', lineHeight: '16px', color: '#A5B7C6' }}>콜렉션 추가하기</p>
      </Title>
    </ItemLayout>
  );
};

const Layout = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-items: center;
  padding: 16px;
  gap: 22px;
`;

const ItemLayout = styled.div`
  position: relative;
  aspect-ratio: 1/1;

  background-image: url('/images/collection.png');
  background-position: center;
  background-size: contain;

  max-width: 168px;
  width: 100%;

  cursor: pointer;
`;

const Count = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(0, 16%);

  display: flex;
  justify-content: center;
  align-items: center;

  width: 32px;
  height: 32px;

  border-radius: 50%;
  background-color: #00afd8;

  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
`;

const Title = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;

  padding-top: 17px;
`;

const EditBtn = styled.button`
  position: absolute;
  bottom: 16px;
  right: 16px;
`;
