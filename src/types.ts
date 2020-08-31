import { OAuth2Client } from 'google-auth-library'

export type JSONData = {
  [key: string]: string | number | JSONData
}

export type WriteJSONFileOption = {
  raw?: boolean
  update?: boolean
}

export const enum GoogleAPIScopes {
  SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets',
  DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive',
  DRIVE_FILE_SCOPE = 'https://www.googleapis.com/auth/drive.file'
}

export type TaskFunction<T> = (oAuth2Client: OAuth2Client, param?: any) => Promise<T>

export type CredentialProps = {
  clientSecret: string
  clientId: string
  redirectUri: string
}

export type AuthTokenProps = {
  // eslint-disable-next-line
  refresh_token?: string;
  // eslint-disable-next-line
  expiry_date?: number;
  // eslint-disable-next-line
  access_token?: string;
  scope?: string;
  // eslint-disable-next-line
  token_type?: string;
  // eslint-disable-next-line
  id_token?: string;
}

export type JSONToGoogleSheetParam = {
  isCachedTokenRequired: boolean
}

export type SheetData = string[][]
