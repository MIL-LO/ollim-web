// src/instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 서버 측 초기화
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
      release: process.env.SENTRY_RELEASE,
    });
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    // Edge 런타임 초기화
    const Sentry = await import('@sentry/nextjs');
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
      release: process.env.SENTRY_RELEASE,
    });
  }
}
