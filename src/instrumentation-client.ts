import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  tracesSampleRate: 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration(),
    Sentry.browserTracingIntegration(),
  ],

  environment: process.env.NODE_ENV,

  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,

  ignoreErrors: [
    "ResizeObserver loop",
    "ResizeObserver loop completed with undelivered notifications",
    "Failed to fetch",
    "NetworkError",
    "Load failed",
  ],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
