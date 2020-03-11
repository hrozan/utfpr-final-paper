const merge = require("merge")
const baseConfig = require("./jest.config.base")

const config = {
  preset: "ts-jest",
  watchman: true,
  roots: ["<rootDir>/src/"],
  verbose: true,
  silent: false,
  setupFilesAfterEnv: undefined
}

module.exports = merge.recursive(baseConfig, config)
