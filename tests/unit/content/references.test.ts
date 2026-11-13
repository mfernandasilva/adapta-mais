import { describe, expect, it } from "vitest";
import { REFERENCE_GROUPS } from "@/content/references";

const items = REFERENCE_GROUPS.flatMap((group) => group.items);

describe("referências oficiais", () => {
  it("usa apenas links seguros (https)", () => {
    for (const item of items) {
      expect(new URL(item.url).protocol).toBe("https:");
    }
  });

  it("não repete ids nem links", () => {
    expect(new Set(items.map((item) => item.id)).size).toBe(items.length);
    expect(new Set(items.map((item) => item.url)).size).toBe(items.length);
  });

  it("descreve o uso de cada documento", () => {
    for (const item of items) {
      expect(item.summary.length).toBeGreaterThan(0);
      expect(item.usage.length).toBeGreaterThan(0);
    }
  });
});