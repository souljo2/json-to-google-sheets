import fs from 'fs'
import path from 'path'
import http from 'http'

import JSONToGoogleSheet from '../src'
import credential from './res/credential.json'

function runHTTPServer() {
  const server = http.createServer((request, response) => {
    const pagePath = path.resolve(__dirname, './res/index.html')
    const page = fs.readFileSync(pagePath)

    response.write(page);
    response.end()
  })

  server.listen(9999)
  return server
}

async function genAuthToken() {
  const server = runHTTPServer()
  const jsonToGoogleSheet = new JSONToGoogleSheet({ isCachedTokenRequired: true })

  try {
    // [1] Authorize
    await jsonToGoogleSheet.authorize({
      clientId: credential.clientId,
      clientSecret: credential.clientSecret,
      redirectUri: credential.redirectUri
    })

    console.info('Successfully authorized')
  } catch (e) {
    console.error('Failed to authorize client')
    console.error(e)
  } finally {
    server.close()
    process.exit(0)
  }
}

genAuthToken()