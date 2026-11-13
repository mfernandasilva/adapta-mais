"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AdaptApiError, requestAdaptation } from "@/client/adapt-api";
import type { AdaptRequest, AdaptResult } from "@/client/adapt-api";

export type AdaptState =
  | { readonly status: "idle" }
  | { readonly status: "loading" }
  | { readonly status: "success"; readonly result: AdaptResult }
  | { readonly status: "error"; readonly message: string };

const UNEXPECTED_ERROR = "Ocorreu um erro inesperado. Tente novamente.";

export function useAdaptActivity() {
  const [state, setState] = useState<AdaptState>({ status: "idle" });
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => () => controllerRef.current?.abort(), []);

  const adapt = useCallback(async (request: AdaptRequest) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setState({ status: "loading" });

    try {
      const result = await requestAdaptation(request, controller.signal);
      setState({ status: "success", result });
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      const message = error instanceof AdaptApiError ? error.message : UNEXPECTED_ERROR;
      setState({ status: "error", message });
    }
  }, []);

  return { state, adapt };
}