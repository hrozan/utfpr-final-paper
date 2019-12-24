// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	verbose: true,
	clearMocks: true,
	coverageDirectory: "coverage",
	moduleFileExtensions: ["js", "json", "jsx", "ts", "tsx", "node"],
	preset: "@shelf/jest-mongodb",
	testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"]
}
