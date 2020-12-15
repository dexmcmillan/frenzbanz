const words = [
  'Hello', 'Bird', 'Plane', 'Whale', "Book", "The Big Bang", "Two and a Half Men", "Cold Case"
]

export const sortedWords = words.sort(function() {
  return 0.5 - Math.random();
})

export const players = [
  {
    id: 1,
    name: 'Dexter',
    get assignedWord() {
      return sortedWords[this.id]
    },
    you: "FALSE",
  },
  {
    id: 2,
    name: 'Joseph',
    get assignedWord() {
      return sortedWords[this.id]
    },
    you: "FALSE",
  },
  {
    id: 3,
    name: 'Jill',
    get assignedWord() {
      return sortedWords[this.id]
    },
    you: "FALSE",
  },
  {
    id: 4,
    name: 'Jean',
    get assignedWord() {
      return sortedWords[this.id]
    },
    you: "FALSE",
  }
]
