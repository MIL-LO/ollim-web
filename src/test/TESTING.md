# 통합 테스트 가이드

## 개요

Ollim-web 프로젝트는 Vitest와 React Testing Library를 사용하여 기능 단위의 통합 테스트를 작성합니다. 통합 테스트는 여러 컴포넌트와 서비스 호출을 포함한 전체 기능이 올바르게 작동하는지 검증합니다.

## 테스트 환경 설정

### 사용된 도구

- **Vitest**: Jest 호환 테스트 러너로, Vite를 기반으로 하여 빠른 테스트 실행을 제공합니다.
- **React Testing Library**: 사용자 관점에서 컴포넌트를 테스트하는 데 도움을 주는 라이브러리입니다.
- **JSDOM**: 브라우저 환경을 시뮬레이션하는 라이브러리입니다.
- **vi.mock**: 모듈이나 서비스를 모의(mock)하기 위한 Vitest의 함수입니다.

### 설정 파일

프로젝트 루트에 있는 `vitest.config.ts` 파일에서 테스트 환경 설정을 확인할 수 있습니다.

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

## 테스트 디렉토리 구조

통합 테스트는 기능 단위로 구성되며, 일반적으로 다음과 같은 구조를 따릅니다:

```
src/
├── features/
│   ├── Auth/
│   │   ├── AuthFeature.tsx
│   │   └── Auth.integration.test.tsx
│   ├── TodoList/
│   │   ├── TodoApp.tsx
│   │   └── TodoList.integration.test.tsx
│   └── ...
└── ...
```

각 기능별 디렉토리에 `.integration.test.tsx` 파일을 두어 해당 기능의 통합 테스트를 작성합니다.

## 통합 테스트 작성 예시

### 할 일 관리 기능 통합 테스트 예시

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TodoApp from '@/features/TodoList/TodoApp';
import * as todoService from '@/services/todoService';

// 전체 서비스 모킹
vi.mock('@/services/todoService', () => ({
  fetchTodos: vi.fn(),
  addTodo: vi.fn(),
  toggleTodo: vi.fn(),
  deleteTodo: vi.fn(),
}));

// 테스트용 데이터
const mockTodos = [
  { id: '1', text: '리액트 공부하기', completed: false },
  { id: '2', text: '타입스크립트 공부하기', completed: true },
];

