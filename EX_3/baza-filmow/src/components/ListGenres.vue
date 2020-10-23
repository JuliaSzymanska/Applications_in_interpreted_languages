<template>
  <div id="listGenres">
    <div class="col-md">
      <h2>Filmy wg gatunku</h2>
<!-- TODO: pewnie można to jakoś ładnie zrobić w JS za pomocą fora czy cos -->
      <h3 style="margin-top: 30px">{{ this.genresArray[0] }}</h3>
      <ol>
        <li v-for="film in this.searchGenres(this.genresArray[0])" v-bind:key="film.title">{{ film.title }}</li>
      </ol>
      <h3 style="margin-top: 30px">{{ this.genresArray[1] }}</h3>
      <ol>
        <li v-for="film in this.searchGenres(this.genresArray[1])" v-bind:key="film.title">{{ film.title }}</li>
      </ol>
      <h3 style="margin-top: 30px">{{ this.genresArray[2] }}</h3>
      <ol>
        <li v-for="film in this.searchGenres(this.genresArray[2])" v-bind:key="film.title">{{ film.title }}</li>
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
      n: 10,
      genresArray: ["Comedy", "Documentary", "Short",]
    }
  },
  computed: {

    createList: function () {

    }

  },
  methods: {
    searchGenres: function (genre) {
      return _.filter(this.Films, function (film) {
        let isInIt = false
        for (let i = 0; i < film.cast.length; i++) {
          if (film.genres[i] === genre) {
            isInIt = true
          }
        }
        return isInIt
      }).slice(0, 10)
    },
  }
}
</script>

<style scoped>

</style>