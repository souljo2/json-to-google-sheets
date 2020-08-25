module.exports = {
  "roots": [
    "<rootDir>"
  ],
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testMatch": [ "<rootDir>/tests/unit/*.spec.ts" ],
  "moduleFileExtensions": [
    "ts",
    "js",
    "json"
  ],
  "automock": false,
  "setupFiles": [
    "./setupJest.js"
  ]
}