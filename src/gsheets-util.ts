import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library';

import { JSONData } from './types'

/**
 * WIP
 * 
 * @param {string} sheetName 
 */
export function isGoogleSheetExisted(sheetName: string) {

}

/**
 * WIP 
 * 
 * @param {string} sheetName
 * @param {object} data
 */
export function createGoogleSheet(sheetName: string, data: JSONData) {

}

/**
 * WIP
 * 
 * @param {string} sheetName 
 */
export function deleteGoogleSheet(sheetName: string) {

}

/**
 * WIP 
 * 
 * @param {string} sheetName
 * @param {object} data
 */
export function updateGoogleSheets(sheetName: string, data: JSONData) {

}

export function test(auth: OAuth2Client) {
  const sheets = google.sheets({ version: 'v4', auth });
  sheets.spreadsheets.values.get({
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    range: 'Class Data!A2:E',
  }, (err, res: any) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
      console.log('Name, Major:');
      // Print columns A and E, which correspond to indices 0 and 4.
      rows.map((row: any) => {
        console.log(`${row[0]}, ${row[4]}`);
      });
    } else {
      console.log('No data found.');
    }
  }
  )
}