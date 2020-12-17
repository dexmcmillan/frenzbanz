<template>
  <div id="hud" class="absolute right-0 top-0">
    <div class="text-right p-5">
      <p><strong>Players</strong></p>
      <div class="grid grid-cols-3" v-for="player in players" v-bind:key="player.id">
        <div class="col-span-1">
          <span v-if="player.score === scoreToWin" class="text-green-600">Winner! </span>
        </div>
        <div class="col-span-1 ml-5">
          {{ player.name }}
        </div>
        <div class="col-span-1">
          {{ player.score }}
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-btn.active {
    fill: '#4287f5'
  }
</style>