describe('할 일 관리 기능 통합 테스트', () => {
  beforeEach(() => {
    // 모든 모킹 초기화
    vi.resetAllMocks();
    
    // 기본 응답 설정
    vi.mocked(todoService.fetchTodos).mockResolvedValue(mockTodos);
    vi.mocked(todoService.addTodo).mockImplementation((text) => 
      Promise.resolve({ id: '3', text, completed: false })
    );
    vi.mocked(todoService.toggleTodo).mockImplementation((id) => 
      Promise.resolve({ ...mockTodos.find(todo => todo.id === id)!, completed: !mockTodos.find(todo => todo.id === id)!.completed })
    );
    vi.mocked(todoService.deleteTodo).mockResolvedValue(undefined);
  });

  it('초기 로딩 시 할 일 목록을 가져와 표시해야 합니다', async () => {
    render(
      <RecoilRoot>
        <TodoApp />
      </RecoilRoot>
    );

    // 로딩 상태 확인
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    // 데이터 로드 후 할 일 목록 표시 확인
    await waitFor(() => {
      expect(screen.getByText('리액트 공부하기')).toBeInTheDocument();
      expect(screen.getByText('타입스크립트 공부하기')).toBeInTheDocument();
    });

    // API 호출 확인
    expect(todoService.fetchTodos).toHaveBeenCalledTimes(1);
  });

  it('새로운 할 일을 추가할 수 있어야 합니다', async () => {
    render(
      <RecoilRoot>
        <TodoApp />
      </RecoilRoot>
    );

    // 데이터 로드 대기
    await waitFor(() => {
      expect(screen.getByText('리액트 공부하기')).toBeInTheDocument();
    });

    // 새 할 일 입력
    const input = screen.getByPlaceholderText('할 일을 입력하세요');
    fireEvent.change(input, { target: { value: '테스트 코드 작성하기' } });
    
    // 추가 버튼 클릭
    const addButton = screen.getByRole('button', { name: '추가' });
    fireEvent.click(addButton);

    // API 호출 확인
    expect(todoService.addTodo).toHaveBeenCalledWith('테스트 코드 작성하기');
    
    // 새 할 일이 목록에 추가되었는지 확인
    await waitFor(() => {
      expect(screen.getByText('테스트 코드 작성하기')).toBeInTheDocument();
    });
  });

  it('할 일 항목을 클릭하여 완료 상태를 토글할 수 있어야 합니다', async () => {
    render(
      <RecoilRoot>
        <TodoApp />
      </RecoilRoot>
    );

    // 데이터 로드 대기
    await waitFor(() => {
      expect(screen.getByText('리액트 공부하기')).toBeInTheDocument();
    });

    // 미완료 항목 클릭
    const todoItem = screen.getByText('리액트 공부하기');
    fireEvent.click(todoItem);

    // API 호출 확인
    expect(todoService.toggleTodo).toHaveBeenCalledWith('1');
    
    // 완료 상태로 변경되었는지 확인 (스타일 변경 등)
    await waitFor(() => {
      expect(todoItem.closest('li')).toHaveClass('completed');
    });
  });

  it('할 일 항목을 삭제할 수 있어야 합니다', async () => {
    render(
      <RecoilRoot>
        <TodoApp />
      </RecoilRoot>
    );

    // 데이터 로드 대기
    await waitFor(() => {
      expect(screen.getByText('리액트 공부하기')).toBeInTheDocument();
    });

    // 삭제 버튼 클릭
    const deleteButtons = screen.getAllByRole('button', { name: '삭제' });
    fireEvent.click(deleteButtons[0]); // 첫 번째 항목 삭제

    // API 호출 확인
    expect(todoService.deleteTodo).toHaveBeenCalledWith('1');
    
    // 항목이 삭제되었는지 확인
    await waitFor(() => {
      expect(screen.queryByText('리액트 공부하기')).not.toBeInTheDocument();
    });
  });
});
```

### 인증 기능 통합 테스트 예시

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRouter } from 'next/navigation';
import AuthFeature from '@/features/Auth/AuthFeature';
import * as authService from '@/services/authService';

// API 서비스 모킹
vi.mock('@/services/authService', () => ({
  login: vi.fn(),
  register: vi.fn(),
  resetPassword: vi.fn(),
}));

// Next.js 라우터 모킹
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('인증 기능 통합 테스트', () => {
  // 모의 라우터 설정
  const mockPush = vi.fn();
  
  beforeEach(() => {
    vi.resetAllMocks();
    
    // 라우터 모킹 설정
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    } as any);
    
    // 기본 API 응답 설정
    vi.mocked(authService.login).mockResolvedValue({ token: 'mock-token', user: { id: '1', name: '홍길동' } });
    vi.mocked(authService.register).mockResolvedValue({ success: true });
    vi.mocked(authService.resetPassword).mockResolvedValue({ success: true });
  });

  it('유효한 자격 증명으로 로그인하면 홈페이지로 리디렉션해야 합니다', async () => {
    render(
      <RecoilRoot>
        <AuthFeature initialMode="login" />
      </RecoilRoot>
    );

    // 로그인 폼 입력
    fireEvent.change(screen.getByLabelText('이메일'), { 
      target: { value: 'test@example.com' } 
    });
    
    fireEvent.change(screen.getByLabelText('비밀번호'), { 
      target: { value: 'password123' } 
    });

    // 로그인 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    // API 호출 확인
    expect(authService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });

    // 홈페이지로 리디렉션 확인
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('유효하지 않은 자격 증명으로 로그인하면 오류를 표시해야 합니다', async () => {
    // 로그인 실패 모킹
    vi.mocked(authService.login).mockRejectedValue(new Error('이메일 또는 비밀번호가 올바르지 않습니다.'));

    render(
      <RecoilRoot>
        <AuthFeature initialMode="login" />
      </RecoilRoot>
    );

    // 로그인 폼 입력
    fireEvent.change(screen.getByLabelText('이메일'), { 
      target: { value: 'invalid@example.com' } 
    });
    
    fireEvent.change(screen.getByLabelText('비밀번호'), { 
      target: { value: 'wrong-password' } 
    });

    // 로그인 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '로그인' }));

    // 오류 메시지 확인
    await waitFor(() => {
      expect(screen.getByText('이메일 또는 비밀번호가 올바르지 않습니다.')).toBeInTheDocument();
    });

    // 리디렉션하지 않음 확인
    expect(mockPush).not.toHaveBeenCalled();
  });
});
```

## 테스트 실행 방법

### 모든 테스트 실행

```bash
npm test
```

### 특정 테스트 파일만 실행

```bash
npm test -- src/features/TodoList/TodoList.integration.test.tsx
```

### 감시 모드로 테스트 실행 (파일 변경 시 자동 재실행)

```bash
npm test -- --watch
```

### 테스트 커버리지 보고서 생성

```bash
npm test -- --coverage
```

## 통합 테스트 작성 시 주의사항

### 1. 서비스와 데이터 흐름 테스트

통합 테스트는 서비스 호출과 같은 외부 종속성을 모킹하면서도 데이터 흐름을 정확히 테스트해야 합니다.

