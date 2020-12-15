<template>
  <v-app>
    <div v-if="gameStarted === 'TRUE'" class='grid grid-cols-4 w-screen h-screen p-5 border-2 justify-center'>
      <div id="hud" class="absolute right-0 top-0">
        <div class="text-left w-1/3 border-2 p-5 ml-auto">
          <h3 class="text-left">Players:</h3>
          <!-- <li class="ml-7" v-for="player in players" v-bind:key="player.id">{{ player.name }}</li> -->
        </div>
      </div>
      <div class="flex grid grid-cols-4 col-span-4 w-1/2 h-1/2 self-center content-center gap-24 mx-auto">
        <WordCard v-for="player in players" v-bind:key="player.id" v-bind:word="player.assignedWord" v-bind:playerName="player.name"></WordCard>
      </div>
      <ScoreCounter></ScoreCounter>
    </div>
    <div v-else class="flex h-screen border-2">
      <NewPlayerCard v-bind:gameStarted="gameStarted" v-on:gameStart="startGame" v-bind:name="players[0].name" v-on:update="players[0].name = $event" />
    </div>
  </v-app>
</template>

<script>
import NewPlayerCard from './components/NewPlayerCard';
import WordCard from './components/WordCard';
import ScoreCounter from './components/ScoreCounter';
import {players, sortedWords} from './assets/data.js';
import "tailwindcss/tailwind.css"

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreCounter
  },
  filters: {
    allWordsButYours()  {
      const playersToShow = []
      players.forEach((player) => {
        if (player.name !== document.getElementById('nameBox').value) {
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
      })
      this.gameStarted = "TRUE"
    },
  }
};
</script>
