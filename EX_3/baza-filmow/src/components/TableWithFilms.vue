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
      <tr v-for="film in this.limit()" v-bind:key="film.title">
        <td class="col-md-4">{{ film.title }}</td>
        <td class="col-md-2">{{ film.year }}</td>
        <td class="col-md-2">{{ film.cast }}</td>
        <td class="col-md-2">{{ film.genres }}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-primary btn-lg btn-block" v-on:click="this.increaseLimit()" id="wiecej">
        Więcej
      </button>
    </div>
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
      Films: films,
      n: 10
    }
  },
  // computed: {
  //   limit: function () {
  //     let limitedFilms = [];
  //     for (let i = 0; i < this.n; i++) {
  //       limitedFilms.push(this.searchevents()[i])
  //     }
  //     return limitedFilms
  //   }
  // },
  methods: {
    searchevents: function () {
      if (!Forms.inputTitle)
        return this.Films
      return _.filter(this.Films, function (film) {
        return film.title.toLowerCase().includes(Forms.inputTitle)
      })
    },
    limit: function () {
      let limitedFilms = [];
      for (let i = 0; i < this.n; i++) {
        limitedFilms.push(this.searchevents()[i])
      }
      return limitedFilms
    },
    increaseLimit: function () {
      this.n += 10
      this.$refs.table.refresh();
    },
  }
}
</script>

<style scoped>
#tableFilms {
  padding-top: 30px;
}
#wiecej {
  margin-bottom: 30px;
}
</style>