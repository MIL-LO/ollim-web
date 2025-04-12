'use client';

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    /* Pretendard 폰트 로드 */
    @import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css");

    * {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    body {
        font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    /* 앱 컨테이너 - 항상 390x844 크기 유지 */
    .app-container {
        width: 390px;
        height: 844px;
        position: relative;
        overflow: hidden;
    }

    /* 화면이 390x844보다 작을 경우, 비율을 유지하면서 축소 */
    @media (max-width: 390px), (max-height: 844px) {
        .app-container {
            width: 100vw;
            height: 100vh;
            transform-origin: center;
            transform: scale(min(
                    1,
                    min(100vw / 390, 100vh / 844)
            ));
        }
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
`;

export default GlobalStyle;