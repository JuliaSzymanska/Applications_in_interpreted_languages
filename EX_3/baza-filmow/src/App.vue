<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <Forms/>
    <TableWithFilms/>
  </div>
</template>

<script>
import Forms from './components/Forms'
import TableWithFilms from './components/TableWithFilms'

export default {
  name: 'app',
  components: {
    Forms,
    TableWithFilms
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /*-webkit-font-smoothing: antialiased;*/
  /*-moz-osx-font-smoothing: grayscale;*/
  text-align: left;
  color: #2c3e50;
}
</style>
