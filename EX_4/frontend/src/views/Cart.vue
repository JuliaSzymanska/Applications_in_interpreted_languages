<template>
  <div class=".container-fluid">
    <h1>CART</h1>
    <TableWithProducts class="justify-center" />
  </div>
</template>

<script>
import TableWithProducts from "../components/TableWithProducts";

export default {
  name: "Cart",
  components: {
    TableWithProducts,
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
