<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-2" scope="col">Name</th>
          <th class="col-md-2" scope="col">Category</th>
          <th class="col-md-2" scope="col">Unit weight</th>
          <th class="col-md-2" scope="col">Unit price</th>
          <th class="col-md-2" scope="col">Add to cart</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.products" :key="key">
          <td class="col-md-2">{{ product.product_name }}</td>
          <td class="col-md-2">{{ product.category_id }}</td>
          <td class="col-md-2">{{ product.unit_weight }}</td>
          <td class="col-md-2">{{ product.unit_price }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              id="addToCart"
            >
              <!-- @click="addToCart(index)" -->
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        id="wiecej"
        @click="this.increaseLimit"
      >
        More
      </button>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableWithProducts",
  data() {
    return {
      products: [],
      categories: [],
    };
  },

  //   props: {
  //     dataFromEvent: Array,
  //   },

  created: function() {
    this.getCategories();
    this.getProducts();
  },

  methods: {
    // searchevents: function() {
    //   let products = this.dataFromEvent;
    //   return products.slice(0, this.n);
    // return this.dataFromEvent;
    // },
    // increaseLimit: function() {
    //   this.n += this.numberOfMovies;
    // },

    getCategories: function() {
      let self = this;
      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/categories")
        .then(function(response) {
          self.categories = response.data[0];
          // console.log(self.categories.length);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    getProducts: function() {
      let self = this;

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
                self.products[i].category_id =
                  self.categories[cat].category_name;
              }
            }
          }
          //   self.$emit("search-event", self.dataToReturn);
        })
        .catch(function(error) {
          console.log(error);
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
