import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';

import { GoogleSheetFuncParam } from './types'

const sheets = google.sheets('v4');
const drive = google.drive('v3');
/**
 * WIP
 * 
 * @param {string} sheetName 
 */
export async function isSheetExisted(authClient: OAuth2Client, { sheetName }: GoogleSheetFuncParam) {
  const request = {
    q: `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${sheetName}'`,
    auth: authClient
  };

  try {
    const response = await drive.files.list(request)
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

/**
 * WIP 
 * 
 * @param {string} sheetName
 * @param {object} data
 */
export function createSheet(authClient: OAuth2Client, { sheetName, data }: GoogleSheetFuncParam) {
}

/**
 * WIP
 * 
 * @param {string} sheetName 
 */
export function deleteSheet(authClient: OAuth2Client, { sheetName }: GoogleSheetFuncParam) {

}

/**
 * WIP 
 * 
 * @param {string} sheetName
 * @param {object} data
 */
export function updateSheets(authClient: OAuth2Client, { sheetName, data }: GoogleSheetFuncParam) {

}

/**
 * WIP 
 * 
 * @param authClient 
 */
export function uploadJSONToDrive(authClient: OAuth2Client) {

}