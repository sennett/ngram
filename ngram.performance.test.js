const fs = require('fs')
const moment = require('moment')

const { createDictionary } = require('./ngram')

describe('ngram performance', () => {
  describe('creating the ngram dict', () => {
    describe('follows O(N) complexity', () => {
      let _001MB, _01MB, _1MB, _10MB
      _001MB = fs.readFileSync('./_fixtures/haystack/0.01MB.txt', 'utf8')
      _01MB = fs.readFileSync('./_fixtures/haystack/0.1MB.txt', 'utf8')
      _1MB = fs.readFileSync('./_fixtures/haystack/1MB.txt', 'utf8')
      _10MB = fs.readFileSync('./_fixtures/haystack/10MB.txt', 'utf8')

      let files = [
        { name: '0.01MB', data: _001MB },
        { name: '0.1MB', data: _01MB },
        { name: '1MB', data: _1MB },
        { name: '10MB', data: _10MB }]

      createDictionary(files[0].data) // warm up
      let performanceTimings = files.map((file) => {
        let start = moment()
        createDictionary(file.data)
        let end = moment()
        return { name: file.name, time: end.diff(start) }
      })

      // assert each time is one order of magnitude greater than the last
      for (let i = 1; i < performanceTimings.length; i++) {
        let timeOne = performanceTimings[i - 1]
        let timeTwo = performanceTimings[i]
        it(`${timeOne.name} (${timeOne.time}ms) - ${timeTwo.name} (${timeTwo.time}ms)`, () => {
          expect(timeTwo.time.toString().length - timeOne.time.toString().length).toBe(1)
        })
      }
    })
  })
})
