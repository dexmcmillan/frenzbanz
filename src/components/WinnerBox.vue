<template>
    <v-alert border="left" color="indigo" class="absolute top-1/3 left-1/3 p-5 w-full md:w-2/3 lg:w-1/3 rounded-lg text-left shadow-lg border-2" type="info">
      <p>Game over! {{ winner }} won the game.</p>
      <v-btn rounded class="m-2 float-right" v-on:click="$emit('resetGame')">
        <span class="text-md">
          Again!
        </span>
      </v-btn>
    </v-alert>
</template>

<script>


export default {
  name: 'WinnerBox',
  props:  {
    winner: String,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
