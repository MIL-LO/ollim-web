import styled from 'styled-components';
import { EditSVG, ExitSVG, HeartSVG } from '../../../../public/svg/Icons';
import { useState } from 'react';
import { DiaryEntry } from './MockData';
import { moodMap } from '@/constants/moodMap';

const DiaryPreviewList = ({ listData }: { listData: DiaryEntry[] }) => {
  return (
    <DiaryPreviewWrapper>
      <ScrollableList>
        {listData.map((i) => (
          <PreviewItem key={i.id} data={i} />
        ))}
      </ScrollableList>
    </DiaryPreviewWrapper>
  );
};

export default DiaryPreviewList;

export const PreviewItem = ({ data }: { data: DiaryEntry }) => {
  const moodInfo = moodMap[data.mood];

  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [isEditToggle, setIsEditToggle] = useState<boolean>(false);

  return (
    <PreviewItemLayout>
      <Mood style={{ backgroundColor: moodInfo.color }}>
        <img src={moodInfo.icon} alt={moodInfo.title} width={48} />
      </Mood>
      <Contents>
        <p className="date">{data.date}</p>
        <p className="content">{data.content}</p>
      </Contents>
      <Action>
        <div style={{ position: 'relative' }}>
          <button onClick={() => setIsEditToggle(!isEditToggle)}>
            <EditSVG />
          </button>
          {isEditToggle && (
            <EditToggle exit={() => setIsEditToggle(false)} onEdit={() => {}} onDel={() => {}} />
          )}
        </div>

        <button onClick={() => setIsHeart(!isHeart)}>
          <HeartSVG color={isHeart ? '#00AFD8' : '#E8ECEF'} />
        </button>
      </Action>
    </PreviewItemLayout>
  );
};

export const EditToggle = ({
  exit,
  onEdit,
  onDel,
}: {
  exit: () => void;
  onEdit: () => void;
  onDel: () => void;
}) => {
  return (
    <EditToggleLayout>
      <button id="exitBtn" onClick={exit} style={{ marginRight: '12px' }}>
        <ExitSVG color="#04192B" />
      </button>
      <div className="btnWrap">
        <button id="editBtn" onClick={onEdit}>
          수정하기
        </button>
        <button id="delBtn" onClick={onDel}>
          삭제하기
        </button>
      </div>
    </EditToggleLayout>
  );
};

const DiaryPreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%; // 전체 뷰 높이 기준

  background-color: #fff;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);
`;

const ScrollableList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px 0;
  padding-bottom: 180px;
`;

const PreviewItemLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  padding: 8px 16px;

  height: 76px;

  cursor: pointer;
`;

const Mood = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  border-radius: 30px;
  background-color: #00afd8;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  flex: 1;

  .date {
    color: #a5b7c6;
    font-size: 0.625rem;
    line-height: 0.875rem;
    letter-spacing: -1%;
    font-weight: 400;
  }
  .content {
    color: #04192b;
    font-size: 0.75rem;
    line-height: 1rem;
    letter-spacing: -1%;
    font-weight: 400;
  }
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 100%;

  position: relative;
`;

const EditToggleLayout = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 12px;

  padding: 12px 0;
  z-index: 1;

  width: 120px;

  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 0 20px 2px rgba(4, 25, 43, 0.1);

  .btnWrap {
    display: flex;
    flex-direction: column;

    width: 100%;

    button {
      &:hover {
        background-color: #f5f9fb;
      }
    }
  }

  #editBtn,
  #delBtn {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 44px;
  }
`;
