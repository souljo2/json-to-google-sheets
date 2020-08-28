import fs from 'fs'
import path from 'path'
import http from 'http'

export type Server = http.Server

/**
 * Run http server for using Google oAuth
 * 
 * @returns {Promise}
 */
export function runHTTPServer() {
  const server = http.createServer((request, response) => {
    const { url } = request;

    if (!!url && url.indexOf('check')) {
      const pagePath = path.resolve(__dirname, './res/index.html')
      const page = fs.readFileSync(pagePath)
      response.write(page);
    }

    response.statusCode = 200
    response.end()
  })

  server.listen(9999)
  return server
}