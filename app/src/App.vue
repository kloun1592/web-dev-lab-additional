<template>
  <div id="app">
    <Parser msg="Парсер новостей"/>
  </div>
</template>

<script>
import Parser from './components/Parser.vue'

export default {
  name: 'app',
  components: {
    Parser
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  text-align: center;
}
</style>
