<template>
  <div class=".container-fluid">
    <div class="row">
      <div class="col-sm" />
      <div class="col-7">
        <h1>SHOP</h1>
      </div>
      <div class="col-sm">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          id="openCart"
          @click="
            this.$router.push({
              path: '/cart',
              query: { products: this.ProductsInCart },
            })
          "
        >
          Cart
        </button>
      </div>
    </div>
    <SearchProducts class="justify-center" @search-event="handleAppEvent" />
    <TableWithProducts
      class="justify-center"
      :products="serachedProducts"
      @cart-event="handleCartEvent"
    />
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
  data: function() {
    return {
      serachedProducts: Array,
      ProductsInCart: Array,
    };
  },
  methods: {
    handleAppEvent: function(data) {
      this.serachedProducts = data;
    },
    handleCartEvent: function(data) {
      this.ProductsInCart = data;
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
#openCart {
  width: 80px;
  float: left;
}
</style>
