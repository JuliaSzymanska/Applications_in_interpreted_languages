<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <Forms @search-event="handleAppEvent"/>
    <TableWithFilms :dataFromEvent='eventData' />
    <ListGenres/>
    <ListCast/>
  </div>
</template>

<script>
import Forms from './components/Forms'
import TableWithFilms from './components/TableWithFilms'
import ListCast from "@/components/ListCast";
import ListGenres from "@/components/ListGenres";
import films from '@/films'

export default {
  name: 'app',
  components: {
    ListGenres,
    ListCast,
    Forms,
    TableWithFilms
  },
  data: function(){
    return {
      eventData: films
    }
  },
  methods: {
    handleAppEvent: function(data) {
      this.eventData = data;
    }
  }
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
