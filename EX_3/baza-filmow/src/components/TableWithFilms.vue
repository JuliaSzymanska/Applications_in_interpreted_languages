<template>
  <div id="tableFilms">
    <!--    <h3>Films: </h3>-->
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
      <tr>
        <th class="col-md-4" scope="col">Title</th>
        <th class="col-md-2" scope="col">Production Year</th>
        <th class="col-md-2" scope="col">Cast</th>
        <th class="col-md-2" scope="col">Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="film in searchevents" v-bind:key="film.title">
        <td class="col-md-4">{{ film.title }}</td>
        <td class="col-md-2">{{ film.year }}</td>
        <td class="col-md-2">{{ film.cast }}</td>
        <td class="col-md-2">{{ film.genres }}</td>
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
      if (!Forms.inputTitle)
        return films
      return _.filter(films, function (film) {
        return film.title.toLowerCase().includes(Forms.inputTitle)
      })
    },
    limit: function (filmeee) {
      var limitedFilms = [];
      var i;
      for (i = 0; i < 10; i++) {
        limitedFilms.push(filmeee[i])
      }
      return limitedFilms
    }
  }
}
</script>

<style scoped>
#tableFilms {
  padding-top: 30px;
}
</style>