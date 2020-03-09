module.exports = {
  roots: ["<rootDir>/src/"],
  preset: "ts-jest",
  silent: true,
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
  testMatch: ["**/*.spec.ts"],
  testEnvironment: "node",
  watchman: true,
  verbose: true
}
