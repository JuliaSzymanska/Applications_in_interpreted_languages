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
        <option/>
          <option v-for="(name, i, key) in this.statesName" :key="key">
            {{ name }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        v-on:click="loadOrders"
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
      rawOrders: [],
      states: [],
      statesName: [],
      inputLogin: "",
      inputStatus: "",
      inputDateFrom: "",
      inputDateTo: "",
      listEmitted: [],
    };
  },

  watch: {
    products: {
      handler: function () {
        this.search();
      },
      deep: true,
    },
  },

  created: function () {
    this.getStates();
    this.loadOrders();
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
            self.setOrders(response.data);
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
      let self = this;
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

    setOrders(data) {
      let self = this;
      self.orders = data;
      self.rawOrders = data;
    },

    emitEvent() {
      let temp = [];
      temp[0] = this.orders;
      temp[1] = this.rawOrders;
      this.$emit("search-event", temp);
    },

    getOrdersByStatus() {
      let id = 0;
      let self = this;
      return new Promise((resolve, reject) => {
        for (const stat in this.states) {
          if (this.states[stat].status_name === this.inputStatus) {
            id = this.states[stat].status_id;
          }
        }

        axios
          .get(
            process.env.VUE_APP_BACKEND_URL + "/orders/status/" + id.toString()
          )
          .then(function (response) {
            self.setOrders(response.data);
            self.formatOrders();
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject();
          });
      });
    },

    getOrdersByLogin() {
      let self = this;
      return new Promise((resolve, reject) => {
        axios
          .get(
            process.env.VUE_APP_BACKEND_URL +
              "/orders/name/" +
              this.inputLogin.toString()
          )
          .then(function (response) {
            self.setOrders(response.data);
            self.formatOrders();
            resolve();
          })
          .catch(function (error) {
            console.log(error);
            reject();
          });
      });
    },

    loadOrders: function () {
      let self = this;
      if (self.inputStatus === "" && self.inputLogin === "") {
        self.getOrders().then(function () {
          self.emitEvent();
        });
      } else if (self.inputStatus === "") {
        self.getOrdersByLogin().then(function () {
          self.emitEvent();
        });
      } else {
        self.getOrdersByStatus().then(function () {
          self.emitEvent();
        });
      }
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
