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
          {{totalPrice}}</td>
        </tr>
      </tbody>
    </table>
    <div class="form-group row">
      <button
        type="button"
        class="btn btn-primary btn-lg btn-block"
        id="submitOrder"
      >
        Submit order
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderSummary",
  data() {
    return {
      totalPrice: 0,
    };
  },

  props: {
    products: Array,
  },

  created: function() {
    this.getPrice();
  },

  methods: {
    getPrice: function() {
      for (const i in this.products) {
        this.totalPrice +=
          this.products[i].amount_in_cart * this.products[i].unit_price;
      }
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
