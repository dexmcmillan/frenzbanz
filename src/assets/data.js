const basic = [
    'Bird',
    'Plane',
    'Whale',
    "Pear",
    "Pineapple",
    "Cactus",
    "Arizona",
    "Broomstick",
    "Halloween",
    "Horse",
    "Octopus",
    "Kangaroo",
    "Banana",
    "Orangutan",
    "Golf",
    "Apple",
    "Envelope",
    "Merlot",
    "Lager",
    "Pig",
    "Drumstick",
    "Guitar",
    "Hairbrush",
    "Joystick",
    "Seagull",
    "Mouse",
    "Sailboat",
    "Ferrari",
    "Porsche"
]

const general = [
  "Cold Case",
  "Magic Wand",
  "Harry Potter",
  "Hot Air Balloon",
  "France",
  "Ford",
  "CBC News",
  "National Geographic",
  "T-Rex",
  "Easter Bunny",
  "Tooth Fairy",
  "Ice Cream Truck",
  "COVID-19",
  "Christmas Tree",
  "Gingerbread",
  "Shortbread",
  "Amazon",
  "Youtube",
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
  "Ariana Grande",
  "Taylor Swift",
  "Lady Gaga"
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
  "Monster's Inc.",
  "Westworld",
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

export const urlWords = []
basic.forEach((word) => {
  if (word.length <= 10) {
    urlWords.push(word.toLowerCase())
  }
})
console.log(urlWords)

export const sortedWords = basic.concat(general, celebrities, movies, christmas).sort(function() {
  return 0.5 - Math.random();
})
