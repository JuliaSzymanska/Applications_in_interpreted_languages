<template>
  <div class=".container-fluid">
    <SearchProducts class="justify-center" @search-event="handleAppEvent"/>
    <TableWithProducts class="justify-center" :dataFromEvent='eventData'/>
  </div>
</template>

<script>
import TableWithProducts from "../components/TableWithProducts";
import SearchProducts from "../components/SearchProducts";

export default {
  name: "Home",
  components: {
    TableWithProducts,
    SearchProducts,
  },
data: function(){
    return {
      serachedProducts: Array
    }
  },
  methods: {
    handleAppEvent: function(data) {
      this.serachedProducts = data;
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
