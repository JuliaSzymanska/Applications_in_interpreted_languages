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
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        id="submitOrder"
        v-on:click="submitOrder"
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
    };
  },

  props: {
    products: Array,
    userData: Array,
  },

  watch: {
    products: function() {
      this.getPrice();
    },
  },

  created: function() {
    this.getPrice();
  },

  methods: {
    getPrice: function() {
      this.totalPrice = 0;
      for (const i in this.products) {
        this.totalPrice +=
          this.products[i].amount_in_cart * this.products[i].unit_price;
      }
    },

    submitOrder: function() {
      let parsedProducts = this.getParseProducts();
      let self = this;
      // console.log(self.userData[0]);
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
      }).catch(function(error) {
        console.log(error);
      });
    },

    getParseProducts: function() {
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
