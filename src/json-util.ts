import fs from 'fs'
import flat from 'flat'

import { JSONData } from './types'

type GetFlattedJSONParam = {
  data?: JSONData
  filePath?: string
}

type WriteJSONFileOption = {
  raw?: boolean
}

/**
 * Get flattened JSON data from filepath or JSON data.
 *  
 * @param {object} 
 */
export function getFlattedJSON({ data, filePath }: GetFlattedJSONParam): JSONData {
  if (data) return flat.flatten(data)
  if (!filePath) throw new Error('Should provide either "data" or "filePath"')
  if (!fs.existsSync(filePath)) throw new Error('File does not exist')

  const rawJSONData = fs.readFileSync(filePath)
  const parsedJSONData = JSON.parse(rawJSONData.toString())
  return flat.flatten(parsedJSONData)
}

/**
 * WIP
 * 
 * @param {string} filePath
 * @param {object} data
 * @param {object} option
 */
export function writeJSONFile(filePath: string, data: JSONData, options?: WriteJSONFileOption): void {
  if (fs.existsSync(filePath)) throw new Error('The file alreay exists')

  if (options && options.raw) {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf-8');
    return
  }

  const falttenedJSONData = flat.unflatten(data, { object: true })
  fs.writeFileSync(filePath, JSON.stringify(falttenedJSONData), 'utf-8');
}
