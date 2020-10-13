<template>
  <form id="forms">
    <div class="col-xs">
      <label for="inputTitle">Tytuł: </label>
      <input v-model="inputTitle" id="inputTitle" class="form-control"
             placeholder="Podaj tytuł lub fragment tytułu filmu">
<!--      <p>Message: {{ inputTitle }}</p>-->
    </div>
    <div class="col-xm">
      <label for="inputYearFrom">Rok produkcji od: </label>
      <input v-model="inputYearFrom" id="inputYearFrom" class="form-control"
             placeholder="Liczba naturalna z przedziału 1900-2019">
    </div>
    <div class="col-xs">
      <label for="inputYearTo">Rok produkcji do: </label>
      <input v-model="inputYearTo" id="inputYearTo" class="form-control"
             placeholder="Liczba naturalna z przedziału 1900-2019"/>
    </div>
    <div class="col-xs">
      <label for="inputCast">Obsada: </label>
      <input v-model="inputCast" id="inputCast" class="form-control" placeholder="Imię i nazwisko"/>
    </div>
  </form>
</template>

<script>
export default {
  name: "Forms"
}
</script>

<style scoped>
#forms {
  padding: 20px;
}
</style>