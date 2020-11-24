<template>
  <div class="my_list">
    <div class="col-md">
      <h2>Movies by cast</h2>
      <ol>
        <template v-for="genre in cast">
          <div v-for="(movie, index, key) in getMovies(genre)" :key="key">
            <h3 v-if="index === 0">{{ genre }}</h3>
            {{ index + 1 }}. {{ movie.title }}
          </div>
        </template>
      </ol>
    </div>
  </div>
</template>

<script>
import films from "../films";
import _ from "underscore";

export default {
  name: "ListCast",
  data() {
    return {
      movies: films,
      movieCount: 100,
      currentStartMovie: 0,
      cast: [],
    };
  },
  methods: {
    getMovies: function (genre) {
      let list = _.filter(this.movies, function (film) {
        for (const g in film.cast) {
          if (film.cast[g] === genre) {
            return true;
          }
        }
        return false;
      });
      return _.sortBy(list, function (film) {
        return film.title;
      }).slice(0, this.movieCount);
    },

    getCast: function () {
      let list = [];
      for (const c in this.movies) {
        for (const g in this.movies[c].cast) {
          if (!list.includes(this.movies[c].cast[g])) {
            list.push(this.movies[c].cast[g]);
          }
        }
      }
      this.cast = list;
    },

    get100RandomMovies: function () {
      let result = [];
      for (let i = 0; i < this.movieCount; i++) {
        result.push(
          this.movies[Math.floor(Math.random() * this.movies.length)]
        );
      }
      return result;
    },
  },

  created() {
    this.movies = this.get100RandomMovies();
    this.getCast();
  },
  props: {},
};
</script>

<style scoped>
h2 {
  font-size: 40px;
  font-weight: 800;
  padding-top: 50px;
}

h3 {
  margin-top: 30px;
  font-weight: 600;
}
</style>