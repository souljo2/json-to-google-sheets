import fs from 'fs'
import flat from 'flat'

import { JSONData, WriteJSONFileOption } from './types'

/**
 * Get flattened JSON data
 *  
 * @param {object} data - JSONData
 */
export function getFlattedJSON(jsonData: JSONData): JSONData {
  return flat.flatten(jsonData)
}

/**
 * Write data to JSON
 * 
 * @param {string} filePath
 * @param {object} data
 * @param {object} option
 */
export function writeJSONFile(filePath: string, jsonData: JSONData, options?: WriteJSONFileOption): void {
  if (fs.existsSync(filePath)) throw new Error('The file alreay exists')

  if (options) {
    if (options.update) {
      fs.unlinkSync(filePath);
    }

    if (options.raw) {
      fs.writeFileSync(filePath, JSON.stringify(jsonData), 'utf-8');
      return
    }
  }

  const falttenedJSONData = flat.unflatten(jsonData, { object: true })
  fs.writeFileSync(filePath, JSON.stringify(falttenedJSONData), 'utf-8');
}
