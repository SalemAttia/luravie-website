"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 bg-coral/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">!</span>
        </div>
        <h2 className="text-3xl font-bold text-teal mb-4">
          Something went wrong
        </h2>
        <p className="text-teal/60 mb-8">
          We encountered an unexpected error. Our team has been notified and is
          working on it.
        </p>
        <button
          onClick={reset}
          className="px-8 py-4 bg-coral text-white rounded-2xl font-bold shadow-lg shadow-coral/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
