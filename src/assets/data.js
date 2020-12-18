const general = [
  'Bird',
  'Plane',
  'Whale',
  "Cold Case",
  "Magic Wand",
  "Harry Potter",
  "Pear",
  "Hot Air Balloon",
  "France",
  "Ford",
  "Westworld",
  "CBC News",
  "Pineapple",
  "Cactus",
  "Arizona",
  "National Geographic",
  "T-Rex",
  "Broomstick",
  "Halloween",
  "Easter Bunny",
  "Tooth Fairy",
  "Ice Cream Truck",
  "Octopus",
  "Kangaroo",
  "COVID-19",
  "Christmas Tree",
  "Gingerbread",
  "Shortbread",
  "Banana",
  "Orangutan",
  "Golf",
  "Amazon",
  "Apple",
  "Youtube",
  "Envelope",
  "Merlot",
  "Lager",
  "iPhone",
  "Corn Flakes",
  "Chocolate Milk",
  "Air Force One",
]

const celebrities = [
  "Bill Gates",
  "Jeff Bezos",
  "Justin Trudeau",
  "Britney Spears",
  "Elon Musk",
  "Tom Hanks",
  "Donald Trump",
]

const movies = [
  "Return of the King",
  "The Big Bang",
  "Two and a Half Men",
  "Orc",
  "Legolas",
  "Return of the King",
  "Homer Simpson",
  "Hermione Granger",
  "Blackhawk Down",
  "Aladdin",
  "Snow White and the Seven Dwarves",
  "Cinderella",
  "A Bug's Life",
  "Monster's Inc."
]

const christmas = [
  "Christmas Eve",
  "Rudolph",
  "Frosty the Snowman",
  "Corn Cob Pipe",
  "Snowflake",
  "Ornament",
  "Candy Cane",
  "Wrapping Paper"
]

export const sortedWords = general.concat(celebrities, movies, christmas).sort(function() {
  return 0.5 - Math.random();
})
