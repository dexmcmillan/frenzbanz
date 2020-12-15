<template>
  <v-btn class="text-3xl border-2 w-20 h-10 self-end mx-auto" style="border-radius: 5px">+</v-btn>
</template>

<script>

export default {
  name: 'ScoreCounter',
  props: {
    you: Object,
  },
  methods:  {
    reset: function () {
      const children = document.getElementById('counters').children;
      for(let i = 0; i < children.length; i++ ){
        children[i].setAttribute('fill','#c9c9c9');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .v-btn.active {
    fill: '#4287f5'
  }
</style>
