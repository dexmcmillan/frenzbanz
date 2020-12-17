<template>
    <div class="p-7 rounded-lg w-1/3 mx-auto my-auto border-2 shadow-lg">
      <p>Welcome to Zoom Headbanz! Enter your name and join the game below. First to {{ scoreToWin }} wins the game.</p>
      <v-input>
        <v-text-field id="nameBox" class="w-full" label="Name"></v-text-field>
      </v-input>
      <v-btn class="mx-auto float-right" v-on:click="$emit('gameStart')">Join Game</v-btn>
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
    // if (localStorage.name) {
    //   this.name = localStorage.name;
    // }
    //
    // if (localStorage.name) {
    //   this.name = localStorage.name;
    // }

    // var Ably = require('ably');
    // var ably = new Ably.Realtime('Eu8tBQ.6-xYZA:ukBv9IIiC4Q9341U');
    // var channel = ably.channels.get('test');
    //
    // // Publish a message to the test channel
    // channel.publish('greeting', 'hello');
    // },
   //  watch: {
   //    name(newName) {
   //      localStorage.name = newName;
   //    }
   // },
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
