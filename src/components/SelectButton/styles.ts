import styled from 'styled-components';

// 무드 타입 정의
type MoodType = 'verygood' | 'good' | 'soso' | 'bad' | 'toobad';

// 색상 맵핑
const moodColorMap: Record<MoodType, string> = {
  verygood: '#F0FAFD',
  good: '#D2F6FF',
  soso: '#00AFD8',
  bad: '#198ABB',
  toobad: '#254A7E',
};

export const ImageWrapper = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

export const SelectButtonContainer = styled.button<{ selected?: boolean; mood?: MoodType }>`
  width: 268px;
  height: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => {
    if (props.selected && props.mood) {
      return moodColorMap[props.mood];
    }
    return props.selected ? '#F0FAFD' : 'white';
  }};
  border: 1px solid ${(props) => (props.selected ? '#00AFD8' : '#E0E0E0')};
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  margin: 0 auto;

  /* 그림자 색상 적용 */
  box-shadow: 0 2px 6px ${(props) => (props.selected ? '#00AFD81A' : '#FFFFFF4D')} !important;
  -webkit-box-shadow: 0 2px 6px ${(props) => (props.selected ? '#00AFD81A' : '#FFFFFF4D')} !important;
  -moz-box-shadow: 0 2px 6px ${(props) => (props.selected ? '#00AFD81A' : '#FFFFFF4D')} !important;

  &:hover {
    border-color: ${(props) => (props.selected ? '#00AFD8' : '#BDBDBD')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonText = styled.span<{ selected?: boolean; mood?: MoodType }>`
  font-size: 16px;
  font-weight: ${(props) => (props.selected ? '600' : '500')};
  color: ${(props) => {
    if (props.selected && props.mood) {
      // 선택된 상태에서 특정 무드일 때 텍스트 색상 변경
      if (props.mood === 'soso' || props.mood === 'bad' || props.mood === 'toobad') {
        return 'white'; // 어두운 배경색일 때는 흰색 텍스트
      }
    }
    return props.selected ? '#00AFD8' : '#333333';
  }};
`;
