<template>
  <v-app>
    <div class="w-screen absolute top-0">
      <h1 class="text-center text-5xl m-10 w/screen">Headbanz!</h1>
    </div>
    <div v-if="gameStarted === 'TRUE'" class='grid grid-cols-6 w-screen h-screen p-5'>
      <ScoreBoard v-bind:players="players"></ScoreBoard>
      <div class="flex grid grid-cols-6 col-span-6 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in players" v-bind:key="player.id" v-bind:word="player.assignedWord" v-bind:playerName="player.name" v-bind:score="player.score"></WordCard>
      </div>
      <div class="absolute right-0 bottom-0 m-10">
        <v-btn class="text-3xl border-2 mx-2" style="border-radius: 5px" v-on:click="guessCard">+</v-btn>
        <v-btn class="mx-2" v-on:click='you.score = 0'>Reset Score</v-btn>
        <v-btn class="mx-2" v-on:click='endGame'>End Game</v-btn>
      </div>
    </div>
    <div v-else class="flex h-screen">
      <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="startGame" v-bind:name="players.name" />
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
ably.connection.on('connected', function() {
  console.log("Connected!");
});

const channel = ably.channels.get('signIn');

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreBoard
  },
  computed: {
    you()  {
      let you = {}
      this.players.forEach((player) => {
        if (player.you === "TRUE") {
          you = player;
        }
      })
      return you
    },
  },
  data() {
    return {
      players: [],
      words: sortedWords,
      gameStarted: 'FALSE',
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

      channel.subscribe(function(message) {
        allPlayers.push(message.data);
        console.log('All players added to game.')
      });

      const nextID = this.players.length;
      const allPlayers = this.players

      const newPlayerInfo = {
        id: nextID,
        name: document.getElementById('nameBox').value,
        get assignedWord() {
          const sliceStart = this.id * 3
          const sliceEnd = sliceStart + 3
          return sortedWords.slice(sliceStart,sliceEnd)
        },
        you: "TRUE",
        score: 0,
      }

      allPlayers.push(newPlayerInfo)

      channel.publish('allPlayers', allPlayers, function(err){
        console.log(err)
      });
      this.gameStarted = "TRUE"
    },
    endGame: function() {
      this.players = [];
      this.gameStarted = "FALSE"
      console.log('Game ended.')
    },
    guessCard: function() {
      if (this.you.score < 3) {
        this.you.score++
      }
    }
  }
};
</script>

<style>

</style>
