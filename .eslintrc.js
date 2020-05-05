module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
    jest:true

  },
  extends: ["eslint:recommended", "plugin:jest/recommended"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "prettier/prettier": "error"
  },
  plugins: ["prettier", "jest"]
}
