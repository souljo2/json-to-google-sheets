import fs from 'fs'
import path from 'path'
import flat from 'flat'

import { getFlattedJSON, writeJSONFile } from '../src/json-util'
import { JSONData } from '../src/types'

describe('json-util', () => {
  const filePathForTest = path.resolve(__dirname, './test.json')
  const rawJSONDataForTest = fs.readFileSync(filePathForTest)
  const parsedJSONDataForTest = JSON.parse(rawJSONDataForTest.toString())
  const flattenedJSONDataForTest: JSONData = flat.flatten(parsedJSONDataForTest)

  describe('getFlattedJSON()', () => {

    test('If no parameters have been passed, error should be occurred', () => {
      const CustomError = new Error('Should provide either "data" or "filePath"')
      expect(() => getFlattedJSON({})).toThrowError(CustomError)
    })

    test('If invalid filepath is passed as parameter, error should be occurred', () => {
      const CustomError = new Error('File does not exist')
      expect(() => getFlattedJSON({ filePath: './test1.json' })).toThrowError(CustomError)
    })

    test('If valid filepath is passed as parameter, JSON data should be flatted', () => {
      expect(getFlattedJSON({ filePath: filePathForTest })).toStrictEqual(flattenedJSONDataForTest)
    })

    test('If proper data is passed as parameter, JSON data should be flatted', () => {
      expect(getFlattedJSON({ data: parsedJSONDataForTest })).toStrictEqual(flattenedJSONDataForTest)
    })
  })

  describe('writeJSONFile()', () => {
    const filePathForTestResult = path.resolve(__dirname, './test-result.json')
    const filePathForRawTestResult = path.resolve(__dirname, './test-raw-result.json')

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