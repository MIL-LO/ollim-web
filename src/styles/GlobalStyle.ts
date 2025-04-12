'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* Pretendard 폰트 로드 (CDN 사용) */
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html {
        height: 100%;
    }

    body {
        max-width: 100vw;
        overflow-x: hidden;
        min-height: 100%;
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background-color: #f5f5f5; /* 바탕 배경색 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    ul, li {
        list-style: none;
    }

    /* 앱 컨테이너 스타일 */
    .app-container {
        width: 100%;
        max-width: 390px;
        height: 100vh;
        margin: 0 auto;
        position: relative;
        background-color: #00AFD8; /* 앱 배경색 */
        overflow: hidden;
    }

    /* SVG 관련 스타일 수정 */
    svg {
        width: 100%;
        height: auto;
        display: block;
    }

    /* 데스크톱에서의 스타일 */
    @media (min-width: 768px) {
        body {
            padding: 20px;
            background-color: #e0e0e0; /* 데스크톱 배경색 */
        }

        .app-container {
            height: 840px;
            border-radius: 30px; /* 더 둥근 모서리 */
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2); /* 더 깊은 그림자 */
            border: 1px solid rgba(255, 255, 255, 0.2); /* 미묘한 테두리 */
        }

        /* 데스크톱에서만 보이는 모바일 프레임 디자인 */
        .app-container::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 20px;
            background-color: rgba(0, 0, 0, 0.15);
            border-radius: 10px;
            z-index: 100;
        }

        /* 데스크탑에서 SVG 깨짐 방지 */
        svg {
            max-height: 100%;
            object-fit: cover;
        }
    }

    /* 더 큰 화면에서의 스타일 */
    @media (min-width: 1200px) {
        .app-container {
            transform: scale(1.1); /* 약간 키워서 더 잘 보이게 */
            transform-origin: center center;
        }
    }
`;

export default GlobalStyle;