import fs from 'fs'
import readline from 'readline'
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';

import { GoogleAPIScopes } from './types'

interface IOAuthManager {

}

export type OAuthManagerParam = {
  credentialPath: string
  tokenPath: string
  driveURL?: string
}

type TaskFunction = (task: Function) => void

class OAuthManager implements IOAuthManager {
  private _isValid = false
  private _scopes: GoogleAPIScopes[] = [GoogleAPIScopes.SHEETS_SCOPE]
  private _authorizedTaskRunner?: (task: Function) => void

  constructor({ credentialPath, tokenPath, driveURL }: OAuthManagerParam) {
    try {
      const content = fs.readFileSync(credentialPath)
      const authorizedTaskRunner = this._authorize(tokenPath, JSON.parse(content.toString()))
      // this._authorizedTaskRunner = authorizedTaskRunner

      if (driveURL) {
        this._scopes.push(GoogleAPIScopes.DRIVE_SCOPE)
      }

      this._isValid = true
    } catch (e) {
      console.error('An error occurred while creating the instance')
      console.error(e)
    }
  }

  get isValid() {
    return this._isValid
  }

  private _authorize(tokenPath: string, credential: any) {
    const { client_secret, client_id, redirect_uris } = credential.installed
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    if (!fs.existsSync(tokenPath)) {
      this._getNewToken(tokenPath, oAuth2Client)
      return 
    }

    // Check if we have previously stored a token.
    fs.readFile(tokenPath, (err, token) => {
      if (err) {
        this._getNewToken(tokenPath, oAuth2Client)
        return 
      }

      oAuth2Client.setCredentials(JSON.parse(token.toString()));
      return oAuth2Client
    });
  }

  private _getNewToken(tokenPath: string, oAuth2Client: OAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: this._scopes
    })

    // CLI - authenticatation
    console.log('Authorize this app by visiting this url:', authUrl);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error while trying to retrieve access token', err);

        oAuth2Client.setCredentials(token!);

        // Store the token to disk for later program executions
        fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', tokenPath);
        });

        return oAuth2Client
      });
    });
  }

  public runTask() {
    if (!this._isValid) throw new Error('Broken instance')

    // TODO >
  }
}

export default OAuthManager