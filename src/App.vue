<template>
  <div id="app" class="theme-container">
    <div class="page">
      <nav-bar v-if="$self_render.navbarEnable" />
      <div class="container flex-grow-1">
        <error />
        <div class="mt-5">
          <router-view />
        </div>
      </div>
    </div>
    <vs-divider color="warning"> </vs-divider>
    <app-footer/>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
import Error from "./components/Error.vue";
import Footer from "./components/Footer.vue";
import vsDivider from "./components/vsDivider.vue";
@Component({
  components: {
    NavBar,
    Error,
    "app-footer": Footer,
    "vs-divider": vsDivider
  },
})
export default class App extends Vue {
  async created() 
  {
    const loading = this.$vs.loading({
      target: this.$refs.content,
      scale: '0.6',
      background: 'primary',
      opacity: 1,
      color: '#fff',

    });
    try { await this.$axios.$get("/health"); loading.close(); }
    catch { loading.close(); this.$router.push("/maintenance"); }
  }
}
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