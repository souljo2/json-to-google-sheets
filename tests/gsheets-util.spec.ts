import credential from './res/credential.json'
import {
  createSheetQuery,
  listAllSheetsFilesQuery,
  listAllSheetsFilesFilteredBySheetNameQuery,
  getSheetQuery,
  batchGetSheetQuery,
  deleteQuery,
  replaceQuery
} from './test-query'
import {
  JSONToGoogleSheet,
  listFiles,
  deleteSheet,
  createSheet,
  getSheet,
  batchGetSheet,
  replaceSheet
} from '../src'

const TEST_SHEET_NAME = 'i18n test'
const TEST_SHEET_ID = 'test-sheet-id'
const TEST_LOCALES: string[] = ['en-US', 'ko-KR', 'zh-CH']
const TEST_RANGES = ['A', 'B', 'C']

describe('Check uploading i18n-json', () => {
  const jsonToGoogleSheet: JSONToGoogleSheet = new JSONToGoogleSheet({ isCachedTokenRequired: true })

  beforeAll(async () => {
    try {
      await jsonToGoogleSheet.authorize({
        clientId: credential.clientId,
        clientSecret: credential.clientSecret,
        redirectUri: credential.redirectUri
      })
    } catch (e) {
      process.exit(-1)
    }
  })

  test('createSheet()', async () => {
    const query = createSheetQuery(TEST_SHEET_NAME, TEST_LOCALES)
    try {
      const response = await jsonToGoogleSheet.invokeTask(createSheet, query)
      expect(response.status).toBe(200)
    } catch (e) {
      expect(e).toBeNull()
    }
  })

  test('getSheet()', async () => {
    const query = getSheetQuery(TEST_SHEET_ID, TEST_RANGES[0] )
    try {
      const response = await jsonToGoogleSheet.invokeTask(getSheet, query)
      expect(response.status).toBe(200)
    } catch (e) {
      expect(e).toBeNull()
    }
  })

  test('batchGetSheet()', async () => {
    const query = batchGetSheetQuery(TEST_SHEET_ID, TEST_RANGES)
    try {
      const response = await jsonToGoogleSheet.invokeTask(batchGetSheet, query)
      expect(response.status).toBe(200)
    } catch (e) {
      expect(e).toBeNull()
    }
  })

  test('listFiles()', async () => {
    const query = listAllSheetsFilesQuery
    try {
      const response = await jsonToGoogleSheet.invokeTask(listFiles, query)
      expect(response.status).toBe(200)
    } catch (e) {
      expect(e).toBeNull()
    }
  })

  test('listFiles() + filter', async () => {
    const query = listAllSheetsFilesFilteredBySheetNameQuery(TEST_SHEET_NAME)
    try {
      const response = await jsonToGoogleSheet.invokeTask(listFiles, query)
      expect(response.status).toBe(200)
    } catch (e) {
      expect(e).toBeNull()
    }
  })

  test('deleteSheet()', async () => {
    const query = deleteQuery(TEST_SHEET_ID)
    try {
      const response = await jsonToGoogleSheet.invokeTask(deleteSheet, query)
      expect(response.status).toBe(200)
    } catch (e) {
      expect(e).toBeNull()
    }
  })

  test('replaceSheet()', async () => {
    const query = replaceQuery(TEST_SHEET_ID, TEST_SHEET_NAME, TEST_LOCALES)
    try {
      await jsonToGoogleSheet.invokeTask(replaceSheet, query)
    } catch (e) {
      expect(e).toBeNull()
    }
  })
})