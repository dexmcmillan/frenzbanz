<template>
  <v-app>
    <div class="w-screen h-screen">
      <div v-if="gameroomSetup === true" class="flex h-screen">
        <GameroomSetup v-on:roomStart="roomStart" />
        <p>Hello world</p>
      </div>
      <div v-if="gameroomSetup === false" class="flex h-screen">
        <Game />
      </div>
    </div>
  </v-app>
</template>

<script>
import Game from './components/Game';
import GameroomSetup from './components/GameroomSetup';
import "tailwindcss/tailwind.css"
// import vm from './main.js'

var Ably = require('ably');
var ably = new Ably.Realtime('c6JXpw.bymHUw:LDNkGB5SDiMNVatx');

const url = window.location.href

const regex = url.substr(url.lastIndexOf('/') + 1);
console.log(regex)


export const channel = ably.channels.get('signIn' + regex);
export const wordChannel = ably.channels.get('words' + regex);
export const scoreChannel = ably.channels.get('score' + regex);

export default {
  name: 'App',
  components: {
    Game,
    GameroomSetup
  },
  data() {
    return {
      gameroomSetup: true,
      roomName: 'default',
    }
  },
  methods: {
    roomStart: function() {
      this.gameroomSetup = false
      const roomID =  document.getElementById('roomBox').value
      this.roomName = roomID
      console.log(roomID)
    },
  },
};
</script>

<style>
</style>
