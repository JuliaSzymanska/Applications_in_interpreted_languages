<template>
  <div class=".container-fluid">
    <div class="row">
      <div class="col-sm-7"></div>
      <div class="col-sm">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          id="openOrders"
          @click="
            this.$router.push({
              path: '/orders',
            })
          "
        >
          Orders
        </button>
      </div>
      <div class="col-sm">
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          id="openEditor"
          @click="
            this.$router.push({
              path: '/edit',
            })
          "
        >
          Edit
        </button>
      </div>
            <div class="col-sm" v-if="this.isSomethingInCart">
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
      <div class="col-sm" />
      <div class="col-sm" />
    </div>
    <SearchProducts class="justify-center" @search-event="handleAppEvent" />
    <TableWithProducts
      class="justify-center"
      :products="searchedProducts"
      @cart-event="handleCartEvent"
      @cart-event-boolean="handleCartEventBoolean"
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
  data: function () {
    return {
      searchedProducts: Array,
      ProductsInCart: Array,
      isSomethingInCart: false,
    };
  },

  created: function () {
    this.searchedProducts = [];
  },

  methods: {
    handleAppEvent: function (data) {
      this.searchedProducts = data;
    },
    handleCartEvent: function (data) {
      this.ProductsInCart = data;
    },
    handleCartEventBoolean: function () {
      this.isSomethingInCart = true;
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
