import { JSONData, WriteJSONFileOption } from './types';
export declare function getFlattedJSON(jsonData: JSONData): JSONData;
export declare function writeJSONFile(filePath: string, jsonData: JSONData, options?: WriteJSONFileOption): void;
