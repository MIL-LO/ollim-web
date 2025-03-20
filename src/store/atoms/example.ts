import { atom, selector } from 'recoil';

// 카운터 상태를 위한 atom
export const counterState = atom({
    key: 'counterState',
    default: 0,
});

// 카운터의 두 배 값을 계산하는 selector
export const doubleCounterState = selector({
    key: 'doubleCounterState',
    get: ({ get }) => {
        const count = get(counterState);
        return count * 2;
    },
});
