"use client";

import { useState } from "react";
import { THEMES, type Theme } from "@/lib/theme";

const LABEL: Record<Theme, string> = { system: "Match system", light: "Light", dark: "Dark" };

function applyTheme(theme: Theme) {
  document.cookie = `theme=${theme}; path=/; max-age=31536000; samesite=lax`;
  if (theme === "system") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = theme;
}

export function ThemeSelect({ initial }: { initial: Theme }) {
  const [theme, setTheme] = useState(initial);

  function change(next: Theme) {
    setTheme(next);
    applyTheme(next);
  }

  return (
    <fieldset>
      <legend className="mb-2 block text-xs font-semibold text-ink-secondary">Theme</legend>
      <div className="flex flex-wrap gap-2">
        {THEMES.map((t) => (
          <label key={t} className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-[var(--radius-sm)] border px-3 text-sm ${theme === t ? "border-accent bg-surface-active text-ink" : "border-line-strong text-ink-muted hover:text-ink"}`}>
            <input type="radio" name="theme" value={t} checked={theme === t} onChange={() => change(t)} className="accent-[var(--accent)]" />
            {LABEL[t]}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
