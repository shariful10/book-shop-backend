import pluginJs from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      "no-undef": "error",
      "no-console": "warn",
      "prefer-const": "error",
      "no-unused-vars": "error",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
    },
  },
  {
    ignores: [".node_modules/*", "dist/*"],
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
