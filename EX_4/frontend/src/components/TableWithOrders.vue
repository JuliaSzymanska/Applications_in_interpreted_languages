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
        <tr v-for="(order, index, key) in this.formatedOrders" :key="key">
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
        </tr>
      </tbody>
    </table>
    <div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        v-on:click="updateOrders"
      >
        Admit
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "TableWithOrders",
  data() {
    return {
      states: [],
      statesName: [],
      availableStatesName: [],
      selected: [],
      cos: "cos",
      formatedOrders: [],
      rawOrders: [],
    };
  },

  props: {
    orders: Array,
  },

  created: function () {
    this.getStates();
    this.getAvailableStates();
  },

  watch: {
    orders: {
      handler: function () {
        this.formatedOrders = this.orders[0];
        this.rawOrders = this.orders[1];
        this.getAvailableStates();
      },
      deep: true,
    },
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

    getAvailableStates: function () {
      let self = this;
      for (const i in self.formatedOrders) {
        self.availableStatesName[i] = [];
        for (
          let index = self.formatedOrders[i].status_id - 1;
          index < self.states.length;
          index++
        ) {
          if (self.formatedOrders[i].status_id != 2 || index === 1) {
            self.availableStatesName[i].push(self.statesName[index]);
          }
        }
        self.selected[i] = self.formatedOrders[i].status_name;
      }
    },

    updateOrders: function () {
      let self = this;
      for (const i in self.formatedOrders) {
        let id = 0;
        if (self.selected[i] != self.formatedOrders[i].status_name) {
          for (const s in self.states) {
            if (self.selected[i] === self.states[s].status_name) {
              id = self.states[s].status_id;
            }
          }
          axios({
            method: "put",
            url:
              process.env.VUE_APP_BACKEND_URL +
              "/orders/" +
              self.formatedOrders[i].order_id +
              "/" +
              id,
            headers: {},
            data: {},
          }).catch(function (error) {
            console.log(error);
          });
        }
      }
    },
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
