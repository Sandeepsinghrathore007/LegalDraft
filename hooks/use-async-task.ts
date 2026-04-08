"use client";

import { useCallback, useState } from "react";

type AsyncStatus = "error" | "idle" | "pending" | "success";

export function useAsyncTask<TArguments extends unknown[], TResult>(
  task: (...arguments_: TArguments) => Promise<TResult>
) {
  const [data, setData] = useState<TResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<AsyncStatus>("idle");

  const execute = useCallback(
    async (...arguments_: TArguments) => {
      setStatus("pending");
      setError(null);

      try {
        const result = await task(...arguments_);
        setData(result);
        setStatus("success");

        return {
          ok: true as const,
          result
        };
      } catch (error_) {
        const message =
          error_ instanceof Error ? error_.message : "Something went wrong while processing your request.";

        setError(message);
        setStatus("error");

        return {
          error: message,
          ok: false as const
        };
      }
    },
    [task]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setStatus("idle");
  }, []);

  return {
    data,
    error,
    execute,
    isError: status === "error",
    isIdle: status === "idle",
    isPending: status === "pending",
    isSuccess: status === "success",
    reset,
    status
  };
}
