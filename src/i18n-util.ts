import { JSONData, SheetData } from './types'

/**
 * Merge locale json data with Google spreadsheet
 *
 * @param {string[][]} sheetData
 * @param {object} jsonData
 * @param {string} representativeLocale
 */
export function mergeJSONWithSheetData (sheetData: SheetData, jsonData: JSONData, representativeLocale: string) {
  const [header] = sheetData
  const [, ...headerRow] = header
  const localeIndexes: JSONData = {}
  const result: JSONData = getJSONFromSheetData(sheetData)

  headerRow.forEach((locale, index) => {
    localeIndexes[locale] = index
  })

  for (const i18nKey in jsonData) {
    // Add new i18n keys
    if (!(result[representativeLocale] as JSONData)[i18nKey]) {
      for (const locale in localeIndexes) {
        (result[locale] as JSONData)[i18nKey] = representativeLocale === locale ? jsonData[i18nKey] : ''
      }
    }
  }

  const updatedSheetRows: string[][] = []
  for (const i18nKey in result[representativeLocale] as JSONData) {
    const row = [i18nKey]

    for (const locale in localeIndexes) {
      row.push(((result[locale] as JSONData)[i18nKey]) as string)
    }

    updatedSheetRows.push(row)
  }

  return [header, ...updatedSheetRows]
}

/**
 * Get json data from Google spread sheet
 *
 * @param {object} sheetData
 */
export function getJSONFromSheetData (sheetData: SheetData) {
  const [header, ...sheetRows] = sheetData
  const [, ...headerRow] = header
  const localeIndexes: JSONData = {}
  const result: JSONData = {}

  headerRow.forEach((locale, index) => {
    localeIndexes[locale] = index
    result[locale] = {}
  })

  sheetRows.forEach((sheetRow) => {
    const [i18nKey, ...valueByLocales] = sheetRow
    valueByLocales.forEach((value, index) => {
      const locale = headerRow[index] as string
      (result[locale] as JSONData)[i18nKey] = value
    })

    let emptyLoopCount = headerRow.length - valueByLocales.length
    while (emptyLoopCount) {
      const locale = headerRow[valueByLocales.length + emptyLoopCount - 1] as string
      (result[locale] as JSONData)[i18nKey] = ''
      emptyLoopCount--
    }
  })

  return result
}
