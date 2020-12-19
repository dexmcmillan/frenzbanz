<template>
  <v-app class="w-screen h-screen">

    <div v-bind:class="{'fade': gameWon}" v-if="gameStarted === true" class='grid grid-cols-1 w-screen h-screen p-5 mx-auto'>
      <div class="flex grid grid-cols-4 col-span-1 w-full xl:w-1/2 h-full self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in allWordsButYours" v-bind:key="player.id" v-bind:assignedWord="player.assignedWord" v-bind:displayWord="player.displayWord" v-bind:playerName="player.name" v-bind:justScored="justScored" v-bind:justSkipped="justSkipped"></WordCard>
      </div>
      <ButtonBar v-on:guessCard="guessCard" v-on:skip="skip" v-on:reset="reset" v-on:leaveGame="leaveGame" class="m-2"></ButtonBar>
    </div>
    <div v-if="gameStarted === false" class="flex h-screen">
      <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="startGame" :scoreToWin="scoreToWin" :numberOfWords="numberOfWords" />
    </div>
    <div v-bind:class="{'fade': gameWon}" class="absolute top-0 xs:p-5">
      <h1 class="text-left lg:text-6xl text-3xl m-8 w-screen">Frenz<span class="text-gray-400">banz</span> <span class="text-sm">v1.3.0</span></h1>
    </div>
    <div v-bind:class="{'fade': gameWon}" class="text-left absolute bottom-4 left-4 invisible md:visible">
      <a href="https://twitter.com/intent/tweet?text=Play%20Frenzbanz,%20buds!" target="_href"><v-icon class="mx-1 mb-5 ml-5">mdi-twitter</v-icon></a>
      <a href="https://github.com/dexmcmillan/frenzbanz" target="_blank"><v-icon class="mx-1 mb-5">mdi-github</v-icon></a>
    </div>
    <WinnerBox v-if="gameWon" :winner="winner" v-on:resetGame="resetGame" />
    <ScoreBoard v-bind:class="{'fade': gameWon}" v-bind:players="players" :scoreToWin="scoreToWin"></ScoreBoard>
  </v-app>
</template>

<script>
import NewPlayerCard from './components/NewPlayerCard';
import WordCard from './components/WordCard';
import ScoreBoard from './components/ScoreBoard';
import WinnerBox from './components/WinnerBox';
import ButtonBar from './components/ButtonBar';
import {sortedWords, urlWords} from './assets/data.js';
import "tailwindcss/tailwind.css"
import vm from './main.js'
import router from './router'


var Ably = require('ably');
var ably = new Ably.Realtime('c6JXpw.bymHUw:LDNkGB5SDiMNVatx');

// This section handles routing to a random url if you don't currently have a room assigned via router.
const url = window.location.href
const regex = url.substr(url.lastIndexOf('/') + 1);
console.log(regex)
let roomName = ''

if (regex === '') {
  const words = urlWords.sort(function() {
    return 0.5 - Math.random();
  })
  const firstWord = words.splice(0,1)
  const secondWord = words.splice(1,1)
  roomName = firstWord + '-' + secondWord
  router.push(roomName)
}
else {
  roomName = regex
}

const channel = ably.channels.get('signIn' + roomName);
const wordChannel = ably.channels.get('words' + roomName);
const scoreChannel = ably.channels.get('score' + roomName);

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
    const allPlayers = vm.$children[0].players
    allPlayers.forEach((player) => {
      if (player.code === scoreInfo.data.playerCode) {
        player.score = scoreInfo.data.newScore
      }
    })
    if (scoreInfo.data.newScore === vm.$children[0].scoreToWin)  {
      vm.$children[0].gameWon = true
      console.log(vm.$children[0].winner)
      vm.$children[0].winner = scoreInfo.data.playerName
    }
  })

  scoreChannel.subscribe('resetscore', function(){
    const allPlayers = vm.$children[0].players
    vm.$children[0].gameWon = false
    allPlayers.forEach((player) => {
      player.score = 0;
    })
    vm.$children[0].yourInfo.assignedWord = getWord()
    scoreChannel.publish('nextWordPlease', {playerCode: vm.$children[0].yourInfo.code, newWord: vm.$children[0].yourInfo.assignedWord})
  })

  scoreChannel.subscribe('nextWordPlease', function(newWordInfo){
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
  console.log(vm.$children[0].roomName)
  console.log("Connected!");
});

export default {
  name: 'App',
  components: {
    NewPlayerCard,
    WordCard,
    ScoreBoard,
    ButtonBar,
    WinnerBox,
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
      gameroomSetup: true,
      gameWon: false,
      winner: '',
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

      // Need to fix this bit so that the global players doesn't update the hidden word!
      if(this.players.length < 4) {
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
        this.$route

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
        scoreChannel.publish('updatescore', {playerCode: this.yourInfo.code, playerName: this.yourInfo.name, newScore: this.yourInfo.score})
        setTimeout(() => {
          this.justScored = false;
          this.yourInfo.assignedWord = getWord()
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
    resetGame: function() {
      console.log(this.gameWon)
      scoreChannel.publish('resetscore', {})
    }
  }
};

</script>

<style>
.fade {
  opacity: 0.5
}
</style>
