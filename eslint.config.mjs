import nextConfig from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = [
  ...nextConfig,
  ...nextTypeScript,
  {
    ignores: [
      "tailwind.config.js",
      "jest.config.js"
    ],
  },
  {
    rules: {
      // eslint-config-next already registers the jsx-a11y plugin; just enable all recommended rules
      ...Object.fromEntries(
        Object.entries(jsxA11y.configs.recommended.rules).map(([rule, value]) => [
          `jsx-a11y/${rule.replace(/^jsx-a11y\//, "")}`,
          value,
        ])
      ),
      "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    },
  },
];

export default eslintConfig;
