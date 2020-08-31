import { mergeJSONWithSheetData, getJSONFromSheetData } from '../src/i18n-util'

describe('i18n-util', () => {
  test('getJSONFromSheetData()', () => {
    const testSheetData = [
      ['key', 'en-US', 'ko-KR', 'zh-CN'],
      ['greet.hello', 'Hello', '뿌빠빠빠'],
      ['greet.bye.good_bye', 'Good bye', '', 'ABCD'],
      ['greet.bye.have_a_gday', 'Have a good day'],
      ['time.hour', 'Hour'],
      ['time.minute', 'Minute'],
      ['time.second.second', 'Second'],
      ['time.second.milli', 'milliseconds'],
      ['calc.add', 'Add']
    ]

    const testAnswer = {
      "en-US": {
        "calc.add": "Add",
        "greet.bye.good_bye": "Good bye",
        "greet.bye.have_a_gday": "Have a good day",
        "greet.hello": "Hello",
        "time.hour": "Hour",
        "time.minute": "Minute",
        "time.second.milli": "milliseconds",
        "time.second.second": "Second",
      },
      "ko-KR": {
        "calc.add": "",
        "greet.bye.good_bye": "",
        "greet.bye.have_a_gday": "",
        "greet.hello": "뿌빠빠빠",
        "time.hour": "",
        "time.minute": "",
        "time.second.milli": "",
        "time.second.second": "",
      },
      "zh-CN": {
        "calc.add": "",
        "greet.bye.good_bye": "ABCD",
        "greet.bye.have_a_gday": "",
        "greet.hello": "",
        "time.hour": "",
        "time.minute": "",
        "time.second.milli": "",
        "time.second.second": "",
      },
    }

    expect(getJSONFromSheetData(testSheetData)).toStrictEqual(testAnswer)
  })

  test('mergeJSONWithSheetData()', () => {
    const testSheetData = [
      ['key', 'en-US', 'ko-KR', 'zh-CN'],
      ['test.test1', 'EN1', 'KO1', ''],
      ['test.test2', 'EN2', '', 'ZH1'],
      ['test2.test1', 'EN3', '', ''],
      ['test2.test2', 'EN4', 'KO2', 'ZH2'],
    ]

    const testJSONData = {
      'test.test1': 'Updated EN1',
      'test.test4': 'Updated EN2',
      'test.test5': 'Updated EN3',
      'test2.test1': 'EN3',
      'test2.test2': 'EN4',
      'test2.test3': 'Updated EN4',
      'test2.test4': 'Updated EN5',
      'test3.test1': 'Updated EN6',
      'test3.test2': 'Updated EN7',
      'test3.test3': 'Updated EN8',
    }

    const testAnswer = {
      updatedKeys: [
        'test.test1',
        'test.test4',
        'test.test5',
        'test2.test3',
        'test2.test4',
        'test3.test1',
        'test3.test2',
        'test3.test3',
      ],
      updatedRowIndexes: [0, 3, 4, 5, 6, 7, 8, 9],
      sheet: [
        ["key", "en-US", "ko-KR", "zh-CN"],
        ["test.test1", "Updated EN1", "KO1", ""],
        ["test2.test1", "EN3", "", ""],
        ["test2.test2", "EN4", "KO2", "ZH2"],
        ["test.test4", "Updated EN2", "", ""],
        ["test.test5", "Updated EN3", "", ""],
        ["test2.test3", "Updated EN4", "", ""],
        ["test2.test4", "Updated EN5", "", ""],
        ["test3.test1", "Updated EN6", "", ""],
        ["test3.test2", "Updated EN7", "", ""],
        ["test3.test3", "Updated EN8", "", ""]
      ]
    }

    expect(mergeJSONWithSheetData(testSheetData, testJSONData, 'en-US')).toStrictEqual(testAnswer)
  })
})