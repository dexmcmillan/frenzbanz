<template>
  <v-app>
    <div class="w-screen absolute top-0">
      <h1 class="text-center text-5xl m-10 w/screen">Headbanz!</h1>
    </div>
    <div v-if="gameStarted === 'TRUE'" class='grid grid-cols-6 w-screen h-screen p-5'>
      <ScoreBoard v-bind:players="players"></ScoreBoard>
      <div class="flex grid grid-cols-6 col-span-6 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in allWordsButYours" v-bind:key="player.id" v-bind:word="player.assignedWord" v-bind:playerName="player.name"></WordCard>
      </div>
      <div class="absolute right-0 bottom-0 m-10">
        <v-btn class="text-3xl border-2 mx-2" style="border-radius: 5px" v-on:click="you.score++">+</v-btn>
        <v-btn class="mx-2" v-on:click='you.score = 0'>Reset Score</v-btn>
        <v-btn class="mx-2" v-on:click='gameStarted = "FALSE"'>End Game</v-btn>
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
import {players, sortedWords} from './assets/data.js';
import "tailwindcss/tailwind.css"

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreBoard
  },
  computed: {
    allWordsButYours()  {
      const playersToShow = []
      players.forEach((player) => {
        if (player.you === "FALSE") {
          playersToShow.push(player)
        }
      })
      return playersToShow
    },
    you()  {
      let you = {}
      players.forEach((player) => {
        if (player.you === "TRUE") {
          you = player;
        }
      })
      return you
    },
  },
  data() {
    return {
      players: players,
      words: sortedWords,
      gameStarted: 'FALSE',
    }
  },
  methods: {
    startGame: function() {
      players.push({
        id: 1,
        name: document.getElementById('nameBox').value,
        get assignedWord() {
          return sortedWords[this.id]
        },
        you: "TRUE",
        score: 0
      })
      this.gameStarted = "TRUE"
    },
    endGame: function() {
      players = [];
      this.gameStarted = "FALSE"
    },
  }
};
</script>

<style>

</style>
