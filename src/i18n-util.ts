import { JSONData, SheetData } from './types'

/**
 * Merge locale json data with Google spreadsheet
 *
 * @param {string[][]} sheetData
 * @param {object} jsonData
 * @param {string} representativeLocale
 */
export function mergeJSONWithSheetData (sheetData: SheetData, jsonData: JSONData, representativeLocale: string) {
  const [header, ...sheetRows] = sheetData
  const [/* STATUS */, /* KEY */, ...headerRow] = header
  const localeIndexes: JSONData = {}
  const result: JSONData = {}
  const updatedKeys: string[] = []
  const newKeys: string[] = []
  const deletedKeys: string[] = []

  headerRow.forEach((locale, index) => {
    localeIndexes[locale] = index
    result[locale] = {}
  })

  sheetRows.forEach((sheetRow) => {
    const [status, i18nKey, ...valueByLocales] = sheetRow

    if (status !== 'DELETED') {
      if (jsonData[i18nKey]) {
        valueByLocales.forEach((value, index) => {
          const locale = headerRow[index] as string

          if (locale === representativeLocale) {
            if (jsonData[i18nKey] !== value) {
              updatedKeys.push(i18nKey)
            }

            (result[locale] as JSONData)[i18nKey] = jsonData[i18nKey]
          } else {
            (result[locale] as JSONData)[i18nKey] = value || ''
          }
        })

        let emptyLoopCount = headerRow.length - valueByLocales.length
        while (emptyLoopCount) {
          const locale = headerRow[valueByLocales.length + emptyLoopCount - 1] as string
          (result[locale] as JSONData)[i18nKey] = ''
          emptyLoopCount--
        }

        // 마크한 Key는 삭제
        delete jsonData[i18nKey]
      } else {
        deletedKeys.push(i18nKey)
      }
    }
  })

  // New i18n keys
  for (const i18nKey in jsonData) {
    newKeys.push(i18nKey)

    for (const locale in localeIndexes) {
      (result[locale] as JSONData)[i18nKey] = representativeLocale === locale ? jsonData[i18nKey] : ''
    }
  }

  const updatedSheetRows: string[][] = []
  for (const i18nKey in result[representativeLocale] as JSONData) {
    const row: string[] = []

    // Set status
    if (newKeys.includes(i18nKey)) row.push('NEW')
    else if (updatedKeys.includes(i18nKey)) row.push('UPDATED')
    else row.push('-')

    // Set key
    row.push(i18nKey)

    // Set values by locales
    for (const locale in localeIndexes) {
      row.push(((result[locale] as JSONData)[i18nKey]) as string)
    }

    updatedSheetRows.push(row)
  }

  return {
    sheet: [header, ...updatedSheetRows.sort((firstRow, secondRow) => firstRow[1].localeCompare(secondRow[1]))],
    deleted: deletedKeys.map((deletedKey) => ['DELETED', deletedKey])
  }
}

/**
 * Get json data from Google spread sheet
 *
 * @param {object} sheetData
 */
export function getJSONFromSheetData (sheetData: SheetData) {
  const [header, ...sheetRows] = sheetData
  const [/* STATUS */, /* KEY */, ...headerRow] = header
  const localeIndexes: JSONData = {}
  const result: JSONData = {}

  headerRow.forEach((locale, index) => {
    localeIndexes[locale] = index
    result[locale] = {}
  })

  sheetRows.forEach((sheetRow) => {
    const [status, i18nKey, ...valueByLocales] = sheetRow
    if (status !== 'DELETED') {
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
    }
  })

  return result
}
