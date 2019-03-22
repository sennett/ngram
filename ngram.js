// ngrams dict: 1.  ngrams indices: 1.  required indices: 1.

const NGRAM_LENGTH = 3

function findThePiece (ngrams, needleNgrams, requiredIndices = null) {
  if (needleNgrams.length === 0) {
    // got to the end of the ngram without invalidating the branch, so we found it!
    return true
  }

  let needleNgram = needleNgrams[0]

  // todo: cache these smaller end ngrams in ngram dict, then don't need to loop through everything each time
  let haystackNgram = Object.getOwnPropertyNames(ngrams).find((ngram) => ngram.startsWith(needleNgram))

  if (!haystackNgram) {
    // needleNgram not found, so invalidate this branch
    return false
  }

  let ngramIndexes = needleNgram.length === NGRAM_LENGTH ? ngrams[needleNgram] : ngrams[haystackNgram]

  requiredIndices = requiredIndices || ngramIndexes

  // create new indices

  let newIndices = []

  ngramIndexes.forEach((index) => {
    if (requiredIndices.includes(index)) { // ensure index
      newIndices.push(index + NGRAM_LENGTH) // push new index
    }
  })

  if (newIndices.length === 0) {
    // needleNgram does not have the right location, so invalidate this branch
    return false
  }

  let nextNeedleNgrams = needleNgrams.slice(1) // remove first ngram - down the tree

  return findThePiece(ngrams, nextNeedleNgrams, newIndices)
}

function createDictionary (haystack) {
  let ngramDictionary = {}
  const haystackArr = haystack.split('')
  for (let i = 0; i <= haystack.length - NGRAM_LENGTH; i++) {
    const startIndex = i
    const endIndex = i + NGRAM_LENGTH
    const ngram = haystackArr.slice(startIndex, endIndex).join('')
    ngramDictionary[ngram] = ngramDictionary[ngram] || []
    ngramDictionary[ngram].push(startIndex)
  }
  return ngramDictionary
}

function ngram (haystack, needle) {
  // create ngram dictionary
  let ngramDictionary = createDictionary(haystack)

  // todo: use a dictionary here too, to avoid looping later
  // split up needle into ngram-size pieces
  let needlePieces = []
  let needlePieceBuffer = []
  for (let i = 0; i < needle.length; i++) {
    needlePieceBuffer.push(needle[i])
    if (needlePieceBuffer.length % NGRAM_LENGTH === 0 || i === needle.length - 1) {
      needlePieces.push(needlePieceBuffer.join(''))
      needlePieceBuffer = []
    }
  }

  // find if the first and second parts of the needle exist in the correct place
  return findThePiece(ngramDictionary, needlePieces)
}

module.exports = { ngram, createDictionary }
