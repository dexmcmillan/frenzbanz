<template>
  <v-app>
    <div class="w-screen h-screen absolute top-0 xs:p-5">
      <h1 class="text-left text-5xl m-10 w/screen"><span class="text-sm">(not)</span> Headbanz <span class="text-sm">v1.0.0</span></h1>
      <ScoreBoard v-bind:players="players" :scoreToWin="scoreToWin"></ScoreBoard>
    </div>
    <div v-if="gameStarted === true" class='grid grid-cols-6 w-screen h-screen p-5'>
      <div class="flex grid grid-cols-6 col-span-6 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in allWordsButYours" v-bind:key="player.id" v-bind:word="player.assignedWord" v-bind:playerName="player.name" v-bind:score="player.score"></WordCard>
      </div>
      <div class="absolute right-0 bottom-0 m-10">
        <v-btn class="text-3xl m-2" v-on:click="guessCard">+</v-btn>
        <Timer class="m-2"></Timer>
        <v-btn class="m-2" v-on:click='reset'>Reset Score</v-btn>
        <v-btn class="m-2" v-on:click='leaveGame'>Leave Game</v-btn>
      </div>
    </div>
    <div v-else-if="gameStarted === false" class="flex h-screen">
      <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="ready" v-bind:name="players.name"  :scoreToWin="scoreToWin" />
    </div>
  </v-app>
</template>

<script>
import NewPlayerCard from './components/NewPlayerCard';
import WordCard from './components/WordCard';
import ScoreBoard from './components/ScoreBoard';
import Timer from './components/Timer';
import {sortedWords} from './assets/data.js';
import "tailwindcss/tailwind.css"

let allPlayers = []
let scoreToWin = 10
let wordsLeft = sortedWords
let playerCount = 0;
let you = {
  id: null,
  name: null,
  score: 0,
}

var Ably = require('ably');
var ably = new Ably.Realtime('c6JXpw.bymHUw:LDNkGB5SDiMNVatx');
const channel = ably.channels.get('signIn');
const wordChannel = ably.channels.get('words');

ably.connection.on('connected', function() {
  channel.presence.subscribe('enter', function(member) {
    allPlayers.push(member.data)
  });
  channel.presence.subscribe('update', function(member) {
    const pos = allPlayers.map(function(e) { return e.name; }).indexOf(member.data.name);
    allPlayers.splice(pos, 1, member.data)
  });
  channel.presence.subscribe('leave', function(member) {
    const pos = allPlayers.map(function(e) { return e.name; }).indexOf(member.data.name);
    allPlayers.splice(pos, 1, member.data)
    channel.presence.get(function(err, members) {
        allPlayers.splice(0)
        allPlayers.push(members[0].data)
    });
    playerCount--
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
    wordsLeft = sortedWords.splice(scoreToWin)
  })
  console.log("Connected!");
});

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreBoard,
    Timer
  },
  data() {
    return {
      players: allPlayers,
      words: sortedWords,
      gameStarted: false,
      playerCount: playerCount,
      scoreToWin: scoreToWin,
    }
  },
  computed: {
    allWordsButYours: function()  {
      const playersToShow = []
      this.players.forEach((player) => {
        if (ably.connection.id !== player.code) {
          playersToShow.push(player)
        }
      })
      return playersToShow
    },
  },
  methods: {

    startGame: function() {

      this.gameStarted = true
    },
    ready: function() {
      if(playerCount < 4) {
        const nextID = this.players.length;

        you['id'] = nextID
        you['name'] = document.getElementById('nameBox').value
        you['code'] = ably.connection.id
        const sliceStart = 0
        const sliceEnd = scoreToWin
        const words = wordsLeft.slice(sliceStart,sliceEnd)
        you['assignedWord'] = words
        ably.auth.createTokenRequest({clientId: you.name}, null, function(err, tokenRequest) {
          console.log(err)
          console.log(tokenRequest)
          you['token'] = tokenRequest.clientId
        });
        wordChannel.publish('wordsAssigned', words)
        //
        // this.players.push(newPlayerInfo)
        channel.presence.updateClient(you.name, you)
        this.gameStarted = true
        this.playerCount++
        console.log("ID: " + ably.connection.id)
        console.log("Player Code: " + you.code)
      }
      else {
        alert("Too many players bud!")
      }
    },
    endGame: function() {
      this.gameStarted = false
      you.score = 0;
      channel.presence.update(you.name, you)
    },
    leaveGame: function() {
      this.gameStarted = false
      channel.presence.leaveClient(you.name, you)
    },
    guessCard: function() {
      if (you.score < scoreToWin) {
        you.score++
        channel.presence.updateClient(you.name, you)
      }
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
