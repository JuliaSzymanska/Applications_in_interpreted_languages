<template>
  <form id="forms">
    <div class="form-group row">
      <label for="inputTitle" class="col-sm-2 col-form-label">Tytuł: </label>
      <div class="col-sm-10">
        <input v-model="inputTitle" id="inputTitle" class="form-control"
               placeholder="Podaj tytuł lub fragment tytułu filmu">
      </div>
    </div>
    <div class="form-group row">
      <label for="inputYearFrom" class="col-sm-2 col-form-label">Rok produkcji od: </label>
      <div class="col-sm-4">
        <input v-model="inputYearFrom" id="inputYearFrom" class="form-control"
               placeholder="Liczba naturalna z przedziału 1900-2019">
      </div>
      <label for="inputYearTo" class="col-sm-2 col-form-label">Rok produkcji do: </label>
      <div class="col-sm-4">
        <input v-model="inputYearTo" id="inputYearTo" class="form-control"
               placeholder="Liczba naturalna z przedziału 1900-2019"/>
      </div>
    </div>
    <div class="form-group row">
      <label for="inputCast" class="col-sm-2 col-form-label">Obsada: </label>
      <div class="col-sm-10">
        <input v-model="inputCast" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
      </div>
    </div>
    <div>
      <button type="button" class="btn btn-primary btn-lg btn-block" @click="this.search">
        Szukaj
      </button>
    </div>
  </form>
</template>

<!--https://blog.logrocket.com/using-event-bus-in-vue-js-to-pass-data-between-components/-->

<script>

import films from '../films'
// import _ from "lodash";
import { bus } from '../main'
export default {
  name: "Forms",
  data() {
    return {
      Films: films,
      inputTitle: "",
      inputYearFrom: "",
      inputYearTo: "",
      inputCast: ""
    }
  },
  props: {
    list: {
      type: String
    }
  },
  methods: {
    search: function () {
      // let tit = this.inputTitle
      // TableWithFilms.methods.setInputs(this.inputTitle, this.inputYearFrom, this.inputYearTo, this.inputCast)
      // this.list = _.filter(this.Films, function (film) {
      //   return film.title.includes('After')
      // })
      bus.$emit('filteredList', this.inputTitle);
    }
  }
}
</script>

<style scoped>
#forms {
  padding-top: 30px;
}
</style>