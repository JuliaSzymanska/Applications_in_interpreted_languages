<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-2" scope="col">Total price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-md-4">
            {{ totalPrice }}
          </td>
        </tr>
      </tbody>
    </table>
    
    <div class="form-group row">
          <p v-if="errors.length">
        <ul>
          <li v-for="(error, index, key) in this.errors" :key="key">{{ error }}</li>
        </ul>
      </p>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        id="submitOrder"
        v-on:click="checkInputs"
      >
        Submit order
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderSummary",
  data() {
    return {
      totalPrice: 0,
      errors: [],
    };
  },

  props: {
    products: Array,
    userData: Array,
  },

  watch: {
    products: function () {
      this.getPrice();
    },
  },

  created: function () {
    this.getPrice();
  },

  methods: {
    getPrice: function () {
      this.totalPrice = 0;
      for (const i in this.products) {
        this.totalPrice +=
          this.products[i].amount_in_cart * this.products[i].unit_price;
      }
    },

    checkInputs: function () {
      this.errors = [];
      if (!this.userData[0]) {
        this.errors.push("Login required");
      }
      if (!this.userData[1]) {
        this.errors.push("Email required");
      }
      console.log(this.userData[2].length);
      if (
        (this.userData[2].length < 9 || this.userData[2].length > 9) ||
        !/^\d+$/.test(this.userData[2])
      ) {
        this.errors.push("Phone number should contains 9 digits.");
      }
      if (this.errors.length === 0) {
        this.submitOrder();
      }
    },

    submitOrder: function () {
      let parsedProducts = this.getParseProducts();
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_BACKEND_URL + "/orders",
        headers: {},
        data: {
          buyer_login: self.userData[0],
          buyer_email: self.userData[1],
          buyer_phone_number: self.userData[2],
          approval_date: new Date(),
          status_id: 1,
          products: parsedProducts,
        },
      }).catch(function (error) {
        console.log(error);
      });
    },

    getParseProducts: function () {
      let parsedProducts = [];
      for (const i in this.products) {
        let str =
          '{"productId":' +
          this.products[i].product_id +
          ',"numberOfItems":' +
          this.products[i].amount_in_cart +
          "}";
        parsedProducts.push(JSON.parse(str));
      }
      return parsedProducts;
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
