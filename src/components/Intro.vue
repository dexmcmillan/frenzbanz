<template>
    <div class="p-7 sm:mt-18 w-full md:w-2/3 lg:w-1/3 mx-auto my-auto">
      <h3 class="text-2xl font-bold mb-3">Rules</h3>
      <p>Each player begins their turn by starting the timer. They may then ask each other player one question about their word, which is visible only to them. You may not ask "what is my word?" but can ask questions like "do I have a tail?" If you guess your word before the timer expires, increase your score and you'll be assigned a new card. You may continue in this way until the timer expires, then the next player takes their turn. Continue until the first player reaches <strong>{{ scoreToWin }}</strong>. They win the game.</p>
      <p>Play with up to three other friends at a time by sharing this link:</p>
      <v-text-field :value='link' label="Solo" solo readonly class="flex text-center w-2/3 mx-auto">
      </v-text-field>
        <p>Enter your name and join the game below. The total game set currently contains <strong>{{ numberOfWords }}</strong> words.</p>
      <div class="w-2/3 mx-auto">
        <v-text-field outlined id="nameBox" class="w-full text-xl" label="Name"></v-text-field>
        <v-btn rounded class="flex w-1/2 md:w-1/3 mx-auto my-5" v-on:click="$emit('gameStart')">Join Game</v-btn>
      </div>

    </div>
</template>

<script>


export default {
  name: 'Intro',
  model: {
    prop: 'name',
    event: 'input'
  },
  data() {
    return {
      link: window.location.href.substr(window.location.href.indexOf('/') + 2),
    }
  },
  props: {
    name: String,
    gameStarted: Boolean,
    scoreToWin: Number,
    numberOfWords: Number,
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
