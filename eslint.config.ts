import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import ts from "typescript";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], 
    plugins: { js,ts }, 
    extends: ["eslint:recommended", "google"], 
    languageOptions: { globals: globals.node } 
  },
  tseslint.configs.recommended,
]);
