/* ViewPage 사용 컴포넌트 */
/* 캘린더(월간,주간,캘린더) */

import { useState } from 'react';
import styled from 'styled-components';
import { MonthlyCalendar } from './MonthlyCalendar';
import { CalendarNavigation } from './CalendarNavigation';
import { WeeklyCalendar } from './WeeklyCalendar';
import {
  extractDateOnly,
  getStartDateOfWeek,
  getWeekCount,
  getWeekOfMonth,
} from '@/lib/calenderUtils';
import { diaryMockData, moodMockData } from '../MockData';
import DiaryPreviewList from '../DiaryPreviewList';
import DateSelectorModal from './dateSelectorModal/DateSelectorModal';

const tabs = ['월간', '주간'] as const;
type Tab = (typeof tabs)[number];

export const Calendar = () => {
  const today = new Date();
  const [selectedTabMenu, setSelectedTabMenu] = useState<Tab>('월간');
  const [isDateSelectorModal, setIsDateSelectorModal] = useState<boolean>(false);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 4월 (0-indexed)
  const [currentWeek, setCurrentWeek] = useState(getWeekOfMonth(today));
  const [showDateSelector, setShowDateSelector] = useState(false);

  const startDate =
    selectedTabMenu === '월간'
      ? new Date(year, month, 1)
      : getStartDateOfWeek(year, month, currentWeek);

  const endDate =
    selectedTabMenu === '월간'
      ? new Date(year, month + 1, 0)
      : new Date(startDate.getTime() + 6 * 24 * 60 * 60 * 1000);

  const filteredDiaryList = diaryMockData.filter((entry) => {
    const entryDate = extractDateOnly(entry.date);
    const startStr = extractDateOnly(startDate.toISOString());
    const endStr = extractDateOnly(endDate.toISOString());
    return entryDate >= startStr && entryDate <= endStr;
  });

  // DateSelector 완료 시 실행
  const handleDateSelect = (selected: { year: string; month: string; week: string }) => {
    const newYear = Number(selected.year);
    const newMonth = Number(selected.month) - 1;
    const newWeek = Number(selected.week);

    setYear(newYear);
    setMonth(newMonth);

    if (selectedTabMenu === '주간') {
      setCurrentWeek(newWeek);
    }

    setIsDateSelectorModal(false);
  };

  // 월간 - 지난달 보기
  const goToPrevMonth = () => {
    const prev = new Date(year, month - 1);
    setYear(prev.getFullYear());
    setMonth(prev.getMonth());
  };

  // 월간 - 다음달 보기
  const goToNextMonth = () => {
    const next = new Date(year, month + 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  // 주간 - 지난주 보기
  const goToPrevWeek = () => {
    if (currentWeek > 1) {
      setCurrentWeek((prev) => prev - 1);
    } else {
      const prev = new Date(year, month - 1);
      setYear(prev.getFullYear());
      setMonth(prev.getMonth());
      setCurrentWeek(getWeekCount(prev.getFullYear(), prev.getMonth()));
    }
  };

  // 주간 - 다음주 보기
  const goToNextWeek = () => {
    const maxWeek = getWeekCount(year, month);
    if (currentWeek < maxWeek) {
      setCurrentWeek((prev) => prev + 1);
    } else {
      const next = new Date(year, month + 1);
      setYear(next.getFullYear());
      setMonth(next.getMonth());
      setCurrentWeek(1);
    }
  };

  return (
    <Layout>
      {/* 유형탭(월간, 주간) */}
      <CalenderTabMenu>
        <SliderBG $selected={selectedTabMenu} />
        {tabs.map((tab) => (
          <TabMenuItem
            key={tab}
            onClick={() => setSelectedTabMenu(tab)}
            $selected={selectedTabMenu === tab}
          >
            {tab}
          </TabMenuItem>
        ))}
      </CalenderTabMenu>

      {/* 캘린더 */}
      <CalenderView>
        <CalendarNavigation
          year={year}
          month={month}
          week={currentWeek}
          mode={selectedTabMenu}
          onPrev={selectedTabMenu === '월간' ? goToPrevMonth : goToPrevWeek}
          onNext={selectedTabMenu === '월간' ? goToNextMonth : goToNextWeek}
          dateSelectorOn={() => setIsDateSelectorModal(true)}
        />
        {selectedTabMenu === '월간' ? (
          <MonthlyCalendar year={year} month={month} moodData={moodMockData} />
        ) : (
          <WeeklyCalendar year={year} month={month} week={currentWeek} moodData={moodMockData} />
        )}
      </CalenderView>

      {/* 일기미리보기리스트 */}
      <DiaryPreviewList listData={filteredDiaryList} />

      {/* 날짜셀렉모달 */}
      {isDateSelectorModal && (
        <DateSelectorModal
          mode={selectedTabMenu}
          onClose={() => setIsDateSelectorModal(false)}
          onComplete={handleDateSelect}
        />
      )}
    </Layout>
  );
};

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const CalenderTabMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 4px;

  height: 36px;

  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);
`;

const SliderBG = styled.div<{ $selected: Tab }>`
  position: absolute;
  left: ${(props) => (props.$selected === '월간' ? '4px' : '50%')};
  transition: all 0.3s ease;

  width: 52px;
  height: 28px;

  border-radius: 18px;
  background-color: #d2f6ff;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);
`;

const TabMenuItem = styled.button<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  z-index: 1;

  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: -1%;
  font-weight: ${({ $selected }) => ($selected ? '600' : '400')};
  color: ${({ $selected }) => ($selected ? '#00AFD8' : '#A5B7C6')};
`;

const CalenderView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  padding: 24px 31px;
  margin-bottom: 10px;

  width: 358px;

  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 0 4px 2px rgba(0, 175, 216, 0.1);
`;
