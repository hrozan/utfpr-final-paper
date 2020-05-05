module.exports = {
  displayName: {
    name: "API",
    color: "blue"
  },
  preset: "./test/presets.ts",
  roots: ["<rootDir>/src/"],
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  notify: false,
  silent: true,
  verbose: false
}
