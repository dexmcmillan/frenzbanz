<template>
    <div :id="cardId" class="border-2 col-span-3 p-5 rounded-lg h-40 text-left shadow-lg">
      <p class="">{{ playerName }}</p>
      <h1 class="text-center text-4xl">{{ word[score] }}</h1>
    </div>
</template>

<script>


export default {
  name: 'WordCard',
  props: {
    word: Array,
    playerName: String,
    score: Number
  },
  computed: {
    cardId: function() {
      return 'wordcard-' + this.playerName
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
