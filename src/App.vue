<template>
  <v-app>
    <div class="w-screen absolute top-0">
      <h1 class="text-center text-5xl m-10 w/screen">Headbanz!</h1>
    </div>
    <div v-if="gameStarted === 'TRUE'" class='grid grid-cols-4 w-screen h-screen p-5 justify-center'>
      <ScoreBoard v-bind:players="players"></ScoreBoard>
      <div class="flex grid grid-cols-4 col-span-4 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in allWordsButYours" v-bind:key="player.id" v-bind:word="player.assignedWord" v-bind:playerName="player.name"></WordCard>
      </div>
      <ScoreCounter></ScoreCounter>
      <v-btn class="absolute right-0 bottom-0 m-10" v-on:click='gameStarted = "FALSE"'>End Game</v-btn>
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
import ScoreCounter from './components/ScoreCounter';
import {players, sortedWords} from './assets/data.js';
import "tailwindcss/tailwind.css"

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreCounter,
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
    }
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
