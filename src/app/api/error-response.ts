import { NextResponse } from "next/server";
import { AppError } from "@/core/domain/errors";

export function toErrorResponse(error: unknown): NextResponse {
  if (error instanceof AppError) {
    if (error.cause) {
      console.error(`[${error.code}]`, error.cause);
    }
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.httpStatus },
    );
  }

  console.error("[UNEXPECTED_ERROR]", error);
  return NextResponse.json(
    { error: { code: "INTERNAL_ERROR", message: "Erro interno inesperado." } },
    { status: 500 },
  );
}
