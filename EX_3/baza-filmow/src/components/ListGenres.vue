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
      return _.filter(this.Films, function (film) {
        let isInIt = false
        for (let i = 0; i < film.cast.length; i++) {
            if (film.genres[i] === "Comedy") {
              isInIt = true
            }
        }
        return isInIt
        })
    },
  }
}
</script>

<style scoped>

</style>