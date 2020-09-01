import { OAuth2Client } from 'google-auth-library';
export declare type JSONData = {
    [key: string]: string | number | JSONData;
};
export declare type WriteJSONFileOption = {
    raw?: boolean;
    update?: boolean;
};
export declare const enum GoogleAPIScopes {
    SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets",
    DRIVE_SCOPE = "https://www.googleapis.com/auth/drive",
    DRIVE_FILE_SCOPE = "https://www.googleapis.com/auth/drive.file"
}
export declare type TaskFunction<T> = (oAuth2Client: OAuth2Client, param?: any) => Promise<T>;
export declare type CredentialProps = {
    clientSecret: string;
    clientId: string;
    redirectUri: string;
};
export declare type AuthTokenProps = {
    refresh_token?: string;
    expiry_date?: number;
    access_token?: string;
    scope?: string;
    token_type?: string;
    id_token?: string;
};
export declare type JSONToGoogleSheetParam = {
    isCachedTokenRequired: boolean;
};
export declare type SheetData = string[][];
