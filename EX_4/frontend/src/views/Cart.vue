<template>
  <div class=".container-fluid">
    <h1>CART</h1>
    <TableWithOrders class="justify-center" />
    <ContactForms class="justify-center" />
  </div>
</template>

<script>
import TableWithOrders from "../components/TableWithOrders";
import ContactForms from "../components/ContactForms";

export default {
  name: "Cart",
  components: {
    TableWithOrders,
    ContactForms,
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
