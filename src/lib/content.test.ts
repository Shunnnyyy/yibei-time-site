import { describe, expect, it } from "vitest";
import { coffeeProfiles, stories } from "./content";

describe("coffee finder content", () => {
  const timeBands = [
    "08:00",
    "10:00",
    "12:00",
    "14:00",
    "16:00",
    "18:00",
    "20:00",
    "22:00",
    "anytime",
  ];
  const ageBands = ["teen", "student", "young_adult", "adult", "open"];
  const sizes = ["sm", "md", "lg"];

  it("links every coffee profile to an existing story", () => {
    const storySlugs = new Set(stories.map((story) => story.slug));

    for (const profile of coffeeProfiles) {
      expect(storySlugs.has(profile.storySlug)).toBe(true);
    }
  });

  it("keeps coffee profiles localized", () => {
    for (const profile of coffeeProfiles) {
      expect(profile.name.zh).toBeTruthy();
      expect(profile.name.en).toBeTruthy();
      expect(profile.icon).toBeTruthy();
      expect(profile.description.zh).toBeTruthy();
      expect(profile.description.en).toBeTruthy();
    }
  });

  it("keeps coffee object controls complete", () => {
    for (const profile of coffeeProfiles) {
      expect(timeBands).toContain(profile.timeBand);
      expect(ageBands).toContain(profile.ageBand);
      expect(sizes).toContain(profile.baseSize);
      expect(profile.scatter.x).toBeGreaterThanOrEqual(0);
      expect(profile.scatter.x).toBeLessThanOrEqual(100);
      expect(profile.scatter.y).toBeGreaterThanOrEqual(0);
      expect(profile.scatter.y).toBeLessThanOrEqual(100);
      expect(Number.isFinite(profile.scatter.rotate)).toBe(true);
    }
  });
});
