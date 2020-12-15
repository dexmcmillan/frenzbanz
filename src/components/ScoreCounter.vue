<template>
    <div class="col-span-1 p-5 rounded-lg w-screen h-40 absolute bottom-0">
      <div class="w-48 h-16 mx-auto">
        <svg id="counters">
          <circle id="btn1" cx="40" cy="32" r="20" fill="#c9c9c9" onclick="document.getElementById('btn1').setAttribute('fill','#4287f5')" />
          <circle id="btn2" cx="90" cy="32" r="20" fill="#c9c9c9" onclick="document.getElementById('btn2').setAttribute('fill','#4287f5')" />
          <circle id="btn3" cx="140" cy="32" r="20" fill="#c9c9c9" onclick="document.getElementById('btn3').setAttribute('fill','#4287f5')" />
        </svg>
      </div>
      <div class="mx-auto w-48">
        <v-btn class="mx-auto w-full" v-on:click="reset">Reset</v-btn>
      </div>
    </div>
</template>

<script>

export default {
  name: 'NewPlayerCard',
  props: {
    score: String,
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
