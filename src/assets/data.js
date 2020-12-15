const words = [
  'Hello', 'Bird', 'Plane', 'Whale', "Book", "The Big Bang", "Two and a Half Men", "Cold Case", "Magic Wand", "Harry Potter"
]

export const sortedWords = words.sort(function() {
  return 0.5 - Math.random();
})

export const players = [
  {
    id: 0,
    name: 'Dexter',
    get assignedWord() {
      const sliceStart = this.id * 3
      const sliceEnd = sliceStart + 3
      return sortedWords.slice(sliceStart,sliceEnd)
    },
    you: "FALSE",
    score: 0,
  },
  {
    id: 1,
    name: 'Joseph',
    get assignedWord() {
      return sortedWords.slice(this.id*3,(this.id*3)+3)
    },
    you: "FALSE",
    score: 2,
  },
]
