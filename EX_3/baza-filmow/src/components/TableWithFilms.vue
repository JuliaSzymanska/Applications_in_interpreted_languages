<template>
  <div id="tableFilms" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
      <tr>
        <th class="col-md-2" scope="col">Title</th>
        <th class="col-md-2" scope="col">Production Year</th>
        <th class="col-md-2" scope="col">Cast</th>
        <th class="col-md-2" scope="col">Genres</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="film in this.limit()" v-bind:key="film.title">
        <td class="col-md-2">{{ film.title }}</td>
        <td class="col-md-2">{{ film.year }}</td>
        <td class="col-md-2" v-for="(cast, index) in film.cast" :key="index">{{ cast }}</td>
        <td class="col-md-2" v-for="(genre, index) in film.genres" :key="index">{{ genre }}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <!-- TODO: onclick niby dziala, ale nwm jak odswiezyc tabelke -->
      <!-- TODO: update wywolanie  moet nie dziala, ale pojedyncza instrukcja działa -->
      <button type="button" class="btn btn-primary btn-lg btn-block" id="wiecej" @click="this.increaseLimit">
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
  computed: {},
  methods: {
    searchevents: function () {
      if (!Forms.inputTitle)
        return this.Films
      // todo: filtrowanie dziala dobrze jako filtrowanie, tera trzeba cos z tym zrobic
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
    },
  }
}
</script>

<style scoped>

#tableFilms {
  padding-top: 30px;
  border-collapse: collapse;
}

#wiecej {
  margin-bottom: 30px;
}
</style>