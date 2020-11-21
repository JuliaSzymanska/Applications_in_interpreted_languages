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
      <tr v-for="film in this.searchevents()" v-bind:key="film.title">
        <td class="col-md-2">{{ film.title }}</td>
        <td class="col-md-2">{{ film.year }}</td>
        <td class="col-md-2">{{ film.cast.join(', ') }}</td>
        <td class="col-md-2">{{ film.genres.join(', ') }}</td>
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

export default {
  name: "TableWithFilms",
  data() {
    return {
      n: 10,
      numberOfMovies: 10,
    }
  },

  props: {
    dataFromEvent: Array,
  },
  
  methods: {
    searchevents: function () {
      let filmy = this.dataFromEvent;
      return filmy.slice(0, this.n);
    },

    increaseLimit: function () {
      this.n += this.numberOfMovies;
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