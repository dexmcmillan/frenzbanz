<template>
  <v-app>
    <div class='grid grid-cols-4 w-screen h-screen p-5 border-2 justify-center'>
      <div id="hud" class="absolute right-0 top-0">
        <NewPlayerCard v-bind:name="players[0].name" />
        <!-- <div class="text-left w-1/3 border-2 p-5 ml-auto">
          <h3 class="text-left">Players:</h3>
          <li class="ml-7" v-for="player in players" v-bind:key="player.id">{{ player.name }}</li>
        </div> -->
      </div>
      <div class="flex grid grid-cols-4 col-span-4 w-1/2 h-1/2 self-center content-center gap-4 mx-auto">
        <WordCard v-for="card in cards" v-bind:key="card.id" v-bind:word="card.word" v-bind:playerName="card.assigned"></WordCard>
      </div>
    </div>
    <ScoreCounter></ScoreCounter>
  </v-app>
</template>

<script>
import NewPlayerCard from './components/NewPlayerCard';
import WordCard from './components/WordCard';
import ScoreCounter from './components/ScoreCounter';
import {players, cards} from './assets/data.js';
import "tailwindcss/tailwind.css"

export default {
  name: 'App',

  components: {
    NewPlayerCard,
    WordCard,
    ScoreCounter
  },
  data() {
    return {
      players: players,
      cards: cards,
    }
  },
};
</script>
