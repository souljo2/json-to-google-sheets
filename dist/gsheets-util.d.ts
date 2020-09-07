import { drive_v3 as Drive3, sheets_v4 as Sheets4 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
export declare type ReplaceSheetQuery = {
    previousSheetId: string;
    query: Sheets4.Params$Resource$Spreadsheets$Create;
};
export declare function listFiles(authClient: OAuth2Client, query: Drive3.Params$Resource$Files$List): Promise<import("gaxios").GaxiosResponse<Drive3.Schema$FileList>>;
export declare function deleteFiles(authClient: OAuth2Client, query: Drive3.Params$Resource$Files$Delete): Promise<import("gaxios").GaxiosResponse<void>>;
export declare function createSheet(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Create): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$Spreadsheet>>;
export declare function batchUpdateSheet(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Batchupdate): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$BatchUpdateSpreadsheetResponse>>;
export declare function getSheet(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Get): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$Spreadsheet>>;
export declare function getSheetValues(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Get): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$ValueRange>>;
export declare function batchGetSheetValues(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Batchget): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$BatchGetValuesResponse>>;
export declare function batchClearSheetValues(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Batchclear): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$BatchClearValuesResponse>>;
export declare function batchUpdateSheetValues(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Batchupdate): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$BatchUpdateValuesResponse>>;
export declare function clearSheetValues(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Clear): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$ClearValuesResponse>>;
export declare function updateSheetValues(authClient: OAuth2Client, query: Sheets4.Params$Resource$Spreadsheets$Values$Update): Promise<import("gaxios").GaxiosResponse<Sheets4.Schema$UpdateValuesResponse>>;
