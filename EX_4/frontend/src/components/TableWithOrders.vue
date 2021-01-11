<template>
  <div id="TableWithOrders" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Buyer login</th>
          <th scope="col">Approval date</th>
          <th scope="col">Status</th>
          <th scope="col">Products/ Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index, key) in this.orders" :key="key">
          <td>{{ order.buyer_login }}</td>
          <td>{{ order.approval_date }}</td>
          <td>
            <select v-model="selected[index]" class="form-control">
              <option
                v-for="(name, i, key) in this.availableStatesName[index]"
                :key="key"
              >
                {{ name }}
              </option>
            </select>
          </td>
          <td>
            <table class="table table-striped table-bordered">
              <tbody>
                <tr v-for="(product, i, key) in order.products" :key="key">
                  <td>{{ product.product_name }}</td>
                  <td>{{ product.number_of_items }}</td>
                </tr>
              </tbody>
            </table>
          </td>
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
// import axios from "axios";

export default {
  name: "TableWithOrders",
  data() {
    return {
      // orders: [],
      states: [],
      statesName: [],
      availableStatesName: [],
      selected: [],
      cos: "cos",
    };
  },

    props: {
      orders: Array,
    },

  // created: function () {
  //   this.getStates();
  //   this.getOrders();
  // },

  methods: {
    // getStates: function () {
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(process.env.VUE_APP_BACKEND_URL + "/states")
    //       .then(function (response) {
    //         self.states = response.data[0];

    //         for (const stat in self.states) {
    //           self.statesName.push(self.states[stat].status_name);
    //         }
    //         resolve();
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         reject(error);
    //       });
    //   });
    // },

    // getOrders: function () {
    //   let self = this;
    //   return new Promise((resolve, reject) => {
    //     axios
    //       .get(process.env.VUE_APP_BACKEND_URL + "/orders")
    //       .then(function (response) {
    //         self.orders = response.data;
    //         for (const i in self.orders) {
    //           self.orders[i].approval_date =
    //             self.orders[i].approval_date.slice(0, 10) +
    //             " " +
    //             self.orders[i].approval_date.slice(11, 16);

    //           for (const p in self.orders[i].products) {
    //             self
    //               .getProductNameById(self.orders[i].products[p].product_id)
    //               .then(function (val) {
    //                 self.orders[i].products[p]["product_name"] = val;
    //               });
    //           }

    //           for (const stat in self.states) {
    //             if (self.orders[i].status_id === self.states[stat].status_id) {
    //               self.orders[i]["status_name"] = self.states[stat].status_name;
    //             }
    //           }

    //           self.availableStatesName[i] = [];
    //           for (
    //             let index = self.orders[i].status_id - 1;
    //             index < self.states.length;
    //             index++
    //           ) {
    //             if (self.orders[i].status_id != 2 || index === 1) {
    //               self.availableStatesName[i].push(self.statesName[index]);
    //             }
    //           }

    //           self.selected[i] = self.orders[i].status_name;
    //         }
    //         resolve();
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //         reject(error);
    //       });
    //   });
    // },

    // getProductNameById: function (id) {
    //   let product_name = "";
    //   return new Promise((resolve) => {
    //     axios
    //       .get(process.env.VUE_APP_BACKEND_URL + "/products/" + id)
    //       .then(function (response) {
    //         product_name = response.data[0][0].product_name;
    //         resolve(product_name);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   });
    // },
  },
};
</script>

<style scoped>
#TableWithOrders {
  padding-top: 30px;
  border-collapse: collapse;
  width: 70%;
  margin: auto;
}
</style>
