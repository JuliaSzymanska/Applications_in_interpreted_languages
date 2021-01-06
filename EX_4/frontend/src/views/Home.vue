<template>
  <div class=".container-fluid">
     <TableWithProducts  class="justify-center"/>
  </div>
</template>

<script>
import TableWithProducts from "../components/TableWithProducts";

export default {
  name: "Home",
  components: {
    TableWithProducts,
  },
  data() {
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
  background: #00abb7;
}
.container-fluid * {
  width: 100%;
  table-layout: fixed;
}
</style>
