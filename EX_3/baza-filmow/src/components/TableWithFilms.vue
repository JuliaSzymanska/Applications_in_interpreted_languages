<template>
  <div class="container">
    <h3>Films: </h3>
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
      <tr>
        <th class="col-sm-2" scope="col">Title</th>
        <th class="col-sm-2" scope="col">Production Year</th>
        <th class="col-sm-2" scope="col">Cast</th>
        <th class="col-sm-2" scope="col">Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="film in searchevents" v-bind:key="film.title">
        <td class="col-sm-2" >{{ film.title }}</td>
        <td class="col-sm-2">{{ film.year }}</td>
        <td class="col-sm-2">{{ film.cast }}</td>
        <td class="col-sm-2">{{ film.genres }}</td>
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