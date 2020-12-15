<template>
    <div class="border-2 col-span-2 p-5 rounded-lg h-40 text-left shadow-lg">
      <p class="">{{ playerName }}</p>
      <h1 class="text-center text-4xl">{{ word }}</h1>
    </div>
</template>

<script>


export default {
  name: 'WordCard',
  props: {
    word: String,
    playerName: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
