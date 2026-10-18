// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { StudyDialog } from "./study-dialog";
const { save } = vi.hoisted(() => ({ save: vi.fn() }));
vi.mock("@/app/(app)/study-log/actions", () => ({
  saveStudyAction: save,
  deleteStudyAction: vi.fn(),
}));
vi.mock("@/app/(app)/settings/career-actions", () => ({
  saveCareerAction: vi.fn(),
}));
let container: HTMLDivElement;
let root: Root;
const topic = {
  code: "topic.go-modeling",
  title:
    "Go packages, types and interfaces — a long topic title that must remain readable",
};
beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  Object.defineProperty(HTMLDialogElement.prototype, "showModal", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    },
  });
  Object.defineProperty(HTMLDialogElement.prototype, "close", {
    configurable: true,
    value: function (this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    },
  });
  save.mockReset();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () =>
    root.render(
      createElement(StudyDialog, { topics: [topic], topicCode: topic.code }),
    ),
  );
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.restoreAllMocks();
});
async function open() {
  await act(async () =>
    container.querySelector<HTMLButtonElement>("button")!.click(),
  );
}
async function submit() {
  await act(async () =>
    container.querySelector<HTMLInputElement>('input[type="date"]')!.focus(),
  );
  await act(async () =>
    container.querySelector<HTMLFormElement>("form")!.requestSubmit(),
  );
}
it("keeps the form out of the page until requested and shows the fixed topic as readable text", async () => {
  expect(container.querySelector("form")).toBeNull();
  await open();
  expect(container.querySelector("dialog")!.open).toBe(true);
  expect(container.textContent).toContain(topic.title);
  expect(container.querySelector("select")).toBeNull();
  expect(new FormData(container.querySelector("form")!).get("topicCode")).toBe(
    topic.code,
  );
  await act(async () =>
    container
      .querySelector<HTMLButtonElement>('[aria-label="Close study form"]')!
      .click(),
  );
  expect(container.querySelector("dialog")!.open).toBe(false);
  expect(container.querySelector("form")).toBeNull();
});
it("closes after a successful save and opens a fresh form next time", async () => {
  save.mockResolvedValue({ ok: true, message: "Saved" });
  await open();
  await submit();
  expect(save).toHaveBeenCalledOnce();
  expect(container.querySelector("dialog")!.open).toBe(false);
  expect(container.textContent).toContain("Study recorded.");
  await open();
  expect(container.querySelector("dialog")!.open).toBe(true);
  expect(container.querySelector("form")).not.toBeNull();
});
it("keeps the modal open on failure so the user can retry", async () => {
  save.mockResolvedValue({ ok: false, message: "Please try again" });
  await open();
  await submit();
  expect(container.querySelector("dialog")!.open).toBe(true);
  expect(container.querySelector('[role="alert"]')?.textContent).toBe(
    "Please try again",
  );
});
