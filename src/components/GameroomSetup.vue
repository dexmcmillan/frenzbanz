<template>
    <div class="p-7 sm:mt-18 md:w-1/3 xs:w-full mx-auto my-auto border-2">
      <p>Here's the landing page for the app. Go to your room <router-link to="/foo">here</router-link>.</p>
      <div class="w-2/3 mx-auto sm:mt-32 md:mt-24">
        <v-text-field id="roomBox" outlined class="w-full text-xl" label="Room Name"></v-text-field>
        <v-btn rounded class="w-full my-5" v-on:click="$emit('roomStart')">Start Room</v-btn>
      </div>
    </div>

</template>

<script>


export default {
  name: 'GameroomSetup',
  props: {
    roomName: String,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
