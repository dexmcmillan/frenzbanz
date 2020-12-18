<template>
  <v-app>
    <div class="w-screen h-screen">
      <div class="absolute top-0 xs:p-5">
        <h1 class="text-left lg:text-6xl sm:text-4xl m-8 w-screen">Frenz<span class="text-gray-400">banz</span> <span class="text-sm">v1.1.0</span></h1>
        <!-- <div v-if="justSkipped === true" class="text-left md:text-xl sm:text-4xl m-8 w-screen">
          <p><em>Skipped: {{ yourInfo.assignedWord }}</em></p>
        </div> -->
      </div>
      <ScoreBoard v-bind:players="players" :scoreToWin="scoreToWin"></ScoreBoard>
      <div v-if="gameStarted === true" class='grid grid-cols-1 w-screen h-screen p-5 mx-auto'>

        <div class="flex grid grid-cols-3 col-span-1 w-full md:w-1/3 h-full self-center content-center gap-24 mx-auto">
          <WordCard v-for="player in allWordsButYours" v-bind:key="player.id" v-bind:assignedWord="player.assignedWord" v-bind:displayWord="player.displayWord" v-bind:playerName="player.name" v-bind:justScored="justScored" v-bind:justSkipped="justSkipped"></WordCard>
        </div>
        <div class="absolute right-0 bottom-0 m-10">
          <div class="text-center w-20 text-green-400" v-if="justScored === true">+1</div>
          <v-btn rounded class="m-2" v-on:click="guessCard"><span class="text-lg">＋</span></v-btn>
          <v-btn rounded class="m-2" v-on:click="skip"><span class="text-lg">Skip</span></v-btn>
          <Timer class="m-2"></Timer>
          <v-btn rounded class="m-2" v-on:click='reset'><span class="text-lg">Reset Score</span></v-btn>
          <v-btn rounded class="m-2" v-on:click='leaveGame'><span class="text-lg">Leave Game</span></v-btn>
        </div>
      </div>
      <div v-else-if="gameStarted === false" class="flex h-screen">
        <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="startGame" :scoreToWin="scoreToWin" :numberOfWords="numberOfWords" />
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
import vm from './main.js'


var Ably = require('ably');
var ably = new Ably.Realtime('c6JXpw.bymHUw:LDNkGB5SDiMNVatx');
const channel = ably.channels.get('signIn');
const wordChannel = ably.channels.get('words');
const scoreChannel = ably.channels.get('score');

function getWord()  {
  const wordsLeft = sortedWords.sort(function() {
    return 0.5 - Math.random();
  })
  const chosenWord = wordsLeft[0]
  wordChannel.publish('wordsAssigned', chosenWord)
  return wordsLeft[0]
}

function getCurrentPlayers()  {
  channel.presence.get(function(err, members) {
    members.forEach((player) => {
      vm.$children[0].players.push(player.data)
    })
  });
}

function updatePlayerData(member) {
  const pos = vm.$children[0].players.map(function(e) { return e.name; }).indexOf(member.data.name);
  vm.$children[0].players.splice(pos, 1, member.data)
}

function thisPlayer() {
  let yourFile = {}
  vm.$children[0].players.forEach((player) => {
    if (ably.connection.id === player.code) {
      yourFile = player
    }
  })
  return yourFile
}

function removePlayer() {
  channel.presence.get(function(err, members) {
    const pos = members.indexOf(thisPlayer().code)
    vm.$children[0].players.splice(pos)
    vm.$children[0].players.push(members[pos].data)
  });
}

ably.connection.on('connected', function() {

  channel.presence.subscribe('enter', function(member) {
    vm.$children[0].players.push(member.data)
    console.log(vm.$children[0].players.length)
  });

  channel.presence.subscribe('update', function(member) {
    updatePlayerData(member)
  });

  channel.presence.subscribe('leave', function(member) {
    removePlayer()
    updatePlayerData(member)
  });

  getCurrentPlayers();

  wordChannel.subscribe(function(wordChosen){
    const pos = vm.$children[0].words.indexOf(wordChosen.data)
    vm.$children[0].words.splice(pos,1)
  })

  scoreChannel.subscribe('updatescore', function(scoreInfo){
    console.log(scoreInfo.data)
    const allPlayers = vm.$children[0].players
    allPlayers.forEach((player) => {
      if (player.code === scoreInfo.data.playerCode) {
        player.score = scoreInfo.data.newScore
      }
    })
  })

  scoreChannel.subscribe('nextWordPlease', function(newWordInfo){
    console.log(newWordInfo.data)
    if (newWordInfo.data.playerCode !== vm.$children[0].yourInfo.code)  {
      const allPlayers = vm.$children[0].players
      allPlayers.forEach((player) => {
        if (player.code === newWordInfo.data.playerCode) {
          player.assignedWord = newWordInfo.data.newWord
          player.displayWord = newWordInfo.data.newWord
        }
      })
    }
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
      players: [],
      words: sortedWords,
      gameStarted: false,
      scoreToWin: 5,
      availableSkips: 3,
      justScored: false,
      justSkipped: false,
      numberOfWords: sortedWords.length,
    }
  },
  computed: {
    allWordsButYours: function()  {
      const playersToShow = []
      this.players.forEach((player) => {
        if (ably.connection.id !== player.code) {
          playersToShow.push(player)
        }
        else {
          player.displayWord = "?"
          playersToShow.push(player)
        }
      })
      return playersToShow
    },
    yourInfo() {
      return thisPlayer()
    }
  },
  methods: {
    startGame: function() {
      // if(vm.$children[0].players.length !== 1) {
      //   getCurrentPlayers();
      // }

      if(vm.$children[0].players.length < 4) {
        const newWord = getWord()
        let you = {
          code: ably.connection.id,
          name: document.getElementById('nameBox').value,
          score: 0,
          assignedWord: newWord,
          displayWord: newWord,
        }
        ably.auth.createTokenRequest({clientId: you.name}, null, function() {});
        channel.presence.enterClient(you.name, you, function(){})
        this.gameStarted = true

      }
      else {
        alert("Too many players bud!")
      }
    },
    endGame: function() {
      this.gameStarted = false
      this.yourInfo.score = 0;
      channel.presence.updateClient(this.yourInfo.name, this.yourInfo)
    },
    leaveGame: function() {
      this.gameStarted = false
      channel.presence.leaveClient(this.yourInfo.name, this.yourInfo)
    },
    guessCard: function() {
      if (this.yourInfo.score < this.scoreToWin) {
        this.justScored = true
        this.yourInfo.score++
        setTimeout(() => {
          this.justScored = false;
          this.yourInfo.assignedWord = getWord()
          scoreChannel.publish('updatescore', {playerCode: this.yourInfo.code, newScore: this.yourInfo.score})
          scoreChannel.publish('nextWordPlease', {playerCode: this.yourInfo.code, newWord: this.yourInfo.assignedWord})
        }, 2000);


      }
    },
    skip: function()  {
      this.justSkipped = true;
      setTimeout(() => {
        this.justSkipped = false;
        this.yourInfo.assignedWord = getWord()
        scoreChannel.publish('nextWordPlease', {playerCode: this.yourInfo.code, newWord: this.yourInfo.assignedWord})
      }, 2000);

    },
    reset: function() {
      this.yourInfo.score = 0;
      channel.presence.updateClient(this.yourInfo.name, this.yourInfo)
    },
  }
};
</script>

<style>
</style>
