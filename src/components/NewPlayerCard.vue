<template>
    <div class="p-7 rounded-lg w-55 float-right">
      <v-input>
        <v-text-field class="w-full" v-model="name" label="Name"></v-text-field>
      </v-input>
    </div>
</template>

<script>


export default {
  name: 'NewPlayerCard',
  props: {
    name: String,
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
    if (localStorage.name) {
      this.name = localStorage.name;
    }

    var Ably = require('ably');
    if (localStorage.name) {
      this.name = localStorage.name;
    }

    var ably = new Ably.Realtime('Eu8tBQ.6-xYZA:ukBv9IIiC4Q9341U');
    var channel = ably.channels.get('test');

    // Publish a message to the test channel
    channel.publish('greeting', 'hello');
  },
  watch: {
    name(newName) {
      localStorage.name = newName;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
