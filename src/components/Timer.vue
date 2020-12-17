<template>
  <v-btn v-on:click="this.startTimer" class="mx-2 w-36">
    <span v-if="timerStart===true">{{ timerCount }}</span>
    <span v-else>Start Timer</span>
  </v-btn>
</template>

<script>
export default {
  name: 'Timer',
  props: {
  },
  data() {
    return {
      timerCount: 60,
      timerStart: false
    }
  },
  methods:  {
    startTimer() {
      if (this.timerStart === true) {
        this.timerStart = false
      }
      else if (this.timerStart === false) {
        this.timerCount--
        this.timerStart = true
      }
    },
  },
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0 && this.timerStart === true) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }

  }
}
</script>
