<template>
  <div class="container">
    <h3>Films: </h3>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Production Year</th>
        <th scope="col">Cast</th>
        <th scope="col">Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="film in searchevents" v-bind:key="film.title">
        <th scope="row">{{ film.title }}</th>
        <td>{{ film.year }}</td>
        <td>{{ film.cast }}</td>
        <td>{{ film.genres }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import films from '../films'
import Forms from './Forms'
import _ from 'lodash';
export default {
  name: "TableWithFilms",
  data() {
    return {
      Films: films
    }
  },
  computed: {
    searchevents: function () {
      // let result = films
      if (!Forms.inputTitle)
        return films
      return _.filter(films, function (film) {
        return film.title.toLowerCase().includes(Forms.inputTitle)
      })
    }
  }
}
</script>

<style scoped>

</style>