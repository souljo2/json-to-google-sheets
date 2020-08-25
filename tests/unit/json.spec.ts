import fs from 'fs'
import path from 'path'
import flat from 'flat'

import { getFlattedJSON, writeJSONFile } from '../../src/json-util'
import { JSONData } from '../../src/types'

describe('json-util', () => {
  const filePathForTest = path.resolve(__dirname, '../data/json-test.json')
  const rawJSONDataForTest = fs.readFileSync(filePathForTest)
  const parsedJSONDataForTest = JSON.parse(rawJSONDataForTest.toString())
  const flattenedJSONDataForTest: JSONData = flat.flatten(parsedJSONDataForTest)

  describe('getFlattedJSON()', () => {
    test('If proper data is passed as parameter, JSON data should be flatted', () => {
      expect(getFlattedJSON(parsedJSONDataForTest)).toStrictEqual(flattenedJSONDataForTest)
    })
  })

  describe('writeJSONFile()', () => {
    const filePathForTestResult = path.resolve(__dirname, '../data/json-test-result.json')
    const filePathForRawTestResult = path.resolve(__dirname, '../data/json-test-raw-result.json')

    beforeEach(() => {
      // Remove previous test result
      if (fs.existsSync(filePathForTestResult)) fs.unlinkSync(filePathForTestResult)
      if (fs.existsSync(filePathForRawTestResult)) fs.unlinkSync(filePathForRawTestResult)
    })

    afterAll(() => {
      // Remove previous test result
      if (fs.existsSync(filePathForTestResult)) fs.unlinkSync(filePathForTestResult)
      if (fs.existsSync(filePathForRawTestResult)) fs.unlinkSync(filePathForRawTestResult)
    })

    test('If filepath is already used, error should be occurred', () => {
      const CustomError = new Error('The file alreay exists')
      expect(() => writeJSONFile(filePathForTest, parsedJSONDataForTest)).toThrowError(CustomError)
    })

    test('If the filepath is valid, JSON file should contain unflattened JSON data.', () => {
      writeJSONFile(filePathForTestResult, flattenedJSONDataForTest)
      expect(fs.existsSync(filePathForTestResult)).toBe(true)

      const rawJSONDataForTestResult = fs.readFileSync(filePathForTestResult)
      expect(rawJSONDataForTestResult.toString()).toBe(JSON.stringify(parsedJSONDataForTest))
    })

    test('If the raw option has been used, JSON file should contain flattened JSON data.', () => {
      writeJSONFile(filePathForRawTestResult, flattenedJSONDataForTest, { raw: true })
      expect(fs.existsSync(filePathForRawTestResult)).toBe(true)

      const rawJSONDataForTestRawResult = fs.readFileSync(filePathForRawTestResult)
      expect(rawJSONDataForTestRawResult.toString()).toBe(JSON.stringify(flattenedJSONDataForTest))
    })
  })
})