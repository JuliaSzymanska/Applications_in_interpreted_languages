<template>
  <form id="forms">
    <div class="form-group row">
      <label for="inputTitle" class="col-sm-2 col-form-label">Name: </label>
      <div class="col-sm-10">
        <input
          v-model="inputName"
          id="inputName"
          class="form-control"
          placeholder="Enter name of a product"
        />
      </div>
    </div>
    <div class="form-group row">
      <label for="inputPriceFrom" class="col-sm-2 col-form-label"
        >Price from:
      </label>
      <div class="col-sm-4">
        <input
          v-model="inputPriceFrom"
          id="inputPriceFrom"
          class="form-control"
          placeholder="A positive number"
        />
      </div>
      <label for="inputPriceTo" class="col-sm-2 col-form-label"
        >Price to:
      </label>
      <div class="col-sm-4">
        <input
          v-model="inputPriceTo"
          id="inputPriceTo"
          class="form-control"
          placeholder="A positive number"
        />
      </div>
    </div>
    <div class="form-group row">
      <!-- <v-combobox
        v-model="select"
        :items="categoriesName"
        label="Category"
        outlined
        multiple
        dense
      ></v-combobox> -->
      <!-- <v-select :options="categoriesName"></v-select> -->
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
import _ from "lodash";
import axios from "axios";

export default {
  name: "Forms",
  data: function() {
    return {
      products: [],
      categories: [],
      categoriesName: [],
      select: [""],
      inputName: "",
      inputCategory: "",
      inputPriceFrom: "",
      inputPriceTo: "",
      listEmitted: [],
      isFinished: false,
    };
  },

  created: function() {
    this.getCategories();
    // .then(this.search());
    // while (!this.isFinished) {
    //   this.products = [];
    //   console.log(this.isFinished);
    // }
    this.search();
    // this.getProducts();
    // this.emitEvent();
  },

  methods: {
    getCategories: function() {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/categories")
          .then(function(response) {
            self.categories = response.data[0];

            for (const cat in self.categories) {
              self.categoriesName.push(self.categories[cat].category_name);
            }
            resolve();
          })
          .catch(function(error) {
            console.log(error);
            reject(error);
          });
      });
    },

    getProducts: function() {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/products")
          .then(function(response) {
            self.products = response.data[0];
            for (const i in self.products) {
              for (const cat in self.categories) {
                if (
                  self.products[i].category_id ===
                  self.categories[cat].category_id
                ) {
                  self.products[i]["category_name"] =
                    self.categories[cat].category_name;
                }
              }
            }
            resolve();
          })
          .catch(function(error) {
            console.log(error);
            reject(error);
          });
      });
    },

    emitEvent() {
      this.$emit("search-event", this.products);
    },

    getProductsByCategory() {
      const params = new URLSearchParams({
        category: self.inputCategory,
      }).toString();

      axios
        .get(
          process.env.VUE_APP_BACKEND_URL + "/products/category" + "?" + params
        )
        .then(function(response) {
          self.products = response.data[0];
          for (const i in self.products) {
            for (const cat in self.categories) {
              if (
                self.products[i].category_id ===
                self.categories[cat].category_id
              ) {
                self.products[i]["category_name"] =
                  self.categories[cat].category_name;
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    search: function() {
      let self = this;
      if (!self.inputCategory === "") {
        self.getProductsByCategory();
      } else {
        self.getProducts();
      }
      self.listEmitted = _.filter(self.products, function(product) {
        if (
          (self.inputName === "" ||
            product.product_name
              .toLowerCase()
              .includes(self.inputName.toLowerCase())) &&
          (product.unit_price >= self.inputPriceFrom ||
            self.inputPriceFrom === "") &&
          (product.unit_price <= self.inputPriceTo || self.inputPriceTo === "")
        ) {
          return true;
        }
        return false;
      });
      self.$emit("search-event", self.listEmitted);
    },
  },
};
</script>

<style scoped>
#forms {
  padding-top: 30px;
  width: 70%;
  margin: auto;
}
</style>
