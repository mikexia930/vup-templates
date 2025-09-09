export default {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  printWidth: 100,
  endOfLine: "lf",
  bracketSameLine: false,
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 80,
        proseWrap: "always",
      },
    },
  ],
};
