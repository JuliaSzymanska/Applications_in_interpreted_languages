<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-3" scope="col">Name</th>
          <th class="col-md-3" scope="col">Amount</th>
          <th class="col-md-3" scope="col">Unit price</th>
          <th class="col-md-3" scope="col">Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.products" :key="key">
          <td class="col-md-3">{{ product.product_name }}</td>
          <td class="col-md-3">{{ product.amount }}</td>
          <td class="col-md-3">{{ product.unit_price }}</td>
          <td class="col-md-3">{{ product.unit_price * product.amount }}</td>
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
      products: [],
      price: 0,
    };
  },

  created: function() {
    this.productsInCartFromOtherView = this.$route.query.products;
    console.log(this.productsInCartFromOtherView);
    this.getProducts();
  },

  methods: {
    getProducts: function() {
      let self = this;
      for (const i in self.productsInCartFromOtherView) {
        let item = self.getProductById(
          self.productsInCartFromOtherView[i].id,
          self.productsInCartFromOtherView[i].amount
        );
        self.products.push(item);
      }
      return self.products;
    },
  },

  getProductById(id, amount) {
    let self = this;
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

  getPrice() {
    for (const i in this.products) {
      this.price +=
        this.products[i].amount_in_cart * this.products[i].unit_price;
    }
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
