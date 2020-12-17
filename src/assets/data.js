const words = [
  'Hello',
  'Bird',
  'Plane',
  'Whale',
  "The Big Bang",
  "Two and a Half Men",
  "Cold Case",
  "Magic Wand",
  "Harry Potter",
  "Pear",
  "Hot Air Balloon",
  "France",
  "Rudolph",
  "Frosty the Snowman",
  "Corn Cob Pipe",
  "Snowflake",
  "Britney Spears",
  "Elon Musk",
  "Ford",
  "Westworld",
  "Donald Trump",
  "Hermione Granger",
  "CBC News",
  "Pineapple",
  "Cactus",
  "Arizona",
  "Homer Simpson",
  "National Geographic",
  "T-Rex",
  "Broomstick",
  "Halloween",
  "Christmas Eve"
]

export const sortedWords = words.sort(function() {
  return 0.5 - Math.random();
})
