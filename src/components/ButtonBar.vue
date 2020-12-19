<template>
  <div class="absolute right-0 bottom-0 m-5">
    <v-tooltip top>
      <template v-slot:activator="{on, attrs}" >
        <v-btn v-on="on" v-bind="attrs" rounded class="m-2" v-on:click="$emit('guessCard')"><span class="text-lg">＋</span></v-btn>
      </template>
      <span>Guessed it, next card</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{on, attrs}" >
        <v-btn v-on="on" v-bind="attrs" rounded class="m-2" v-on:click="$emit('skip')">
          <span class="text-lg">
            <v-icon>mdi-debug-step-over</v-icon>
          </span>
        </v-btn>
      </template>
      <span>Too hard, skip card</span>
    </v-tooltip>
    <v-btn v-on="on" v-bind="attrs" rounded v-on:click="this.startTimer" class="mx-2" v-bind:color="this.btnColor">
        <span v-if="timerStart===true" class="text-xl">{{ timerCount }}</span>
        <span v-else class="text-lg"><v-icon>mdi-timer-sand</v-icon></span>
    </v-btn>
    <v-tooltip top>
      <template v-slot:activator="{on, attrs}" >
        <v-btn v-on="on" v-bind="attrs" rounded class="m-2" v-on:click="$emit('reset')">
          <span class="text-lg">
            <v-icon>mdi-cached</v-icon>
          </span>
        </v-btn>
      </template>
      <span>Reset score</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{on, attrs}" >
        <v-btn v-on="on" v-bind="attrs" rounded class="m-2" v-on:click="$emit('leaveGame')"><span class="text-lg"><v-icon>mdi-exit-to-app</v-icon></span></v-btn>
      </template>
      <span>Leave game</span>
    </v-tooltip>
  </div>
</template>

<script>
export default {
  name: 'ButtonBar',
  props: {
  },
  data() {
    return {
      timerCount: 60,
      timerStart: false,
      btnColor: null
    }
  },
  methods:  {
    startTimer() {
      if (this.timerStart === true) {
        this.timerStart = false
        this.btnColor = null
      }
      else if (this.timerStart === false && this.timerCount !== 0) {
        this.timerCount--
        this.timerStart = true
        this.btnColor = 'error'
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
