// @vitest-environment jsdom
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { SubtopicChecklist } from "./subtopic-checklist";
const { save } = vi.hoisted(() => ({ save: vi.fn() }));
vi.mock("@/app/(app)/topics/actions", () => ({
  setSubtopicStudiedAction: save,
}));
let container: HTMLDivElement;
let root: Root;
const props = {
  topicCode: "topic.collections",
  subtopics: [
    { code: "topic.collections.arrays", title: "Arrays and lists" },
    { code: "topic.collections.maps", title: "Maps" },
  ],
  completions: [] as { subtopicCode: string; studiedOn: string }[],
};
beforeEach(async () => {
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  save.mockReset();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
  await act(async () => root.render(createElement(SubtopicChecklist, props)));
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
});
const checkbox = () =>
  container.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
it("retains a saved check, shows progress and reconciles refreshed server state", async () => {
  save.mockResolvedValue({ ok: true });
  await act(async () => checkbox().click());
  expect(checkbox().checked).toBe(true);
  expect(container.textContent).toContain("1 of 2 studied");
  expect(save.mock.calls[0][0]).toMatchObject({
    topicCode: props.topicCode,
    subtopicCode: props.subtopics[0].code,
    checked: true,
  });
  const studiedOn = save.mock.calls[0][0].studiedOn;
  await act(async () =>
    root.render(
      createElement(SubtopicChecklist, {
        ...props,
        completions: [{ subtopicCode: props.subtopics[0].code, studiedOn }],
      }),
    ),
  );
  expect(checkbox().checked).toBe(true);
  await act(async () => checkbox().click());
  expect(checkbox().checked).toBe(false);
  expect(container.textContent).toContain("history is preserved");
});
it("rolls back a failed save and keeps the item available to retry", async () => {
  save.mockResolvedValue({ ok: false, message: "Please retry" });
  await act(async () => checkbox().click());
  expect(checkbox().checked).toBe(false);
  expect(checkbox().disabled).toBe(false);
  expect(container.querySelector('[role="alert"]')?.textContent).toBe(
    "Please retry",
  );
  expect(container.textContent).toContain("0 of 2 studied");
});
it("blocks duplicate changes while a save is in progress and recovers from network errors", async () => {
  let reject!: (error: Error) => void;
  save.mockImplementation(
    () =>
      new Promise((_, fail) => {
        reject = fail;
      }),
  );
  await act(async () => checkbox().click());
  expect(checkbox().checked).toBe(true);
  expect(checkbox().disabled).toBe(true);
  await act(async () => reject(new Error("Network unavailable")));
  expect(checkbox().checked).toBe(false);
  expect(checkbox().disabled).toBe(false);
  expect(container.querySelector('[role="alert"]')).not.toBeNull();
});
