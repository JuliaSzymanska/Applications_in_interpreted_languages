<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-2" scope="col">Name</th>
          <th class="col-md-2" scope="col">Amount</th>
          <th class="col-md-2" scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.getProducts" :key="key">
          <td class="col-md-2">{{ product.product_name }}</td>
          <td class="col-md-2">{{ product.amount }}</td>
          <td class="col-md-2">{{ product.unit_price * product.amount }}</td>
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
      productsInCartFromOtherView: [],
    };
  },

  methods: {
    getProducts: function() {
      let self = this;
      let products = [];
      for (const i in self.productsInCartFromOtherView) {
        products.push(
          self.getProductById(
            self.productsInCartFromOtherView[i][0],
            self.productsInCartFromOtherView[i][1]
          )
        );
      }
      return products;
    },
  },

  getProductById(id, amount) {
    const params = new URLSearchParams({
      id: id,
    }).toString();

    axios
      .get(process.env.VUE_APP_BACKEND_URL + "/products/" + "?" + params)
      .then(function(response) {
        let product = response.data[0];
        for (const cat in self.categories) {
          if (product.category_id === self.categories[cat].category_id) {
            product["category_name"] = self.categories[cat].category_name;
          }
        }
        product["amount_in_cart"] = amount;
        return product;
      })
      .catch(function(error) {
        console.log(error);
      });
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
