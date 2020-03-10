module.exports = {
  silent: true,
  clearMocks: true,
  roots: ["<rootDir>/test/"],
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  preset: "./test/presets",
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  testEnvironment: "node",
  watchman: false,
  setupFilesAfterEnv: ["<rootDir>/test/setup.js"]
}
