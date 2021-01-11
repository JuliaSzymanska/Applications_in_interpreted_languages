<template>
  <div class=".container-fluid">
    <div class="row">
      <div class="col-md-8" id="firstColumn">
        <h1>CART</h1>
      </div>
      <div class="col-md-8" id="firstColumn">
        <TableInCart
          class="justify-center"
          @cart-products-event="handleAppEvent"
        />
      </div>
      <div class="col-md-4" id="secondColumn">
        <ContactForms
          class="justify-center"
          @user-data-event="handleUserDataEvent"
        />
        <OrderSummary
          class="justify-center"
          :products="productsToSummary"
          :userData="userData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TableInCart from "../components/TableInCart";
import ContactForms from "../components/ContactForms";
import OrderSummary from "../components/OrderSummary";

export default {
  name: "Cart",
  components: {
    TableInCart,
    ContactForms,
    OrderSummary,
  },
  data: function() {
    return {
      productsInCart: [],
      productsToSummary: Array,
      userData: Array,
    };
  },
  created: function() {
    this.productsInCart = this.$route.query.products;
    this.userData =  Array(3).join(".").split(".");
  },
  methods: {
    handleAppEvent: function(data) {
      this.productsToSummary = data;
    },
    handleUserDataEvent: function(data) {
      this.userData = data;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
  width: 100%;
  font-size: 16px;
}
body {
  background: #c9dddf;
}
.container-fluid * {
  width: 100%;
  table-layout: fixed;
}
</style>
