<template>
  <form id="forms">
    <div class="form-group row">
      <label for="inputLogin" class="col-sm-2 col-form-label"
        >Buyer login:
      </label>
      <div class="col-sm-4">
        <input
          v-model="inputLogin"
          id="inputLogin"
          class="form-control"
          placeholder="Enter name of a product"
        />
      </div>
      <label for="inputStatus" class="col-sm-2 col-form-label">Status: </label>
      <div class="col-sm-4">
        <select v-model="inputStatus" class="form-control" id="inputStatus">
          <option v-for="(name, i, key) in this.statesName" :key="key">
            {{ name }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-group row">
      <label for="inputDateFrom" class="col-sm-2 col-form-label"
        >Date from:
      </label>
      <div class="col-sm-4">
        <input
          v-model="inputDateFrom"
          id="inputDateFrom"
          type="number"
          class="form-control"
          placeholder="A positive number"
        />
      </div>
      <label for="inputDateTo" class="col-sm-2 col-form-label">Date to: </label>
      <div class="col-sm-4">
        <input
          v-model="inputDateTo"
          id="inputDateTo"
          type="number"
          class="form-control"
          placeholder="A positive number"
        />
      </div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        v-on:click="loadProducts"
      >
        Search
      </button>
    </div>
  </form>
</template>

<script>
// import _ from "lodash";
import axios from "axios";

export default {
  name: "SearchOrders",
  data: function () {
    return {
      orders: [],
      states: [],
      statesName: [],
      selected: [],
      inputLogin: "",
      inputStatus: "",
      inputDateFrom: "",
      inputDateTo: "",
      listEmitted: [],
    };
  },

  //   watch: {
  //     products: function() {
  //       this.search();
  //     },
  //   },

  created: function () {
    this.getStates();
    this.loadProducts();
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
            self.formatOrders();
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject(error);
          });
      });
    },

    formatOrders() {
      for (const i in self.orders) {
        self.orders[i].approval_date =
          self.orders[i].approval_date.slice(0, 10) +
          " " +
          self.orders[i].approval_date.slice(11, 16);

        for (const p in self.orders[i].products) {
          self
            .getProductNameById(self.orders[i].products[p].product_id)
            .then(function (val) {
              self.orders[i].products[p]["product_name"] = val;
            });
        }

        for (const stat in self.states) {
          if (self.orders[i].status_id === self.states[stat].status_id) {
            self.orders[i]["status_name"] = self.states[stat].status_name;
          }
        }

        //   self.availableStatesName[i] = [];
        //   for (
        //     let index = self.orders[i].status_id - 1;
        //     index < self.states.length;
        //     index++
        //   ) {
        //     if (self.orders[i].status_id != 2 || index === 1) {
        //       self.availableStatesName[i].push(self.statesName[index]);
        //     }
        //   }
        self.selected[i] = self.orders[i].status_name;
      }
    },

    getProductNameById: function (id) {
      let product_name = "";
      return new Promise((resolve) => {
        axios
          .get(process.env.VUE_APP_BACKEND_URL + "/products/" + id)
          .then(function (response) {
            product_name = response.data[0][0].product_name;
            resolve(product_name);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    },

    emitEvent() {
      this.$emit("search-event", this.orders);
    },

    getProductsByStatus() {
      let id = 0;
      for (const stat in this.states) {
        if (this.states[stat].status_name === this.inputStatus) {
          id = this.states[stat].status_id;
        }
      }

      let self = this;

      axios
        .get(
          process.env.VUE_APP_BACKEND_URL + "/orders/status/" + id.toString()
        )
        .then(function (response) {
          self.orders = response.data[0];
          self.formatOrders();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getProductsByLogin() {
      let self = this;

      axios
        .get(
          process.env.VUE_APP_BACKEND_URL + "/orders/name/" + this.inputLogin
        )
        .then(function (response) {
          self.orders = response.data[0];
          self.formatOrders();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    loadProducts: function () {
      let self = this;
      if (self.inputStatus === "" && self.inputLogin === "") {
          console.log("Wszystkie");
        self.getOrders();
      } else if (self.inputStatus === "") {
        self.getOrdersByLogin();
      } else {
        self.getOrdersByStatus();
      }
      self.emitEvent()
    },

    // search: function() {
    //   let self = this;
    //   self.listEmitted = _.filter(self.products, function(product) {
    //     if (
    //       (self.inputName === "" ||
    //         product.product_name
    //           .toLowerCase()
    //           .includes(self.inputName.toLowerCase())) &&
    //       (product.unit_price >= self.inputPriceFrom ||
    //         self.inputPriceFrom === "") &&
    //       (product.unit_price <= self.inputPriceTo || self.inputPriceTo === "")
    //     ) {
    //       return true;
    //     }
    //     return false;
    //   });
    //   self.$emit("search-event", self.listEmitted);
    // },
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
