<template>
  <div id="hud" class="absolute right-0 top-0">
    <div class="text-right m-8">
      <p class="text-lg md:text-2xl"><strong>Players</strong></p>
      <div class="grid grid-cols-3" v-for="player in players" v-bind:key="player.id">
        <div class="col-span-1">
          <span v-if="player.score === scoreToWin" class="text-green-600">Winner! </span>
        </div>
        <div class="col-span-1 ml-5">
          <span class="text-lg md:text-xl">{{ player.name }}<span v-if="yourName === player.name" class="text-xs"> (you)</span></span>
        </div>
        <div class="col-span-1">
          <span class="text-lg md:text-xl">{{ player.score }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ScoreBoard',
  props: {
    players: Array,
    scoreToWin: Number,
    yourName: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-btn.active {
    fill: '#4287f5'
  }
</style>
