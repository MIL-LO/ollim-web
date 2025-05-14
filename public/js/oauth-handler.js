// public/js/oauth-handler.js
(function () {
  // 현재 페이지가 JSON 응답인지 확인
  function checkJsonResponse() {
    const bodyText = document.body.innerText || document.body.textContent || '';

    // JSON 형식인지 확인
    if (bodyText.trim().startsWith('{') && bodyText.trim().endsWith('}')) {
      try {
        // JSON 파싱 시도
        JSON.parse(bodyText);

        // 인증 결과 페이지로 이동
        window.location.href = '/oauth-result';
        return true;
      } catch (e) {
        console.error('JSON 파싱 실패:', e);
      }
    }
    return false;
  }

  // 페이지 로드 완료 후 실행
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    checkJsonResponse();
  } else {
    document.addEventListener('DOMContentLoaded', checkJsonResponse);
  }
})();
