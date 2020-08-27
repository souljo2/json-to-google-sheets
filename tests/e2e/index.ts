import { drive_v3 } from 'googleapis'

import JSONToGoogleSheet, {
  getSheets,
  createSheet,
  deleteSheet,
  updateSheets,
  uploadJSONToDrive,
  writeJSONFile
} from '../../src'
import credential from './credential.json'
import testData from '../data/en-US.json'
import { runHTTPServer } from './test-server'

// Run test server
const server = runHTTPServer()
process.on('exit', () => server.close())

const TEST_SHEET_NAME = 'i18n test'
const LOCALES: string[] = ['en-US', 'ko-KR', 'zh-CH']

async function getSpreadSheet (sheets: drive_v3.Schema$File[], sheetName: string) {
  let matchedSpreadsheetId: string 

  if (sheets.length === 0) {
    // TODO > Sheets가 없을 때 새로 생성 + LOCALES 만큼의 rnage를 생성
    // createSheet
  } else {
    const matched = sheets.find(({ name }) => name === TEST_SHEET_NAME)!
    matchedSpreadsheetId = matched.id!
  }

  // TODO > Spreadsheet읽어서 데이터 보내주기
  return  
}

async function runE2Etest() {
  const jsonToGoogleSheet = new JSONToGoogleSheet({ isCachedTokenRequired: true })

  try {
    // [1] Authorize
    await jsonToGoogleSheet.authorize({
      clientId: credential.clientId,
      clientSecret: credential.clientSecret,
      redirectUri: credential.redirectUri
    })

    console.info('[1] Successfully authorized')
  } catch (e) {
    console.error('Failed to authorize client')
    console.error(e)
    process.exit(-1)
  }

  try {
    // [2] Get spreadsheet
    const sheets = await jsonToGoogleSheet.invokeTask<drive_v3.Schema$File[] | undefined>(getSheets, { sheetName: TEST_SHEET_NAME })
    const sheet = await getSpreadSheet(sheets, TEST_SHEET_NAME)

    // console.info(`[2] Successfully get sheet (id=${sheet.id})`)

    // [3] Print local data
    console.info(`[3] Data from locale file\n`, JSON.stringify(testData))

    // [4] Print spreadsheet data
    // TODO > 랭귀지 별로 데이터를 출력해줌
    // console.info(`[4] Data from spreadsheet\n`, JSON.stringify(sheet.data)) 

    // [5] Upload local to spreadsheet 
    // TODO > Local 에 있는 json 데이터를 spreadsheet로 업데이트 (en의 변경사항을 반영 -> 다른 lang 중, en을 defualt로 merge하고 변경사항을 반영)

    // [6] Sync locale with spreadsheet 
    // TODO > spread sheet 상의 데이터를 local에 업데이트 -> local 파일 삭제 후 새로 작성

    process.exit(0)
  } catch (e) {
    console.error('Failed to get sheets')
    console.error(e)
    process.exit(-1)
  }
}

runE2Etest()