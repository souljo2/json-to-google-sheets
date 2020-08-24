export type JSONData = {
  [key: string]: string | JSONData
}

export const enum GoogleAPIScopes {
  SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets",
  DRIVE_SCOPE = "https://www.googleapis.com/auth/drive"
}