module.exports = {
  roots: ["<rootDir>/src/", "<rootDir>/test/"],
  preset: "./test/presets.ts",
  silent: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testEnvironment: "node",
  watchman: true,
  globalSetup: "<rootDir>/test/setup.ts",
  globalTeardown: "<rootDir>/test/teardown.ts",
  testTimeout: 10000
}
