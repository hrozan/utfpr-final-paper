module.exports = {
  displayName: {
    name: "API",
    color: "blue",
  },
  preset: "./test/presets.ts",
  roots: ["<rootDir>/app/"],
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  notify: false,
  silent: true,
  verbose: false,
}
