<template>
  <form id="forms">
    <div class="form-group row">
      <label for="inputTitle" class="col-sm-2 col-form-label">Title: </label>
      <div class="col-sm-10">
        <input
            v-model="inputTitle"
            id="inputTitle"
            class="form-control"
            placeholder="Enter a title or fragment of the movie title"
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputYearFrom" class="col-sm-2 col-form-label"
      >Production year from:
      </label>
      <div class="col-sm-4">
        <input
            v-model="inputYearFrom"
            id="inputYearFrom"
            class="form-control"
            placeholder="A natural number from the range 1900-2019"
        />
      </div>
      <label for="inputYearTo" class="col-sm-2 col-form-label"
      >Production year to:
      </label>
      <div class="col-sm-4">
        <input
            v-model="inputYearTo"
            id="inputYearTo"
            class="form-control"
            placeholder="A natural number from the range 1900-2019"
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputCast" class="col-sm-2 col-form-label">Cast: </label>
      <div class="col-sm-10">
        <input
            v-model="inputCast"
            id="inputCast"
            class="form-control"
            placeholder="Name and surname"
        />
      </div>
    </div>
    <div>
      <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          v-on:click="search"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script>
import films from "../films";
import _ from "lodash";

export default {
  name: "Forms",
  data: function () {
    return {
      Films: films,
      inputTitle: "",
      inputYearFrom: "",
      inputYearTo: "",
      inputCast: "",
      listEmitted: films,
    };
  },
  methods: {
    search: function () {
      let self = this;
      this.listEmitted = _.filter(this.Films, function (film) {
        if (
            (self.inputTitle === "" ||
                film.title.toLowerCase().includes(self.inputTitle.toLowerCase())) &&
            (film.year >= self.inputYearFrom || self.inputYearFrom === "") &&
            (film.year <= self.inputYearTo || self.inputYearTo === "")
        ) {
          if (self.inputCast === "") {
            return true;
          } else {
            for (let i = 0; i < film.cast.length; i++) {
              if (film.cast[i].toLowerCase() === self.inputCast.toLowerCase()) {
                return true;
              }
            }
          }
        }
        return false;
      });
      this.$emit("search-event", self.listEmitted);
    },
  },
};
</script>

<style scoped>
#forms {
  padding-top: 30px;
}
</style>