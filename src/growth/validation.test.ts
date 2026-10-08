import { expect, it } from "vitest";
import { profileInput, studyInput } from "./validation";
import { DEFAULT_PROFILE } from "./model";

it("validates real calendar dates, optional text and safe reference schemes", () => {
  const valid = {
    topicCode: "topic.transactions",
    studiedOn: "2026-10-05",
    notes: " ",
    link: "",
  };
  expect(studyInput.parse(valid)).toMatchObject({ notes: null, link: null });
  for (const studiedOn of ["2026-02-30", "2026-13-01", "nope"])
    expect(studyInput.safeParse({ ...valid, studiedOn }).success).toBe(false);
  for (const link of [
    "javascript:alert(1)",
    "file:///etc/passwd",
    "data:text/html,x",
    "ftp://example.com",
  ])
    expect(studyInput.safeParse({ ...valid, link }).success).toBe(false);
  expect(
    studyInput.safeParse({ ...valid, link: "https://example.com/notes" })
      .success,
  ).toBe(true);
  expect(
    studyInput.safeParse({ ...valid, notes: "x".repeat(5001) }).success,
  ).toBe(false);
});
it("limits career input to implemented paths and deduplicates tool choices", () => {
  expect(
    profileInput.parse({ ...DEFAULT_PROFILE, stackTools: ["Docker", "Docker"] })
      .stackTools,
  ).toEqual(["Docker"]);
  expect(
    profileInput.safeParse({ ...DEFAULT_PROFILE, primaryStack: "unsupported" })
      .success,
  ).toBe(false);
  expect(
    profileInput.safeParse({ ...DEFAULT_PROFILE, targetMilestone: "invented" })
      .success,
  ).toBe(false);
});
