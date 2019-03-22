const { ngram } = require('./ngram')

describe('basic test cases', () => {
  it('finds three characters', () => {
    expect(ngram('hello world', 'hel')).toBe(true)
    expect(ngram('hello world', 'o w')).toBe(true)
    expect(ngram('hello world', 'rld')).toBe(true)
  })
  it('does not find three characters that don\'t exist', () => {
    expect(ngram('hello world', 'ord')).toBe(false)
    expect(ngram('hello world', 'ld ')).toBe(false)
    expect(ngram('hello world', 'ldh')).toBe(false)
  })

  describe('Nx ngram needle', () => {
    it('passes for 6 existing chars', () => {
      expect(ngram('hello world', 'hello ')).toBe(true)
    })

    it('fails for 6 non-existing chars', () => {
      expect(ngram('hello world', 'hellow')).toBe(false)
    })

    it('fails with existing chars that spill over', () => {
      expect(ngram('hello world', 'world ')).toBe(false)
    })

    describe('3x ngram length', () => {
      it('passes with existing chars', () => {
        expect(ngram('hello world', 'hello wor')).toBe(true)
      })

      it('fails with last char different', () => {
        expect(ngram('hello world', 'hello woX')).toBe(false)
      })
    })
  })

  describe('needle is not ngram length', () => {
    describe('needle is 2 chars', () => {
      it('passes with existing chars', () => {
        expect(ngram('hello world', 'el')).toBe(true)
      })

      it('fails missing chars', () => {
        expect(ngram('hello world', 'eX')).toBe(false)
      })
    })

    describe('needle is 4 chars', () => {
      it('passes with existing chars', () => {
        expect(ngram('hello world', 'llo ')).toBe(true)
      })

      it('fails missing chars', () => {
        expect(ngram('hello world', 'lloo')).toBe(false)
      })
    })
  })

  describe('single char', () => {
    it('finds char at start of ngram length', () => {
      expect(ngram('hello world', 'w')).toBe(true)
    })

    it('finds char at middle of ngram length', () => {
      expect(ngram('hello world', 'e')).toBe(true)
    })

    it('finds char at end of ngram length', () => {
      expect(ngram('hello world', 'r')).toBe(true)
    })

    it('does not find non-existing char', () => {
      expect(ngram('hello world', 'X')).toBe(false)
    })
  })
  // emoji
})
