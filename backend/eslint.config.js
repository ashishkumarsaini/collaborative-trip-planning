import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        },
        rules: {
            "comma-dangle": ["error"],
            "semi": ["error", "always"],
            "no-multiple-empty-lines": ["error", { "max": 1 }],
            "max-len": ["error", { "code": 100 }],
            "eol-last": ["error", "always"]
        }
    }
]);
