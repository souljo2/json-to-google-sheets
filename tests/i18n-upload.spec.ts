import credential from './res/credential.json'
import { runHTTPServer, Server } from './test-server'
import JSONToGoogleSheet, { 
  listFiles,
  deleteSheet,
  createSheet,
  getSheet,
  batchGetSheet,
  replaceSheet
} from '../src'

const TEST_SHEET_NAME = 'i18n test'
const LOCALES: string[] = ['en-US', 'ko-KR', 'zh-CH']

describe('Check uploading i18n-json', () => {
  let jsonToGoogleSheet:JSONToGoogleSheet
  let server: Server 

  beforeAll(async () => {
    server = runHTTPServer()

    jsonToGoogleSheet = new JSONToGoogleSheet({ isCachedTokenRequired: true })

    try {
      await jsonToGoogleSheet.authorize({
        clientId: credential.clientId,
        clientSecret: credential.clientSecret,
        redirectUri: credential.redirectUri
      })
    } catch (e) {
      process.exit(-1)
    }

    process.on('exit', () => {
      if (server) server.close()
    })
  })

  afterAll(() => {
    server.close()
    server = undefined
  })

  describe('listFiles', () => {
    // TODO >
  })

  describe('deleteSheet', () => {
    // TODO >
  })

  describe('createSheet', () => {
    // TODO >
  })

  describe('getSheet', () => {
    // TODO >
  })

  describe('batchGetSheet', () => {
    // TODO >
  })

  describe('replaceSheet', () => {
    // TODO >
  })
})