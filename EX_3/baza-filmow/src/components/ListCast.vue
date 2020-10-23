<template>
  <div id="listCast">
    <div class="col-md">
      <h2>Filmy wg obsady</h2>
<!--      &lt;!&ndash; TODO: pewnie można to jakoś ładnie zrobić w JS za pomocą fora czy cos &ndash;&gt;-->
      <h3 style="margin-top: 30px">{{ this.castArray[0] }}</h3>
      <ol>
        <li v-for="film in this.searchGenres(this.castArray[0])" v-bind:key="film.title">{{ film.title }}</li>
      </ol>
      <h3 style="margin-top: 30px">{{ this.castArray[1] }}</h3>
      <ol>
        <li v-for="film in this.searchGenres(this.castArray[1])" v-bind:key="film.title">{{ film.title }}</li>
      </ol>
      <h3 style="margin-top: 30px">{{ this.castArray[2] }}</h3>
      <ol>
        <li v-for="film in this.searchGenres(this.castArray[2])" v-bind:key="film.title">{{ film.title }}</li>
      </ol>
    </div>
  </div>
</template>

<script>

import films from '../films'
import _ from 'lodash';

export default {
  name: "ListCast",
  data() {
    return {
      Films: films,
      n: 10,
      castArray: ["Paul Boyton", "Florence Lawrence", "George Gebhardt",]
    }
  },
  computed: {},
  methods: {
    searchGenres: function (cast) {
      return _.filter(this.Films, function (film) {
        let isInIt = false
        for (let i = 0; i < film.cast.length; i++) {
          if (film.cast[i] === cast) {
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