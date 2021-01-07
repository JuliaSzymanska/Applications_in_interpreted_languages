<template>
  <div class=".container-fluid">
    <h1>CART</h1>

    <div class="row">
      <div class="col-md-8" id="firstColumn">
        <TableWithOrders class="justify-center" />
      </div>
      <div class="col-md-4" id="secondColumn">
        <OrderSummary class="justify-center" />
        <ContactForms class="justify-center" />
      </div>
    </div>
  </div>
</template>

<script>
import TableWithOrders from "../components/TableWithOrders";
import ContactForms from "../components/ContactForms";
import OrderSummary from "../components/OrderSummary";

export default {
  name: "Cart",
  components: {
    TableWithOrders,
    ContactForms,
    OrderSummary,
  },
  data: function() {
    return {};
  },
  methods: {},
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
