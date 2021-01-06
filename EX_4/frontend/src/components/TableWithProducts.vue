<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-2" scope="col">Name</th>
          <th class="col-md-2" scope="col">Category</th>
          <th class="col-md-2" scope="col">Unit weight</th>
          <th class="col-md-2" scope="col">Unit price</th>
          <th class="col-md-2" scope="col">Add to cart</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index, key) in this.products" :key="key">
          <td class="col-md-2">{{ product.product_name }}</td>
          <td class="col-md-2">{{ product.category_name }}</td>
          <td class="col-md-2">{{ product.unit_weight }}</td>
          <td class="col-md-2">{{ product.unit_price }}</td>
          <td>
            <button
              type="button"
              class="btn btn-primary btn-lg btn-block"
              id="addToCart"
            >
              <!-- @click="addToCart(index)" -->
              Add
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div>
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        id="wiecej"
        @click="this.increaseLimit"
      >
        More
      </button>
    </div> -->
  </div>
</template>

<script>

export default {
  name: "TableWithProducts",
  data() {
    return {};
  },

  props: {
    products: Array,
  },

  methods: {},
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
