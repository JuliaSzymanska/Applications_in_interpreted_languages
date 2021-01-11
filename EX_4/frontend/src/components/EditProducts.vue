<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Category</th>
          <th scope="col">Unit weight</th>
          <th scope="col">Unit price</th>
          <th scope="col">Admit changes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.products" :key="key">
          <td>
            <input
              v-model="product.product_name"
              id="inputName"
              class="form-control"
            />
          </td>
          <td>
            <input
              v-model="product.description"
              id="inputName"
              class="form-control"
            />
          </td>

          <td>
            <input
              v-model="categoriesForProducts[index]"
              id="inputName"
              class="form-control"
            />
          </td>

          <td>
            <input
              v-model="product.unit_weight"
              id="inputName"
              class="form-control"
            />
          </td>

          <td>
            <input
              v-model="product.unit_price"
              id="inputName"
              class="form-control"
            />
          </td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              id="addToCart"
              v-on:click="updateProduct(product)"
            >
              Admit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "EditProducts",
  data() {
    return {
      products: [],
      categories: [],
      categoriesForProducts: [],
      categoriesName: [],
    };
  },

  created: function () {
    this.getCategories();
    this.getProducts();
  },

  methods: {
    getCategories: function () {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/categories")
          .then(function (response) {
            self.categories = response.data[0];

            for (const cat in self.categories) {
              self.categoriesName.push(self.categories[cat].category_name);
            }
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },

    getProducts: function () {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/products")
          .then(function (response) {
            self.products = response.data[0];
            for (const i in self.products) {
              for (const cat in self.categories) {
                if (
                  self.products[i].category_id ===
                  self.categories[cat].category_id
                ) {
                  self.categoriesForProducts[i] =
                    self.categories[cat].category_name;
                }
              }
            }
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },
  },
};
</script>

<style scoped>
#tableProducts {
  padding-top: 30px;
  border-collapse: collapse;
  width: 70%;
  margin: auto;
}
</style>
