<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view class="main" />
    <router-view class="left" name="title" />
    <router-view class="right" name="img" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.left,.right{
  float: left;
  width: 50%;
  border: 1px soid gray;
  box-sizing: border-box;
}
</style>
