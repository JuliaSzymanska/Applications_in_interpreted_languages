<template>
<div class="mr-auto">
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr class="row">
          <th class="col-md-2" scope="col">Name</th>
          <th class="col-md-2" scope="col">Description</th>
          <th class="col-md-2" scope="col">Category</th>
          <th class="col-md-2" scope="col">Unit weight</th>
          <th class="col-md-2" scope="col">Unit price</th>
          <th class="col-md-2" scope="col">Add to cart</th>
        </tr>
      </thead>
      <tbody>
        <tr class="row" v-for="(product, index, key) in this.products" :key="key">
          <td class="col-md-2">{{ product.product_name }}</td>
          <td class="col-md-2">{{ product.description }}</td>
          <td class="col-md-2">{{ product.category_name }}</td>
          <td class="col-md-2">{{ product.unit_weight }}</td>
          <td class="col-md-2">{{ product.unit_price }}</td>
          <td class="col-md-2">
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              id="addToCart"
              @click="addToCart(product.product_id, product.number_in_cart)"
            >
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
export default {
  name: "TableWithProducts",
  data() {
    return {
      productsInCart: [],
    };
  },

  props: {
    products: Array,
  },

  methods: {
    addToCart: function (id) {
      let product = {
        id: id,
        amount: 1,
      };
      this.productsInCart.push(product);
      this.$emit("cart-event", JSON.stringify(this.productsInCart));
      this.$emit("cart-event-boolean", true);
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
