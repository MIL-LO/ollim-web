// 캘린더 날짜 관련 유틸 함수들
// 월요일을 시작 기준으로 사용한 캘린더

export function extractDateOnly(dateStr: string): string {
  return new Date(dateStr).toISOString().split('T')[0];
}

/*--------------------------
 * Date 객체를 'YYYY-MM-DD' 형식의 로컬 키로 변환
 --------------------------*/
export function toLocalDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(
    date.getDate()
  ).padStart(2, '0')}`;
}

/*--------------------------
 * 월간 캘린더 매트릭스 생성 
 --------------------------*/
export function generateCalendarMatrix(year: number, month: number): Date[][] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const matrix: Date[][] = [];

  const firstDayOfWeek = (firstDay.getDay() + 6) % 7; // 월요일=0
  const current = new Date(firstDay);
  current.setDate(current.getDate() - firstDayOfWeek); // 시작 요일 보정

  while (true) {
    const week: Date[] = [];

    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }

    matrix.push(week);

    if (current > lastDay && current.getDay() === 1) break; // 월요일 기준
  }

  return matrix;
}

/*--------------------------
 * 오늘 날짜 기준 주차 계산
 --------------------------*/
export function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = (firstDay.getDay() + 6) % 7; // 월요일 = 0

  const offsetDate = date.getDate() + dayOfWeek;
  return Math.ceil(offsetDate / 7);
}

/*--------------------------
 * 해당 월의 총 주차 수 구하기 
 --------------------------*/
export function getWeekCount(year: number, month: number): number {
  const firstDay = new Date(year, month, 1);
  const dayOfWeek = (firstDay.getDay() + 6) % 7; // 월요일 = 0

  const lastDate = new Date(year, month + 1, 0).getDate();
  const totalCells = dayOfWeek + lastDate;
  return Math.ceil(totalCells / 7);
}

/*--------------------------
 * N주차 시작 날짜
 --------------------------*/
export function getStartDateOfWeek(year: number, month: number, week: number): Date {
  const baseDate = new Date(year, month, 1);
  const firstDay = baseDate.getDay();
  const adjusted = (firstDay + 6) % 7; // ✅ 월요일을 기준으로 보정 (월: 0, 일: 6)

  const startDate = new Date(baseDate);
  startDate.setDate(1 - adjusted + (week - 1) * 7);
  return startDate;
}
