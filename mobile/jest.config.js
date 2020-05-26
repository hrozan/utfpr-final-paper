module.exports = {
  preset: "@testing-library/react-native",
  testMatch: ["**/__tests__/**/?(*.)+(spec|test).[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transformIgnorePatterns: ["/node_modules/(?!native-base)/"],
}
