<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>{{num}}</p>
    <Counter :num="num" @increment="increment" @decrement="decrement"></Counter>
  </div>
</template>

<script>
import Counter from './Counter'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '父子组件双向通信',
      num: 10
    }
  },
  methods:{
    increment(){
      this.num++;
    },
    decrement(){
      this.num--;
    }
  },
  components:{
    Counter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
