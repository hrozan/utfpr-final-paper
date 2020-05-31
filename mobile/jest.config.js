module.exports = {
  preset: "@testing-library/react-native",
  testMatch: ["**/tests/**/?(*.)+(spec|test).[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/(?!native-base)/"],
  setupFilesAfterEnv: ["@testing-library/react-native/cleanup-after-each"],
  setupFiles: ["./tests/setup.js"],
}
