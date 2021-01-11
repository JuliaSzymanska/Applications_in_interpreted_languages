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
        </tr>
      </tbody>
    </table>
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
      for (const i in self.orders) {
        self.availableStatesName[i] = [];
        for (
          let index = self.orders[i].status_id - 1;
          index < self.states.length;
          index++
        ) {
          if (self.orders[i].status_id != 2 || index === 1) {
            self.availableStatesName[i].push(self.statesName[index]);
          }
        }
        self.selected[i] = self.orders[i].status_name;
      }
      console.log(self.orders);
      console.log(self.availableStatesName);
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
