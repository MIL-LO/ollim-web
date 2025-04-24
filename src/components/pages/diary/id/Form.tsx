import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  BelowArrowSVG,
  CameraSVG,
  PebbleExitSVG,
  PebblePlusSVG,
} from '../../../../../public/svg/Icons';
import { CameraButton } from '@/components/common/Button/CameraButton';
import { Input } from '@/components/common';

type DiaryType = 'edit' | 'view';

// [A] 섹션(일기)
export const DiarySection = ({ type }: { type: DiaryType }) => {
  return (
    <Layout>
      <MoodEmotionForm type={type} />
      <TextForm type={type} />
      <PhotoForm type={type} />
      <CollectionsForm type={type} />
    </Layout>
  );
};

// [B] 섹션(추천콘텐츠)
export const RecommendSection = ({ type }: { type: DiaryType }) => {
  const [photoUrl, setPhotoUrl] = useState<string>('');

  return (
    <>
      {photoUrl === '' && (
        <RecommendSectionLayout>
          <FormTitle>첨부하고 싶은 사진이 있나요?</FormTitle>
          <CameraButton />
        </RecommendSectionLayout>
      )}
      <RecommendForm type={type} />
    </>
  );
};

// [1] 기분,감정 폼
export const MoodEmotionForm = ({ type }: { type: DiaryType }) => {
  const [isEditMode, setIsEditMode] = useState<string>('view');

  return (
    <>
      {type === 'view' && (
        <MoodEmotionLayout>
          <MoodEmotionContainer>
            <MoodIcon />
            <div className="wrap">
              <MoodTitle>기분이 조금 별로에요</MoodTitle>
              <Emotions>
                <button>행복한</button>
                <button>기쁜</button>
                <button>절망스러운</button>
              </Emotions>
            </div>
          </MoodEmotionContainer>
        </MoodEmotionLayout>
      )}

      {type === 'edit' && (
        <MoodEmotionLayout>
          <MoodEmotionContainer>
            <MoodIcon />
            <div className="wrap">
              <MoodTitle>
                <span>기분이 조금 별로에요</span>
                <BelowArrowSVG />
              </MoodTitle>
            </div>
          </MoodEmotionContainer>
          <Emotions>
            <button>
              <span>행복한</span>
              <span>
                <PebbleExitSVG />
              </span>
            </button>
            <button>
              <span>기쁜</span>
              <span>
                <PebbleExitSVG />
              </span>
            </button>
            <button>
              <span>절망스러운</span>
              <span>
                <PebbleExitSVG />
              </span>
            </button>
            <button id="plus">
              <PebblePlusSVG />
            </button>
          </Emotions>
        </MoodEmotionLayout>
      )}
    </>
  );
};

// [2] 일기 내용(text) 폼
export const TextForm = ({ type }: { type: DiaryType }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (type === 'edit' && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [type]);

  return (
    <>
      {type === 'view' && (
        <TextWrap>
          <p>
            글을 입력해주세요 글을 입력해주세요 글을 입력해주세요 글을 입력해주세요 글을
            입력해주세요 글을 입력해주세요 오늘은 이런일 저런일 조런일 저런일 오늘은 이런일 저런일
            조런일 저런일 오늘은 이런일 저런일 조런일 저런일 오늘은 이런일 저런일 조런일 저런일
            오늘은 이런일 저런일 조런일 저런일 오늘은 이런일 저런일 조런일 저런일 오늘은 이런일
            저런일 조런일 저런일 오늘은 이런일 저런일 조런일 저런일
          </p>
        </TextWrap>
      )}

      {type === 'edit' && (
        <TextWrap>
          <textarea
            ref={textareaRef}
            defaultValue="글을 입력해주세요 글을 입력해주세요 글을 입력해주세요 글을 입력해주세요 글을
            입력해주세요 글을 입력해주세요 오늘은 이런일 저런일 조런일 저런일 오늘은 이런일 저런일
            조런일 저런일 오늘은 이런일 저런일 조런일 저런일 오늘은 이런일 저런일 조런일 저런일
            오늘은 이런일 저런일 조런일 저런일 오늘은 이런일 저런일 조런일 저런일 오늘은 이런일
            저런일 조런일 저런일 오늘은 이런일 저런일 조런일 저런일"
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = `${target.scrollHeight}px`;
            }}
          />
        </TextWrap>
      )}
    </>
  );
};

// [3] 사진 첨부 폼
export const PhotoForm = ({ type }: { type: DiaryType }) => {
  const [photoUrl, setPhotoUrl] = useState<string>('');

  return (
    <>
      {photoUrl !== '' && (
        <PhotoLayout>
          {type === 'edit' && (
            <HoverBG>
              <CameraSVG />
              <p>사진 변경 시 클릭해주세요</p>
            </HoverBG>
          )}
        </PhotoLayout>
      )}
    </>
  );
};

// [4] 컬렉션 폼
export const CollectionsForm = ({ type }: { type: DiaryType }) => {
  return (
    <CollectionsLayout>
      <span>가족</span>
      <span>직장생활</span>
    </CollectionsLayout>
  );
};

export const RecommendForm = ({ type }: { type: DiaryType }) => {
  return (
    <>
      {type === 'view' && (
        <RecommendSectionLayout>
          <FormTitle>소진님을 위한 AI 추천 콘텐츠</FormTitle>
          <Layout>
            <></>
          </Layout>
        </RecommendSectionLayout>
      )}

      {type === 'edit' && (
        <RecommendSectionLayout>
          <FormTitle>어떤 컬렉션에 저장할까?</FormTitle>
        </RecommendSectionLayout>
      )}
    </>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  padding: 32px 16px;

  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);

  color: #04192b;
`;

const MoodEmotionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const MoodEmotionContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 12px;
  align-items: center;

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
`;
const MoodIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 60px;
  height: 60px;

  border-radius: 50%;
  background-color: #00afd8;
`;
const MoodTitle = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;

  color: #04192b;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
`;
const Emotions = styled.div`
  display: flex;
  gap: 4px;

  button {
    display: flex;
    align-items: center;
    gap: 4px;

    padding: 4px 12px;

    border-radius: 18px;
    border: 1px solid #00afd8;
    box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);

    color: #00afd8;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
  }
  #plus {
    background-color: #00afd8;
  }
`;

const TextWrap = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.25rem;

  textarea {
    resize: none;
    white-space: pre-wrap;
    word-break: break-word;
    border: none;
    outline: none;
    overflow: hidden;

    width: 100%;

    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.25rem;
  }
`;

const PhotoLayout = styled.button`
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;

  border-radius: 8px;
  background-image: url('/images/testDiaryPhoto.png');
`;
const HoverBG = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;

  width: 100%;
  height: 100%;

  * {
    display: none;
  }

  &:hover {
    * {
      display: flex;
    }
    background-color: rgba(4, 25, 43, 0.8);
  }
`;

const CollectionsLayout = styled.div`
  display: flex;
  gap: 8px;

  span {
    padding: 4px 8px;

    border-radius: 4px;
    background-color: #d2f6ff;
    box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);

    color: #00afd8;
  }
`;

const RecommendSectionLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FormTitle = styled.div`
  color: #04192b;
  font-size: 1.0625rem;
  font-weight: 700;
  line-height: 1.5rem;
`;
