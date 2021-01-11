<template>
  <div class=".container-fluid">
    <div class="row">
      <div class="col-sm" />
        <div class="col-3">
        <h1>ORDERS</h1>
      </div>
      <div class="col-sm">
        <button
          type="button"
          class="btn btn-primary"
          @click="
            this.$router.push({
              path: '/',
            })
          "
        >
          HOME
        </button>
      </div>
    </div>
    <SearchOrders class="justify-center" @search-event="handleAppEvent" />
    <TableWithOrders class="justify-center" :orders="orders" />
  </div>
</template>

<script>
import TableWithOrders from "../components/TableWithOrders";
import SearchOrders from "../components/SearchOrders";

export default {
  name: "Orders",
  components: {
    TableWithOrders,
    SearchOrders,
  },
  data: function () {
    return {
      orders: Array,
    };
  },
  methods: {
    handleAppEvent: function (data) {
      this.orders = data;
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
