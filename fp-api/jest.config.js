module.exports = {
  roots: ["<rootDir>/src/", "<rootDir>/test/"],
  preset: "./test/presets",
  silent: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testEnvironment: "node",
  watchman: true,
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"]
}