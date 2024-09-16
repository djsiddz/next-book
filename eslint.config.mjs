import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import { FlatCompat } from "@eslint/eslintrc";
import importConfig from "eslint-plugin-import";
import importAlias from "eslint-plugin-import-alias";
import prettier from "eslint-plugin-prettier/recommended";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import next from "@next/eslint-plugin-next";
import ts from "typescript-eslint";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import globals from "globals";

const flatCompat = new FlatCompat();

const addNameToEachConfig = (name, configs) =>
  configs.map((conf) => ({
    ...conf,
    name: [conf.name, name].filter(Boolean).join("-"),
  }));

const reactFix = addNameToEachConfig("react", fixupConfigRules(flatCompat.config(react.configs.recommended)));
const reactHooksFix = addNameToEachConfig(
  "react-hook",
  fixupConfigRules(flatCompat.config(reactHooks.configs.recommended)),
);

const importFix = addNameToEachConfig("imports", fixupConfigRules(flatCompat.config(importConfig.configs.recommended)));
const nextCoreWebVitalsFix = addNameToEachConfig(
  "next-core-web-vitals",
  fixupConfigRules(flatCompat.config(next.configs[("core-web-vitals", "recommended")])),
);

const tsConfig = addNameToEachConfig(
  "typescript-custom",
  ts.config(ts.configs.eslintRecommended, ...ts.configs.recommendedTypeChecked, {
    files: ["*.ts", "*.tsx"],
    rules: {
      "@typescript-eslint/no-shadow": ["error"],
      "no-shadow": "off",
      "@typescript-eslint/array-type": "warn",
    },
  }),
);

const testingLibraryConfig = addNameToEachConfig(
  "testing-library",
  fixupConfigRules(flatCompat.config(testingLibrary.configs.react)),
);

const jestDomConfig = addNameToEachConfig("jest-dom", fixupConfigRules(flatCompat.config(jestDom.configs.recommended)));

export default [
  {
    name: "files-ignore",
    ignores: [
      "lib/**",
      "**/*.d.ts",
      "**/*.test.ts(x)?",
      "**/*.config.js",
      "scripts/**",
      "*.config.mjs",
      "**/*pnp*",
      ".prettierrc.cjs",
      ".yarn/**",
      ".next/**",
      "coverage/**",
      "__tests__/**",
    ],
  },
  ...reactFix,
  ...reactHooksFix,
  ...importFix,
  ...tsConfig,
  ...nextCoreWebVitalsFix,
  ...testingLibraryConfig,
  ...jestDomConfig,
  { ...prettier, name: "prettier" },
  {
    name: "global-custom",
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
        tsconfigRootDir: "./",
      },
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        // Add browser and node globals
        ...Object.fromEntries(Object.entries(globals.browser).map(([key, value]) => [key, "readonly"])),
        ...Object.fromEntries(Object.entries(globals.node).map(([key, value]) => [key, "readonly"])),
      },
    },
    plugins: {
      "import-alias": fixupPluginRules(importAlias),
    },
    rules: {
      "array-callback-return": "warn",
      "capitalized-comments": ["error", "always", { line: { ignoreConsecutiveComments: true } }],
      "default-param-last": "error",
      "max-lines": ["error", { max: 250, skipBlankLines: true, skipComments: true }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-multi-assign": "error",
      "no-multi-spaces": "error",
      "no-negated-condition": "off",
      "no-nested-ternary": "off",
      "no-prototype-builtins": "warn",
      "no-restricted-imports": "warn",
      "object-shorthand": "warn",
      "one-var": ["error", "never"],
      "prefer-destructuring": "error",
      "prefer-object-spread": "warn",

      // React - rules from `eslint-plugin-react`
      "react/jsx-filename-extension": ["error", { extensions: [".tsx", ".jsx"] }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-boolean-value": "warn",
      "react/jsx-closing-tag-location": "error",
      "react/jsx-curly-spacing": "error",
      "react/jsx-pascal-case": "error",
      "react/jsx-tag-spacing": "error",
      "react/jsx-wrap-multilines": "warn",
      "react/no-array-index-key": "warn",
      "react/no-multi-comp": ["error", { ignoreStateless: true }],
      "react/no-unescaped-entities": "off",
      "react/style-prop-object": "off",

      // Import
      "import/prefer-default-export": "off",
      "import/extensions": ["error", "never", { svg: "always", json: "always" }],
      "import/order": ["error", { "newlines-between": "always" }],
      "import/no-extraneous-dependencies": "off",

      // Import alias
      "import-alias/import-alias": [
        "error",
        {
          relativeDepth: 2,
          aliases: [
            { alias: "ZC", matcher: "./components/" },
            { alias: "ZL", matcher: "./lib/" },
            { alias: "ZP", matcher: "./public/" },
            { alias: "ZT", matcher: "./types/" },
            { alias: "ZU", matcher: "./utils/" },
          ],
        },
      ],

      "no-empty-function": "off",
      "@typescript-eslint/no-empty-function": ["error", { allow: ["functions", "arrowFunctions", "methods"] }],
      "@typescript-eslint/no-unsafe-return": "warn",
    },
    settings: {
      "import/resolver": {
        node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
        typescript: {
          // Check below two are required or not
          alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
          project: "./",
        },
      },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      react: {
        version: "detect",
      },
    },
  },
];
