import JSONToGoogleSheet, {
  isSheetExisted,
  createSheet,
  deleteSheet,
  updateSheets,
  uploadJSONToDrive
} from '../../src'

import credential from './credential.json'
import { runHTTPServer } from './test-server'

// Run test server
const server = runHTTPServer()
process.on('exit', () => server.close())

async function runE2Etest() {
  const jsonToGoogleSheet = new JSONToGoogleSheet({
    isCachedTokenRequired: true
  })

  try {
    await jsonToGoogleSheet.authorize({
      clientId: credential.clientId,
      clientSecret: credential.clientSecret,
      redirectUri: credential.redirectUri 
    })

    await jsonToGoogleSheet.invokeTask(isSheetExisted, { sheetName: 'TEST' })
    process.exit(0)
  } catch (e) {
    console.error('Failed to authorize client')
    console.error(e)
    process.exit(-1)
  }
}

runE2Etest()