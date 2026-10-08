import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/data/**", "src/db/**", "src/test/**"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["@/db/*", "**/db/*"], message: "Use @/data: only the data layer may touch the database." }] }],
    },
  },
  {
    files: ["src/growth/**/*.{ts,tsx}", "src/progression/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["next", "next/*", "react", "@/db/*", "@/data/*", "@/app/*", "@/components/*"], message: "Career and progression rules are pure: infrastructure depends on them." }] }],
    },
  },
  {
    files: ["src/db/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": ["error", { patterns: [{ group: ["next", "next/*", "react", "@/data/*", "@/app/*", "@/components/*"], message: "Database adapters must not depend on auth, transport or UI." }] }],
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
