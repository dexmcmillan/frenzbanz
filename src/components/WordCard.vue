<template>
    <div class="border-2 col-span-3 p-5 rounded-lg h-40 text-left shadow-lg">
      <p class="">{{ playerName }}</p>
      <h1 v-if="displayWord === assignedWord" class="text-center text-4xl">{{ assignedWord }}</h1>
      <h1 v-if="justScored === false && justSkipped === false && displayWord !== assignedWord" class="text-center text-4xl">{{ displayWord }}</h1>
      <h1 v-else-if="justScored === true && displayWord !== assignedWord" class="text-center text-4xl text-green-400">Nailed it, bud!</h1>
      <h1 v-else-if="justSkipped === true && displayWord !== assignedWord" class="text-center text-2xl text-gray-400">Ya skipped 'er! Word was {{ assignedWord }}.</h1>
    </div>
</template>

<script>


export default {
  name: 'WordCard',
  props: {
    displayWord: String,
    assignedWord: String,
    playerName: String,
    justScored: Boolean,
    justSkipped: Boolean,
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
