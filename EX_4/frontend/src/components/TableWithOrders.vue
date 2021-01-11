<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-4" scope="col">Approval date</th>
          <th class="col-md-4" scope="col">Buyer login</th>
          <th class="col-md-4" scope="col">Status</th>
          <!-- <th class="col-md-2" scope="col">Unit weight</th>
          <th class="col-md-2" scope="col">Unit price</th>
          <th class="col-md-2" scope="col">Add to cart</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.orders" :key="key">
          <td class="col-md-4">{{ product.approval_date }}</td>
          <td class="col-md-4">{{ product.buyer_login }}</td>
          <td class="col-md-4">{{ product.status_name }}</td>
          <!-- <td class="col-md-2">{{ product.unit_weight }}</td>
          <td class="col-md-2">{{ product.unit_price }}</td> -->
          <!-- <td>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              id="addToCart"
              @click="addToCart(product.product_id, product.number_in_cart)"
            >
              Add
            </button>
          </td> -->
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableWithProducts",
  data() {
    return {
      orders: [],
      states: [],
      statesName: [],
    };
  },

  //   props: {
  //     products: Array,
  //   },

  created: function () {
    this.getStates();
    this.getOrders();
  },

  methods: {
    getStates: function () {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/states")
          .then(function (response) {
            self.states = response.data[0];

            for (const stat in self.states) {
              self.statesName.push(self.states[stat].status_name);
            }
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },

    getOrders: function () {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/orders")
          .then(function (response) {
            self.orders = response.data;
            for (const i in self.orders) {
              self.orders[i].approval_date =
                self.orders[i].approval_date.slice(0, 10) +
                " " +
                self.orders[i].approval_date.slice(11, 16);
              for (const stat in self.states) {
                if (self.orders[i].status_id === self.states[stat].status_id) {
                  self.orders[i]["status_name"] = self.states[stat].status_name;
                }
              }
            }
            console.log(self.orders);
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
