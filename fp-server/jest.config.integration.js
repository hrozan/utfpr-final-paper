const merge = require("merge")
const baseConfig = require("./jest.config.base")

const config = {
  roots: ["<rootDir>/test/"],
  verbose: true,
  silent: false
}

module.exports = merge.recursive(baseConfig, config)
