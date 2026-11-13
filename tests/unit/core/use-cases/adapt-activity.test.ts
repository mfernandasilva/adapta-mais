import { describe, expect, it, vi } from "vitest";
import type { AdaptedActivity } from "@/core/domain/activity";
import { ValidationError } from "@/core/domain/errors";
import type { ActivityAdapter } from "@/core/ports/activity-adapter.port";
import { AdaptActivityUseCase } from "@/core/use-cases/adapt-activity";

const adaptedActivity: AdaptedActivity = {
  title: "Atividade",
  passage: [],
  instructions: ["Leia a questão."],
  questions: [{ number: 1, statement: "Quanto é 2 + 2?" }],
};

function createUseCase(maxChars = 100) {
  const adapt = vi.fn().mockResolvedValue(adaptedActivity);
  const adapter: ActivityAdapter = { adapt };
  return { useCase: new AdaptActivityUseCase(adapter, maxChars), adapt };
}

describe("AdaptActivityUseCase", () => {
  it("adapta a atividade e devolve o perfil usado", async () => {
    const { useCase, adapt } = createUseCase();

    const result = await useCase.execute({
      text: "  Quanto é 2 + 2?  ",
      profileId: "adhd",
    });

    expect(result.activity).toEqual(adaptedActivity);
    expect(result.profile.id).toBe("adhd");
    expect(adapt).toHaveBeenCalledWith(
      expect.objectContaining({ sourceText: "Quanto é 2 + 2?" }),
    );
  });

  it("rejeita texto vazio", async () => {
    const { useCase, adapt } = createUseCase();

    await expect(
      useCase.execute({ text: "   ", profileId: "adhd" }),
    ).rejects.toBeInstanceOf(ValidationError);
    expect(adapt).not.toHaveBeenCalled();
  });

  it("rejeita texto acima do limite", async () => {
    const { useCase } = createUseCase(10);

    await expect(
      useCase.execute({ text: "a".repeat(11), profileId: "adhd" }),
    ).rejects.toBeInstanceOf(ValidationError);
  });

  it("rejeita perfil inexistente", async () => {
    const { useCase } = createUseCase();

    await expect(
      useCase.execute({ text: "texto", profileId: "xyz" }),
    ).rejects.toBeInstanceOf(ValidationError);
  });
});
