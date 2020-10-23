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
        <td class="col-md-2">{{ film.cast.sort().join(', ') }}</td>
        <td class="col-md-2" v-for="(genre, index) in film.genres" :key="index">{{ genre }}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <button type="button" class="btn btn-primary btn-lg btn-block" id="wiecej" @click="this.increaseLimit">
        Więcej
      </button>
    </div>
  </div>
</template>

<script>
import films from '../films'
import _ from 'lodash';

export default {
  name: "TableWithFilms",
  data() {
    return {
      Films: films,
      n: 10,
      inputTitle: "After",
      inputYearFrom: "",
      inputYearTo: "",
      inputCast: ""
    }
  },
  computed: {},
  methods: {
    searchevents: function () {
      let tit = this.inputTitle
      if (tit === "")
        return this.Films
      return _.filter(this.Films, function (film) {
        return film.title.toLowerCase().includes(tit.toLowerCase())
      })
    },

    limit: function () {
      return this.searchevents().slice(0, this.n)
    },

    increaseLimit: function () {
      this.n += 10
    },

    setInputs(title, dateFrom, dateTo, cast) {
      this.inputTitle = title
      this.inputYearFrom = dateFrom
      this.inputYearTo = dateTo
      this.inputCast = cast
      // alert("halo")
      this.limit()
    }
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