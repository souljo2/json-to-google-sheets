import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';

import { GoogleAPIScopes, TaskFunction, CredentialProps, AuthTokenProps, JSONToGoogleSheetParam } from './types'

const TOKEN_PATH = 'token.json';

class JSONToGoogleSheet {
  private _scopes: GoogleAPIScopes[] = [GoogleAPIScopes.SHEETS_SCOPE, GoogleAPIScopes.DRIVE_SCOPE]
  private _oAuth2Client?: OAuth2Client
  private _isCachedTokenRequired: boolean

  constructor(jsonToGoogleSheetParam?: JSONToGoogleSheetParam) {
    this._isCachedTokenRequired = jsonToGoogleSheetParam?.isCachedTokenRequired || false
  }

  get scopes(): GoogleAPIScopes[] {
    return this._scopes
  }

  get isCachedTokenRequired(): boolean {
    return this._isCachedTokenRequired
  }

  set oAuth2Client(oAuth2Client: OAuth2Client) {
    this._oAuth2Client = oAuth2Client
  }

  /**
   * Get authToken from local json file
   * 
   * @returns {AuthTokenProps | undefined}
   */
  private _getAuthToken(): AuthTokenProps | undefined {
    if (!this.isCachedTokenRequired || !fs.existsSync(TOKEN_PATH)) return undefined

    try {
      const token = fs.readFileSync(TOKEN_PATH)
      return JSON.parse(token.toString())
    } catch (e) {
      console.error('Failed to read previous auth token', e);
      return undefined
    }
  }

  /**
   * Generate new oAuth token
   * 
   * @param {string} tokenPath - Path for saving token.json
   * @param {object} oAuth2Client - OAuth2Client
   * 
   * @returns {Promise}
   */
  private async _genNewToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this._scopes
    })

    // CLI - authenticatation
    console.info('\n> Authorize user app by visiting this url:', authUrl);

    return new Promise(((rseolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('> Enter the code from that page here: ', (code) => {
        rl.close();

        oAuth2Client.getToken(code, (err, token) => {
          if (err) {
            console.error('> Error occured while trying to retrieve access token', err);
            return reject(err)
          }

          oAuth2Client.setCredentials(token!);

          if (this.isCachedTokenRequired) {
            try {
              // Store the token to disk for later program executions
              fs.writeFileSync(TOKEN_PATH, JSON.stringify(token))
            } catch (e) {
              console.error('> Error occured while trying to store access token', err);
            }
          }

          rseolve(oAuth2Client)
        });
      });
    }))
  }

  /**
   * Authorize client for using Google APIs
   * 
   * @param {object} credential - CredentialProps 
   * @param {object} token      - AuthTokenProps 
   */
  public async authorize({ clientId, clientSecret, redirectUri }: CredentialProps) {
    let oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    try {
      const prevAuthToken = this._getAuthToken()

      if (this.isCachedTokenRequired && prevAuthToken) oAuth2Client.setCredentials(prevAuthToken)
      else oAuth2Client = await this._genNewToken(oAuth2Client)

      this._oAuth2Client = oAuth2Client
    } catch (e) {
      console.error('Failed to authorize client');
      console.error(e)
    }
  }

  /**
   * Invoke Google APIs with oAuthClient
   * 
   * @param {function} task
   * 
   * @returns {Promise}
   */
  public invokeTask<T>(task: TaskFunction<T>, param?: any) {
    if (!this._oAuth2Client) throw new Error('Unauthorized')
    return task(this._oAuth2Client, param)
  }
}

export default JSONToGoogleSheet