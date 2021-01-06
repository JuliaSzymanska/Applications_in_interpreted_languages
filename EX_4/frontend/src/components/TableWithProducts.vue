<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-2" scope="col">Name</th>
          <th class="col-md-2" scope="col">Category</th>
          <th class="col-md-2" scope="col">Unit weight</th>
          <th class="col-md-2" scope="col">Unit price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.products" :key="key">
          <td class="col-md-2">{{ film.product_name }}</td>
          <td class="col-md-2">{{ film.category_id }}</td>
          <td class="col-md-2">{{ film.unit_weight }}</td>
          <td class="col-md-2">{{ film.unit_price }}</td>
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
    };
  },

  //   props: {
  //     dataFromEvent: Array,
  //   },

  created: function() {
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

    getProducts: function() {
      let self = this;

      axios
        .get(process.env.VUE_APP_BACKEND_URL + "/products")
        .then(function(response) {
          self.products = JSON.parse(response.data[0]);
          console.log(typeof self.products);
          //   for (var i = 0; i < self.chats.length; i++) {
          //     self.chats[i].lastMessageDate = new Date(
          //       self.chats[i].lastMessageDate
          //     );
          //   }
          console.log(self.products);
          //   self.$emit("search-event", self.dataToReturn);
          console.log("event with all emitted");
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
}
</style>