```tsx
// API 응답 모킹
vi.mocked(userService.fetchUserProfile).mockResolvedValue({
  id: '123',
  name: '홍길동',
  email: 'hong@example.com',
  role: 'user'
});

// 컴포넌트 렌더링
render(<UserProfilePage userId="123" />);

// 데이터가 UI에 올바르게 표시되는지 확인
await waitFor(() => {
  expect(screen.getByText('홍길동')).toBeInTheDocument();
  expect(screen.getByText('hong@example.com')).toBeInTheDocument();
});

// API 호출이 올바른 인자로 호출되었는지 확인
expect(userService.fetchUserProfile).toHaveBeenCalledWith('123');
```

### 2. 사용자 인터랙션 시뮬레이션

사용자의 실제 사용 패턴을 시뮬레이션하여 모든 흐름이 정상적으로 작동하는지 테스트합니다.

```tsx
// 초기 상태 확인
expect(screen.getByText('장바구니가 비어 있습니다')).toBeInTheDocument();

// 제품 추가
fireEvent.click(screen.getByRole('button', { name: '장바구니에 추가' }));

// 장바구니에 제품이 추가되었는지 확인
expect(screen.getByText('장바구니 (1)')).toBeInTheDocument();

// 장바구니 페이지로 이동
fireEvent.click(screen.getByText('장바구니 보기'));

// 장바구니 페이지에 제품이 표시되는지 확인
expect(screen.getByText('제품명: 스마트폰')).toBeInTheDocument();
```

### 3. 오류 상황 테스트

오류 발생 시 UI가 적절히 대응하는지도 테스트해야 합니다.

```tsx
// API 오류 모킹
vi.mocked(orderService.placeOrder).mockRejectedValue(new Error('결제 처리 중 오류가 발생했습니다'));

// 주문하기 버튼 클릭
fireEvent.click(screen.getByRole('button', { name: '주문하기' }));

// 오류 메시지가 표시되는지 확인
await waitFor(() => {
  expect(screen.getByText('결제 처리 중 오류가 발생했습니다')).toBeInTheDocument();
});

// 주문이 처리되지 않았음을 확인
expect(screen.getByRole('button', { name: '주문하기' })).toBeEnabled();
```

## 모킹 가이드

### API 요청 모킹

```tsx
// 전체 모듈 모킹
vi.mock('@/services/productService', () => ({
  fetchProducts: vi.fn(),
  getProductDetails: vi.fn(),
}));

// 성공 응답 모킹
vi.mocked(productService.fetchProducts).mockResolvedValue([
  { id: '1', name: '상품 1', price: 10000 },
  { id: '2', name: '상품 2', price: 20000 },
]);

// 실패 응답 모킹
vi.mocked(productService.getProductDetails).mockRejectedValue(
  new Error('상품을 찾을 수 없습니다')
);
```

### Next.js 라우터 모킹

```tsx
// Next.js 라우터 모킹
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  usePathname: vi.fn(),
  useSearchParams: vi.fn(),
}));

// 라우터 함수 모킹
const mockPush = vi.fn();
vi.mocked(useRouter).mockReturnValue({
  push: mockPush,
  back: vi.fn(),
  // 필요한 다른 메서드들
} as any);

// 리디렉션 확인
expect(mockPush).toHaveBeenCalledWith('/success');
```

### 스토어(Recoil) 모킹

```tsx
// RecoilRoot로 감싸서 실제 상태 관리 사용
render(
  <RecoilRoot>
    <YourComponent />
  </RecoilRoot>
);

// 초기 상태 설정이 필요한 경우
const initializeState = ({ set }) => {
  set(userState, { name: '홍길동', isLoggedIn: true });
};

render(
  <RecoilRoot initializeState={initializeState}>
    <YourComponent />
  </RecoilRoot>
);
```

## 통합 테스트 작성 팁

1. **사용자 관점에서 테스트하기**: 사용자 경험 흐름을 따라가며 테스트를 작성하세요.
2. **핵심 비즈니스 기능 우선**: 가장 중요한 비즈니스 기능과 사용자 시나리오를 먼저 테스트하세요.
3. **과도한 모킹 피하기**: 필요한 부분만 모킹하고, 가능한 한 실제 구현을 사용하세요.
4. **오류 상황 고려하기**: 성공 케이스뿐만 아니라 실패 케이스도 테스트하세요.
5. **테스트 가독성 높이기**: 서술적인 테스트 이름과 명확한 구조로 테스트 의도를 드러내세요.

## 참고 자료

- [Vitest 공식 문서](https://vitest.dev/)
- [React Testing Library 공식 문서](https://testing-library.com/docs/react-testing-library/intro/)
- [Next.js 테스팅 가이드](https://nextjs.org/docs/testing)
- [Recoil 테스트 작성 방법](https://recoiljs.org/docs/guides/testing/)
