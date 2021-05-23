/* eslint-disable @typescript-eslint/no-var-requires */
const merge = require("merge")
const ts_preset = require("ts-jest/jest-preset")
const mongodb_preset = require("@shelf/jest-mongodb/jest-preset")

module.exports = merge.recursive(ts_preset, mongodb_preset)
