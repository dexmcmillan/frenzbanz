<template>
  <v-app>
    <div class='w-screen h-screen p-5 border-2'>
      <div id="hud" class="grid grid-cols-1 absolute right-0 top-0">
        <NewPlayerCard v-bind:name="players[0].name" />
        <h3>Players:</h3>
        <p v-for="player in players" v-bind:key="player.id">{{ player.name }}</p>
      </div>
    </div>
  </v-app>
</template>

<script>
import NewPlayerCard from './components/NewPlayerCard';
import players from './assets/data.js';
import "tailwindcss/tailwind.css"

export default {
  name: 'App',

  components: {
    NewPlayerCard,
  },
  data() {
    return {
      players: players,
    }
  },
};
</script>
