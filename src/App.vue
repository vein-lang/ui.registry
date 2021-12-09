<template>
  <div id="app" class="theme-container">
    <div id="search" class="center content-inputs" vs-justify="center" vs-align="center">
      <vs-input
        primary
        v-model="value"
        placeholder="Serach packages">
        <template #icon>
          <i class='bx bx-search-alt-2' ></i>
        </template>
        </vs-input>
    </div>
    <div class="page">
      <nav-bar />
      <div class="container flex-grow-1">
        <error />
        <div class="mt-5">
          <router-view />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Error from "./components/Error";

export default {
  components: {
    NavBar,
    Error
  }
};
</script>

<style>
.page {
  transition: all .25s ease;
  display: block;
}
#search > .vs-input-parent > .vs-input-content > input {
  width: 900px;
}
#search {
  padding-top: 70px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  
  flex-wrap: wrap;
}
</style>