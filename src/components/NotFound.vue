<template>
  <div class="flex-container">
    <div class="row">
        <div class="flex-item" :key="i" v-for="c,i in 4">
            <br/>
        </div>
        <div class="flex-item">
            <h3>Not Found.</h3>
        </div>
        <div class="flex-item">
            <img src="./../assets/crystal.png" width="128" height="128" />
        </div>
        <br/>
        <div>
            <vs-button v-on:click="goToBack" block>
                <i class='bx bxs-paint-roll' ></i> Go to home
            </vs-button>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class NotFound extends Vue {
  mounted() {
    this.$self_render.navbarEnable = false;
  }
  goToBack() {
    this.$self_render.navbarEnable = true;
    this.$router.push({ path: "/" });
  }
}
</script>
<style scoped>
html, body {
    height: 100%;
}
body {
    margin: 0;
}
.flex-container {
    height: 100%;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}
.row {
    width: auto;
}
.flex-item {
    font-weight: bold;
    font-size: 2em;
    text-align: center;
}
</style>