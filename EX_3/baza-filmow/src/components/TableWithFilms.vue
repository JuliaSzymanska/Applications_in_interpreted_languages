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
import films from '../films'
// import _ from "lodash";

export default {
  name: "TableWithFilms",
  data() {
    return {
      Films: films,
      n: 10,
    }
  },
  props: {
    dataFromEvent: Array
  },
  computed: {},
  methods: {
    searchevents: function () {
      if(this.dataFromEvent === []){
      this.dataFromEvent === films}
      // console.log(this.list)
      // console.log(this)
      // let tit = this.dataFromEvent
      // if (this.list.length === 0)
      //   return this.Films
      // else
      //   return this.list
      // return _.filter(this.Films, function (film) {
      //   return film.title.toLowerCase().includes(tit.toLowerCase())
      // })
      return this.dataFromEvent
    },

    limit: function () {
      return this.searchevents().slice(0, this.n)
    },

    increaseLimit: function () {
      this.n += 10
    },

    created() {

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