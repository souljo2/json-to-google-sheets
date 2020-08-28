/**
 * Example > 
 *  resource: {
 *    properties: {
 *      title: <SHEET_TITLE>
 *    },
 *    sheets: [
 *      {
 *        resource: {
 *          properties: {
 *            title: <SHEET_TITLE>
 *          },
 *        }
 *      },
 *      ...
 *    ]
 *  }
 */
export const createSheetQuery = (title: string, locales: string[]) => {
  const sheets = locales.map((locale) => ({
    properties: {
      title: locale
    }
  }))

  return {
    resource: {
      properties: { title },
      sheets
    }
  }
}

export const listAllSheetsFilesQuery = { q: "mimeType='application/vnd.google-apps.spreadsheet'" }

export const listAllSheetsFilesFilteredBySheetNameQuery = (sheetName: string) => ({
  q: `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${sheetName}'`
})

export const getSheetQuery = (spreadsheetId: string, range: string) => ({
  spreadsheetId: spreadsheetId,
  range: range,
  majorDimension: "row"
})

/**
 * Example > 
 *  resource: {
 *    spreadsheetId: <SHEET_ID>,
 *    valueRanges: [
 *      {
 *        range: <RANGE>,
 *        majorDimension: <DIMENSION>
 *      },
 *      ...
 *    ]
 *  }
 */
export const batchGetSheetQuery = (spreadsheetId: string, ranges: string[]) => {
  const valueRanges = ranges.map(range => ({
    range: range,
    majorDimension: "row"
  }))

  return {
    spreadsheetId: spreadsheetId,
    valueRanges: valueRanges
  }
}

export const deleteQuery = (fileId: string) => ({ fileId: fileId })

/**
 * Example > 
 *  previousSheetId: <SHEET_ID>
 *  query: {
 *    resource: {
 *      properties: {
 *        title: <SHEET_TITLE>
 *    },
 *    sheets: [
 *      {
 *        resource: {
 *          properties: {
 *            title: <SHEET_TITLE>
 *          }
 *      }
 *    ]
 *  }
 *  resource: {
 *    properties: {
 *      title: <SHEET_TITLE>
 *    },
 *    sheets: [
 *      {
 *        resource: {
 *          properties: {
 *            title: <SHEET_TITLE>
 *          },
 *        }
 *      },
 *      ...
 *    ]
 *  }
 */
export const replaceQuery = (previousSheetId: string, title: string, locales: string[]) => {
  return {
    previousSheetId: previousSheetId,
    query: createSheetQuery(title, locales)
  }
}