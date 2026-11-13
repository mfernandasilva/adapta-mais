import { describe, expect, it } from "vitest";
import { AiProviderError, ValidationError } from "@/core/domain/errors";

describe("AppError", () => {
  it("expõe código e status HTTP", () => {
    const error = new ValidationError("texto vazio");

    expect(error.code).toBe("VALIDATION_ERROR");
    expect(error.httpStatus).toBe(400);
    expect(error.name).toBe("ValidationError");
  });

  it("preserva a causa original", () => {
    const cause = new Error("timeout");

    expect(new AiProviderError(cause).cause).toBe(cause);
  });
});
