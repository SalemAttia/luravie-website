"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Inter, sans-serif",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              fontWeight: "bold",
              color: "#5B7B7C",
              marginBottom: "1rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "#5B7B7C80",
              marginBottom: "2rem",
              maxWidth: "400px",
            }}
          >
            We encountered an unexpected error. Our team has been notified.
          </p>
          <button
            onClick={reset}
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#E59595",
              color: "white",
              border: "none",
              borderRadius: "1rem",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
