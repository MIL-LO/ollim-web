import { Input } from '@/components/common';
import { media } from '@/styles/mediaQuery';
import styled from 'styled-components';
import { diaryMockData } from '../MockData';
import DiaryPreviewList from '../DiaryPreviewList';
import { useState } from 'react';

export const Search = () => {
  const filteredDiaryList = diaryMockData;
  const [searchValue, setSercuValue] = useState<string>('');

  return (
    <>
      <SearchWrap>
        <Input
          color="#04192B"
          value={searchValue}
          onChange={(e) => {
            setSercuValue(e.target.value);
          }}
        />
      </SearchWrap>
      <DiaryPreviewList listData={filteredDiaryList} />
    </>
  );
};

const SearchWrap = styled.div`
  padding: 16px 16px 0;

  ${media.tablet} {
    padding: 16px 20px 0;
  }
`;
