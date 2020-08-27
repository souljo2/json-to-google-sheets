```
export async function getSheets(authClient: OAuth2Client, { sheetName }: GoogleSheetFuncParam) {
  const request = {
    q: `mimeType='application/vnd.google-apps.spreadsheet' and name contains '${sheetName}'`,
    auth: authClient
  };

  const { data } = await drive.files.list(request)
  return data.files
}

export async function readSheet(authClient: OAuth2Client, { sheetId }: GoogleSheetFuncParam) {
  const request = {
    spreadsheetId: sheetId,
    range,
    auth: authClient
  };

  const { data } = await sheets.spreadsheets.values.get(request)
  return data.values
}

export async function batchReadSheet(authClient: OAuth2Client, { sheetId }: GoogleSheetFuncParam) {
  const request = {
    spreadsheetId: sheetId,
    range,
    auth: authClient
  };

  const { data } = await sheets.spreadsheets.values.get(request)
  return data.values
}

export function createSheet(authClient: OAuth2Client, { sheetName, data }: GoogleSheetFuncParam) {
  const request = {
    "properties": {
      "title": "create-test"
    },
    "sheets": [
      {
        "properties": {
          "title": "test1"
        }
      },
      {
        "properties": {
          "title": "test2"
        }
      },
      {
        "properties": {
          "title": "test3"
        }
      }
    ]
  }

  // sheets.spreadsheets.create
}
```