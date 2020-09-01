const fs = require('fs')
const path = require('path')
const http = require('http')

const JG = require( '../../dist/index' )
const credential = require( '../../credential.json' )

function runHTTPServer() {
  const server = http.createServer((_, response) => {
    const pagePath = path.resolve(__dirname, './index.html')
    const page = fs.readFileSync(pagePath)

    response.write(page);
    response.end()
  })

  server.listen(9999)
  return server
}

async function genAuthToken() {
  const server = runHTTPServer()
  const jsonToGoogleSheet = new JG.JSONToGoogleSheet({ isCachedTokenRequired: true })

  try {
    // Authorize
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