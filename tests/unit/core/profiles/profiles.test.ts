import { describe, expect, it } from "vitest";
import { LEARNING_PROFILE_IDS } from "@/core/domain/learning-profile";
import { getProfile, isLearningProfileId, listProfiles } from "@/core/profiles";

describe("perfis de aprendizagem", () => {
  it("possui um perfil registrado para cada id", () => {
    for (const id of LEARNING_PROFILE_IDS) {
      expect(getProfile(id).id).toBe(id);
    }
    expect(listProfiles()).toHaveLength(LEARNING_PROFILE_IDS.length);
  });

  it("define regras de conteúdo, visuais e referências em todos os perfis", () => {
    for (const profile of listProfiles()) {
      expect(profile.content.guidelines.length).toBeGreaterThan(0);
      expect(profile.content.avoid.length).toBeGreaterThan(0);
      expect(profile.visual.fontSizePt).toBeGreaterThanOrEqual(12);
      expect(profile.visual.lineSpacing).toBeGreaterThanOrEqual(1.5);
      expect(profile.references.length).toBeGreaterThan(0);
      expect(typeof profile.content.highlightKeywords).toBe("boolean");
    }
  });

  it("reconhece apenas ids válidos", () => {
    expect(isLearningProfileId("dyslexia")).toBe(true);
    expect(isLearningProfileId("outro")).toBe(false);
  });
});