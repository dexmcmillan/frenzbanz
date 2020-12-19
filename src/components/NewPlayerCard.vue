<template>
    <div class="p-7 sm:mt-18 md:w-1/3 xs:w-full mx-auto my-auto">
      <h3 class="text-2xl font-bold mb-3">Rules</h3>
      <p>Each player begins their turn by starting the timer. They may then ask each other player one question about their word, which is visible only to them. You may not ask "what is my word?" but can ask questions like "do I have a tail?" If you guess your word before the timer expires, increase your score and you'll be assigned a new card. You may continue in this way until the timer expires. First player to {{ scoreToWin }} wins the game.</p>
      <p>Enter your name and join the game below. The total game set currently contains <strong>{{ numberOfWords }}</strong> words.</p>
      <p>Only four players may join at once.</p>
      <div class="w-2/3 mx-auto sm:mt-32 md:mt-24">
        <v-text-field outlined id="nameBox" class="w-full text-xl" label="Name"></v-text-field>
        <v-text-field outlined id="roomBox" class="w-full text-xl" label="Room ID"></v-text-field>
        <v-btn rounded class="w-full my-5" v-on:click="$emit('gameStart')">Join Game</v-btn>
      </div>

    </div>
</template>

<script>


export default {
  name: 'NewPlayerCard',
  model: {
    prop: 'name',
    event: 'input'
  },
  props: {
    name: String,
    gameStarted: Boolean,
    scoreToWin: Number,
    numberOfWords: Number,
    roomName: String,
  },
  computed: {
    playerName: {
      get: function()  {
        return name
      },
      set: function(newValue) {
        return newValue
      }
  }
  },
  mounted() {

},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
