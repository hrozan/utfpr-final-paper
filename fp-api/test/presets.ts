const merge = require("merge")
const jestMogoose = require("@shelf/jest-mongodb/jest-preset")
const tsJest = require("ts-jest/jest-preset")

module.exports = merge.recursive(tsJest, jestMogoose)
