import { OAuth2Client } from 'google-auth-library';

export type JSONData = {
  [key: string]: string | JSONData
}

export const enum GoogleAPIScopes {
  SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets",
  DRIVE_SCOPE = "https://www.googleapis.com/auth/drive"
}

export type TaskFunction = (oAuth2Client: OAuth2Client) => void

export type CredentialProps = {
  clientSecret: string
  clientId: string
  redirectUri: string
}

export type AuthTokenProps = {
  refresh_token?: string;
  expiry_date?: number;
  access_token?: string;
  scope?: string;
  token_type?: string;
  id_token?: string;
}
