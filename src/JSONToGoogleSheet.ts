import readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';

import { GoogleAPIScopes, TaskFunction, CredentialProps, AuthTokenProps } from './types'

class JSONToGoogleSheet {
  private _scopes: GoogleAPIScopes[] = [GoogleAPIScopes.SHEETS_SCOPE]
  private _oAuth2Client?: OAuth2Client
  private _isCachedTokenRequired: boolean

  constructor(isCachedTokenRequired = false) {
    this._isCachedTokenRequired = isCachedTokenRequired
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
   * Generate new oAuth token
   * 
   * @param {string} tokenPath - Path for saving token.json
   * @param {object} oAuth2Client - OAuth2Client
   */
  private async _genNewToken(oAuth2Client: OAuth2Client): Promise<OAuth2Client> {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this._scopes
    })

    // CLI - authenticatation
    console.info('> Authorize user app by visiting this url:', authUrl);

    return new Promise(((rseolve, reject) => {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      rl.question('> Enter the code from that page here: ', (code) => {
        rl.close();

        oAuth2Client.getToken(code, (err, token) => {
          if (err) {
            console.error('> Error while trying to retrieve access token', err);
            return reject(err)
          }

          oAuth2Client.setCredentials(token!);
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
  public async authorize({ clientId, clientSecret, redirectUri }: CredentialProps, authToken?: AuthTokenProps) {
    let oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);
    try {
      if (authToken) oAuth2Client.setCredentials(authToken)
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
   */
  public invokeTask(task: TaskFunction, param?: any) {
    if (!this._oAuth2Client) throw new Error('Unauthorized')
    return task(this._oAuth2Client, param)
  }
}

export default JSONToGoogleSheet