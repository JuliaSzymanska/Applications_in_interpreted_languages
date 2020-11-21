<template>
  <div class="my_list">
    <div class="col-md">
      <h2>Filmy wg gatunku</h2>
      <ol>
        <template v-for="genre in genres">
          <div v-for="(movie, index, key) in getMoviesByGenre(genre)" :key="key">
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
  name: "ListGenres",
  data() {
    return {
      movies: films,
      movieCount: 100,
      currentStartMovie: 0,
      genres: [],
    };
  },
  methods: {
    getMoviesByGenre: function (genre) {
      let list = this.movies;
      list = _.filter(list, function (film) {
        for (const gen in film.genres) {
          if (film.genres[gen] === genre) {
            return true;
          }
        }
        return false;
      });
      list = _.sortBy(list, function (film) {
        return film.title;
      });
      return list;
    },
    getGenres: function () {
      let list = [];
      for (const movie in this.movies) {
        for (const genre in this.movies[movie].genres) {
          if (!list.includes(this.movies[movie].genres[genre])) {
            list.push(this.movies[movie].genres[genre]);
          }
        }
      }
      this.genres = list;
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
    this.getGenres();
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