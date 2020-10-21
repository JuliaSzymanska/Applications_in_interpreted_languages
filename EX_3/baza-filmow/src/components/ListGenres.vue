<template>
  <div id="listGenres">
    <div class="col-md">
    <h2>Filmy wg gatunku</h2>
      <ol>
        <li v-for="film in this.searchGenres()" v-bind:key="film.title">{{ film.title }}</li>
      </ol>
    </div>
  </div>
</template>

<script>

import films from '../films'
import _ from 'lodash';

export default {
  name: "ListGenres",
  data() {
    return {
      Films: films,
      n: 10
    }
  },
  computed: {},
  methods: {
    searchGenres: function () {
      //TODO: jakos tak ale mi nie dziala przez to ze cast jest arrayem
      return _.filter(this.Films, function (film) {
        _.filter(film.cast, function (casts) {
          return casts === "Comedy"
        })
      })
    },
  }
}
</script>

<style scoped>

</style>