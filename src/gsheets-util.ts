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
export async function getSheets(authClient: OAuth2Client, { sheetName }: GoogleSheetFuncParam) {
  const request = {
    q: `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${sheetName}'`,
    auth: authClient
  };

  const { data } = await drive.files.list(request)
  return data.files
}

/**
 * 
 * @param authClient 
 * @param param1 
 */
export async function readSheet(authClient: OAuth2Client, { sheetId }: GoogleSheetFuncParam) {
  const request = {
    spreadsheetId: sheetId,
    range,
    auth: authClient
  };

  const { data } = await sheets.spreadsheets.values.get(request)
  return data.values
}

/**
 * 
 * @param authClient 
 * @param param1 
 */
export async function batchReadSheet(authClient: OAuth2Client, { sheetId }: GoogleSheetFuncParam) {
  const request = {
    spreadsheetId: sheetId,
    range,
    auth: authClient
  };

  const { data } = await sheets.spreadsheets.values.get(request)
  return data.values
}

/**
 * WIP 
 * 
 * @param {string} sheetName
 * @param {object} data
 */
export function createSheet(authClient: OAuth2Client, { sheetName, data }: GoogleSheetFuncParam) {
  // sheets.spreadsheets.create
}

/**
 * WIP
 * 
 * @param {string} sheetName 
 */
export function deleteSheet(authClient: OAuth2Client, { sheetName }: GoogleSheetFuncParam) {
  // DELETE https://www.googleapis.com/drive/v3/files/{fileId}
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