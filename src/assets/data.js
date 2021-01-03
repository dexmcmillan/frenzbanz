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
  "Mailman",
  "Dumpster",
  "Persimmon",
  "Blackberry",
  "Blueberry",
  "Radar",
  "Daisy",
  "Tulip",
  "Chimney",
]

const general = [
  "Cold Case",
  "Magic Wand",
  "Harry Potter",
  "Hot Air Balloon",
  "France",
  "Ford",
  "CBC News",
  "Ferrari",
  "Porsche",
  "National Geographic",
  "T-Rex",
  "Easter Bunny",
  "Tooth Fairy",
  "Ice Cream Truck",
  "COVID-19",
  "Amazon",
  "Youtube",
  "iPhone",
  "Corn Flakes",
  "Chocolate Milk",
  "Air Force One",
  "Black Hole",
  "Milky Way",
  "Twix",
  "Willy Wonka",
  "Hot Tub",
  "Thor",
  "Zeus",
  "Hades",
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
  "The X-Files",
  "Fox Mulder",
  "Dana Scully",
  "Netflix",

]

const christmas = [
  "Christmas Eve",
  "Rudolph",
  "Frosty the Snowman",
  "Corn Cob Pipe",
  "Snowflake",
  "Ornament",
  "Candy Cane",
  "Wrapping Paper",
  "Christmas Tree",
  "Gingerbread",
  "Shortbread",
]



export const urlWords = []
basic.forEach((word) => {
  if (word.length <= 10) {
    urlWords.push(word.toLowerCase())
  }
})
console.log(urlWords)

export const aliasCombos = []
// Since you only want pairs, there's no reason
// to iterate over the last element directly
for (let i = 0; i < basic.length - 1; i++) {
  // This is where you'll capture that last value
  for (let j = i + 1; j < basic.length; j++) {
    const theCombo = `/${basic[i]}-${basic[j]}`
    aliasCombos.push(theCombo.toLowerCase());
  }
}

console.log(aliasCombos)

export const sortedWords = basic.concat(general, celebrities, movies).sort(function() {
  return 0.5 - Math.random();
})
