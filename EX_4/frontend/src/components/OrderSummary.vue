<template>
  <div id="tableProducts" ref="table">
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th class="col-md-2" scope="col">Total price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="col-md-4"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: "OrderSummary",
  data() {
    return {};
  },

  methods: {},
};
</script>

<style scoped>
#tableProducts {
  padding-top: 30px;
  border-collapse: collapse;
  width: 70%;
  margin: auto;
}
</style>
