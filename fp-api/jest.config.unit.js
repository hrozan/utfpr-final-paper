const merge = require("merge")
const baseConfig = require("./jest.config.base")

const config = {
  preset: "ts-jest",
  watchman: true,
  roots: ["<rootDir>/src/"],
  globalSetup: undefined,
  globalTeardown: undefined
}

module.exports = merge.recursive(baseConfig, config)
