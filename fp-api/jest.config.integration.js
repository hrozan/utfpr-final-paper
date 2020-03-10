const merge = require("merge")
const baseConfig = require("./jest.config.base")

const config = {
  roots: ["<rootDir>/test/"]
}

module.exports = merge.recursive(baseConfig, config)
