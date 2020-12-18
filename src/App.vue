<template>
  <v-app>
    <div class="w-screen h-screen">
      <div class="w-screen h-screen absolute top-0 xs:p-5">
        <h1 class="text-left md:text-6xl sm:text-4xl m-8 w-screen">Frenz<span class="text-gray-400">banz</span> <span class="text-sm">v1.1.0</span></h1>
        <ScoreBoard v-bind:players="players" :scoreToWin="scoreToWin"></ScoreBoard>
      </div>
      <div v-if="gameStarted === true" class='grid grid-cols-6 w-screen h-screen p-5'>
        <div class="flex grid grid-cols-6 col-span-6 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
          <WordCard v-for="player in allWordsButYours" v-bind:key="player.id" v-bind:wordNum="player.score" v-bind:word="player.assignedWord" v-bind:playerName="player.name" v-bind:score="player.score"></WordCard>
        </div>
        <div class="absolute right-0 bottom-0 m-10">
          <v-btn rounded class="m-2" v-on:click="guessCard"><span class="text-lg">＋</span></v-btn>
          <v-btn rounded class="m-2" v-on:click="skip"><span class="text-lg">Skip</span></v-btn>
          <Timer class="m-2"></Timer>
          <v-btn rounded class="m-2" v-on:click='reset'><span class="text-lg">Reset Score</span></v-btn>
          <v-btn rounded class="m-2" v-on:click='leaveGame'><span class="text-lg">Leave Game</span></v-btn>
        </div>
      </div>
      <div v-else-if="gameStarted === false" class="flex h-screen">
        <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="startGame" v-bind:name="players.name" :scoreToWin="scoreToWin" />
      </div>
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
let scoreToWin = 5
let playerCount = 0;
let you = {
  id: null,
  name: null,
  score: 0,
  wordNum: 0,
}

var Ably = require('ably');
var ably = new Ably.Realtime('c6JXpw.bymHUw:LDNkGB5SDiMNVatx');
const channel = ably.channels.get('signIn');
const wordChannel = ably.channels.get('words');

function getWord()  {
  const wordsLeft = sortedWords.sort(function() {
    return 0.5 - Math.random();
  })
  const chosenWord = wordsLeft[0]
  wordChannel.publish('wordsAssigned', chosenWord)
  return wordsLeft[0]
}

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
    }
    else if(members.length === 2) {
      allPlayers.push(members[0].data)
      allPlayers.push(members[1].data)
    }
    else if(members.length === 3) {
      allPlayers.push(members[0].data)
      allPlayers.push(members[1].data)
      allPlayers.push(members[2].data)
    }


  });
  wordChannel.subscribe(function(){
    sortedWords.splice(0,1)
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
      availableSkips: 3
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
    }
  },
  methods: {
    startGame: function() {
      if(playerCount < 4) {
        const nextID = this.players.length;

        you['id'] = nextID
        you['name'] = document.getElementById('nameBox').value
        you['code'] = ably.connection.id
        const newWord = getWord()
        you['assignedWord'] = newWord
        ably.auth.createTokenRequest({clientId: you.name}, null, function(err, tokenRequest) {
          console.log(err)
          console.log(tokenRequest)
          you['token'] = tokenRequest.clientId
        });

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
        you.assignedWord = getWord()
        channel.presence.updateClient(you.name, you)
      }
    },
    reset: function() {
      you.score = 0;
      channel.presence.updateClient(you.name, you)
    },
    skip: function()  {
      you.assignedWord = getWord()
      channel.presence.updateClient(you.name, you)
    }
  }
};
</script>

<style>
</style>
