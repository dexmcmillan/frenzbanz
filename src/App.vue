<template>
  <v-app>
    <div class="w-screen absolute top-0">
      <h1 class="text-center text-5xl m-10 w/screen">Headbanz!</h1>
      <ScoreBoard v-bind:players="players"></ScoreBoard>
    </div>
    <div v-if="gameStarted === 'TRUE' && this.playerCount < 4" class='grid grid-cols-6 w-screen h-screen p-5'>

      <div class="flex grid grid-cols-6 col-span-6 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in players" v-bind:key="player.id" v-bind:word="player.assignedWord" v-bind:playerName="player.name" v-bind:score="player.score"></WordCard>
      </div>
      <div class="absolute right-0 bottom-0 m-10">
        <v-btn class="text-3xl border-2 mx-2" style="border-radius: 5px" v-on:click="guessCard">+</v-btn>
        <v-btn class="mx-2" v-on:click='reset'>Reset Score</v-btn>
        <v-btn class="mx-2" v-on:click='leaveGame'>Leave Game</v-btn>
      </div>
    </div>
    <div v-else-if="gameStarted === 'FALSE'" class="flex h-screen">
      <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="ready" v-bind:name="players.name" />
    </div>
    <div v-else-if="playerCount >= 4" class="flex h-screen">
      <p>Can't join!</p>
    </div>
  </v-app>
</template>

<script>
import NewPlayerCard from './components/NewPlayerCard';
import WordCard from './components/WordCard';
import ScoreBoard from './components/ScoreBoard';
import {sortedWords} from './assets/data.js';
import "tailwindcss/tailwind.css"

var Ably = require('ably');
var ably = new Ably.Realtime('c6JXpw.bymHUw:LDNkGB5SDiMNVatx');
const channel = ably.channels.get('signIn');
const wordChannel = ably.channels.get('words');

let allPlayers = []
let wordsLeft = sortedWords
let playerCount = 0;
let you = {
  id: null,
  name: null,
  score: 0,
}

ably.connection.on('connected', function() {
  channel.presence.subscribe('enter', function(member) {
    allPlayers.push(member.data)
  });
  channel.presence.subscribe('update', function(member) {
    const pos = allPlayers.map(function(e) { return e.name; }).indexOf(member.data.name);
    console.log('Position:' + pos)
    allPlayers.splice(pos, 1, member.data)
  });
  channel.presence.subscribe('leave', function() {
    channel.presence.get(function(err, members) {
      if(members.length >= 1) {
        allPlayers.splice(0)
        allPlayers.push(members[0].data)
      }
    });
    this.gameStarted = 'FALSE';
  });
  channel.presence.get(function(err, members) {
    playerCount = members.length
    if(members.length === 1) {
      allPlayers.push(members[0].data)
      let usedWords1 = members[0].data.assignedWord
      usedWords1.forEach((word) => {
        let pos = sortedWords.indexOf(word)
        sortedWords.splice(pos,1)
      })
    }
    else if(members.length === 2) {
      allPlayers.push(members[0].data)
      let usedWords2 = members[0].data.assignedWord
      usedWords2.forEach((word) => {
        let pos = sortedWords.indexOf(word)
        sortedWords.splice(pos,1)
      })
      allPlayers.push(members[1].data)
      usedWords2 = members[1].data.assignedWord
      usedWords2.forEach((word) => {
        let pos = sortedWords.indexOf(word)
        sortedWords.splice(pos,1)
      })
    }
    else if(members.length === 3) {
      allPlayers.push(members[0].data)
      let usedWords3 = members[0].data.assignedWord
      usedWords3.forEach((word) => {
        let pos = sortedWords.indexOf(word)
        sortedWords.splice(pos,1)
      })
      allPlayers.push(members[1].data)
      usedWords3 = members[1].data.assignedWord
      usedWords3.forEach((word) => {
        let pos = sortedWords.indexOf(word)
        sortedWords.splice(pos,1)
      })
      allPlayers.push(members[2].data)
      usedWords3 = members[2].data.assignedWord
      usedWords3.forEach((word) => {
        let pos = sortedWords.indexOf(word)
        sortedWords.splice(pos,1)
      })
    }


  });
  wordChannel.subscribe(function(){
    wordsLeft = sortedWords.splice(3)
  })
  console.log("Connected!");
});

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreBoard
  },
  data() {
    return {
      players: allPlayers,
      words: sortedWords,
      gameStarted: 'FALSE',
      playerCount: playerCount,
    }
  },
  methods: {
    allWordsButYours()  {
      const playersToShow = []
      this.players.forEach((player) => {
        if (player.you === "FALSE") {
          playersToShow.push(player)
        }
      })
      return playersToShow
    },
    startGame: function() {

      this.gameStarted = "TRUE"
    },
    ready: function() {
      if(playerCount < 4) {
        const nextID = this.players.length;

        you['id'] = nextID
        you['name'] = document.getElementById('nameBox').value
        const sliceStart = 0
        const sliceEnd = 3
        const words = wordsLeft.slice(sliceStart,sliceEnd)
        you['assignedWord'] = words
        wordChannel.publish('wordsAssigned', words)
        //
        // this.players.push(newPlayerInfo)
        channel.presence.enterClient(you.name, you)
        this.gameStarted = "TRUE"
        this.playerCount++
      }
      else {
        alert("Too many players bud!")
      }
    },
    endGame: function() {
      this.gameStarted = "FALSE"
      you.score = 0;
      channel.presence.updateClient(you.name, you)
    },
    leaveGame: function() {
      this.gameStarted = "FALSE"
      channel.presence.leaveClient(you.name, you)
    },
    guessCard: function() {
      you.score++
      channel.presence.updateClient(you.name, you)

    },
    reset: function() {
      you.score = 0;
      channel.presence.updateClient(you.name, you)
    }
  }
};
</script>

<style>

</style>
