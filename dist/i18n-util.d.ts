import { JSONData, SheetData } from './types';
export declare function mergeJSONWithSheetData(sheetData: SheetData, jsonData: JSONData, representativeLocale: string): {
    sheet: string[][];
    deleted: string[][];
};
export declare function getJSONFromSheetData(sheetData: SheetData): JSONData;
