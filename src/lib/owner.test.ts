import { describe, expect, it } from "vitest";
import { isOwnerGithubId } from "./owner";

describe("isOwnerGithubId", () => {
  it("accepts only the configured owner", () => {
    expect(isOwnerGithubId("123", "123")).toBe(true);
    expect(isOwnerGithubId(123, "123")).toBe(true);
    expect(isOwnerGithubId("124", "123")).toBe(false);
  });

  it("fails closed when the owner is not configured or the id is missing", () => {
    expect(isOwnerGithubId("123", undefined)).toBe(false);
    expect(isOwnerGithubId("", "")).toBe(false);
    expect(isOwnerGithubId(undefined, "123")).toBe(false);
    expect(isOwnerGithubId(null, "123")).toBe(false);
  });
});
