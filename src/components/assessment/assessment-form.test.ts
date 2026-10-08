// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AssessmentForm } from "./assessment-form";

const { save } = vi.hoisted(() => ({ save: vi.fn() }));
vi.mock("@/app/(app)/actions", () => ({ saveAssessmentAction: save }));
vi.mock("@/components/markdown", () => ({ Markdown: () => null }));

let container: HTMLDivElement;
let root: Root;
const current = {
  status: "not_started" as const,
  notesMarkdown: "Existing notes",
  evidenceMarkdown: "Existing evidence",
  confidence: 3,
  reviewDueAt: "2026-11-01",
};
beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  save.mockReset();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () =>
    root.render(
      createElement(AssessmentForm, {
        kind: "competency",
        code: "test.competency",
        current,
      }),
    ),
  );
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
function input(status: string) {
  return container.querySelector<HTMLInputElement>(
    `input[name="status"][value="${status}"]`,
  )!;
}
async function submit() {
  await act(async () =>
    container.querySelector<HTMLFormElement>("form")!.requestSubmit(),
  );
}

describe("assessment form after saving", () => {
  it.each(["in_progress", "mastered", "review_required"])(
    "retains %s after the action completes",
    async (status) => {
      save.mockResolvedValue({ ok: true, message: "Saved." });
      await act(async () => input(status).click());
      await submit();
      expect(save.mock.calls[0][1].get("status")).toBe(status);
      expect(input(status).checked).toBe(true);
      expect(input("not_started").checked).toBe(false);
      expect(
        container.querySelector<HTMLTextAreaElement>("#notesMarkdown")!.value,
      ).toBe(current.notesMarkdown);
      expect(
        container.querySelector<HTMLSelectElement>("#confidence")!.value,
      ).toBe("3");
      expect(container.textContent).toContain("Saved.");
      // A second save must send the visible selection rather than the initial status.
      await submit();
      expect(save.mock.calls[1][1].get("status")).toBe(status);
    },
  );
  it("preserves the selection and fields after a failed save", async () => {
    save.mockResolvedValue({ ok: false, message: "Could not save." });
    await act(async () => input("in_progress").click());
    await submit();
    expect(input("in_progress").checked).toBe(true);
    expect(
      container.querySelector<HTMLTextAreaElement>("#evidenceMarkdown")!.value,
    ).toBe(current.evidenceMarkdown);
    expect(container.textContent).toContain("Could not save.");
  });
  it("keeps a newly selected review date across repeated saves", async () => {
    save.mockResolvedValue({ ok: true, message: "Saved." });
    const review = container.querySelector<HTMLSelectElement>("#reviewIn")!;
    await act(async () => {
      review.value = "2";
      review.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await submit();
    const savedDate = save.mock.calls[0][1].get("reviewDueAt");
    expect(review.value).toBe("2");
    expect(
      container.querySelector<HTMLInputElement>("input[name=reviewDueAt]")!
        .value,
    ).toBe(savedDate);
    await submit();
    expect(save.mock.calls[1][1].get("reviewDueAt")).toBe(savedDate);
  });
  it("shows the pending state and retains the selection when saving finishes", async () => {
    let finish!: (value: { ok: boolean; message: string }) => void;
    save.mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    await act(async () => input("mastered").click());
    await submit();
    const button = container.querySelector<HTMLButtonElement>(
      "button[type=submit]",
    )!;
    expect(button.disabled).toBe(true);
    expect(button.textContent).toBe("Saving…");
    await act(async () => finish({ ok: true, message: "Saved." }));
    expect(button.disabled).toBe(false);
    expect(input("mastered").checked).toBe(true);
  });
});
