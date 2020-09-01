import { google, drive_v3 as Drive3, sheets_v4 as Sheets4 } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

const sheets = google.sheets('v4')
const drive = google.drive('v3')

export type ReplaceSheetQuery = {
  previousSheetId: string,
  query: Sheets4.Params$Resource$Spreadsheets$Create
}

/// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Drive API

/**
 * Get filelist from drive
 *
 * @param {object} authClient
 */
export async function listFiles (authClient: OAuth2Client, query: Drive3.Params$Resource$Files$List) {
  const request = {
    ...query,
    auth: authClient
  }

  return await drive.files.list(request)
}

/**
 * Delete files
 *
 * @param {object} authClient
 */
export async function deleteFiles (authClient: OAuth2Client, query: Drive3.Params$Resource$Files$Delete) {
  const request = {
    ...query,
    auth: authClient
  }

  return await drive.files.delete(request)
}

/// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Sheets API

/**
 * Create sheet
 *
 * @param {object} authClient
 */
export async function createSheet (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Create) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.create(request)
}

/**
 * Batch update sheet
 *
 * @param {object} authClient
 * @param {object} query
 */
export async function batchUpdateSheet (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Batchupdate) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.batchUpdate(request)
}

/**
 * Get sheet
 *
 * @param {object} authClient
 * @param {object} query
 */
export async function getSheet (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Get) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.get(request)
}

/**
 * Get sheet values
 *
 * @param {object} authClient
 */
export async function getSheetValues (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Get) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.values.get(request)
}

/**
 * Batch get sheet values
 *
 * @param {object} authClient
 * @param {object} query
 */
export async function batchGetSheetValues (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Batchget) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.values.batchGet(request)
}

/**
 * Clear sheet values
 *
 * @param {object} authClient
 * @param {object} query
 */
export async function clearSheetValues (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Clear) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.values.clear(request)
}

/**
 * Update sheet values
 *
 * @param {object} authClient
 * @param {object} query
 */
export async function updateSheetValues (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Update) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.values.update(request)
}
