import { describe, expect, it } from "vitest";
import { coffeeProfiles, stories } from "./content";

describe("coffee finder content", () => {
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
      expect(profile.description.zh).toBeTruthy();
      expect(profile.description.en).toBeTruthy();
    }
  });
});
