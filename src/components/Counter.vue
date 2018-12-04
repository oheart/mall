<template>
  <div>
      <button @click="$emit('increment')">+</button>
      <button @click="$emit('decrement')">-</button>
      <p>{{num}}</p>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props:['num']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
