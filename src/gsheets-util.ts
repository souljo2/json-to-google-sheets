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
 * Delete sheet
 *
 * @param {object} authClient
 */
export async function deleteSheet (authClient: OAuth2Client, query: Drive3.Params$Resource$Files$Delete) {
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
 * Get sheet
 *
 * @param {object} authClient
 */
export async function getSheet (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Get) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.values.get(request)
}

/**
 * Batch Read
 *
 * @param {object} authClient
 * @param {object} query
 */
export async function batchGetSheet (authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Batchget) {
  const request = {
    ...query,
    auth: authClient
  }

  return await sheets.spreadsheets.values.batchGet(request)
}

/**
 * Delete previous sheet and create new sheet
 *
 * @param {object} authClient
 * @param {string} previousSheetId
 * @param {object} query
 */
export async function replaceSheet (authClient: OAuth2Client, { previousSheetId, query }: ReplaceSheetQuery) {
  return await Promise.all([
    deleteSheet(authClient, { fileId: previousSheetId }),
    createSheet(authClient, query)
  ])
}
