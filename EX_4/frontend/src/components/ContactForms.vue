<template>
  <form id="forms">
    <div class="form-group row">
      <div class="col-sm">
        <input
          v-model="inputLogin"
          id="inputLogin"
          class="form-control"
          placeholder="Enter your login"
        />
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm">
        <input
          v-model="inputEmail"
          id="inputPriceFrom"
          class="form-control"
          placeholder="Enter your email"
        />
      </div>
    </div>
    <div class="form-group row">
      <div class="col-sm">
        <input
          v-model="inputPhoneNumber"
          id="inputPhoneNumber"
          class="form-control"
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "ContactForms",
  data: function() {
    return {
      inputLogin: "",
      inputEmail: "",
      inputPhoneNumber: "",
    };
  },

  methods: {},
};
</script>

<style scoped>
#forms {
  padding-top: 10px;
  width: 70%;
  margin: auto;
}
</style>
