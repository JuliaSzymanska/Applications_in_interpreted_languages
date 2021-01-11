<template>
  <div class=".container-fluid">
    <div class="row">
      <div class="col-md-12" id="firstColumn">
        <h1>EDIT</h1>
      </div>
      <div class="col-md-12" id="firstColumn">
        <EditProducts class="justify-center" />
      </div>
    </div>
  </div>
</template>

<script>
import EditProducts from "../components/EditProducts";

export default {
  name: "Edit",
  components: {
    EditProducts,
  },
  data: function () {
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
