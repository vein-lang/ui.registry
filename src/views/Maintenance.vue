<template>
  <div class="flex-container">
    <div class="row">
        <div class="flex-item" :key="i" v-for="c,i in 2">
            <br/>
        </div>
        <div class="flex-item">
            <h1>Service in maintencance.</h1>
        </div>
        <div class="flex-item">
            <img src="./../assets/crystal.png" width="128" height="128" />
        </div>
        <div class="flex-item" :key="i" v-for="c,i in 2">
            <br/>
        </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios, { AxiosResponse } from "axios";
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  components: {},
})
export default class Maintenance extends Vue {
  mounted() {
    (this as any).$self_render.navbarEnable = false;
  }
  goToBack() {
    (this as any).$self_render.navbarEnable = true;
    this.$router.push({ path: "/" });
  }
  created() {
    this.registerEvent();
  }
  registerEvent() {
    setTimeout(() => this.checkHealth(), 15000);
  }
  async safe_get(url: string): Promise<AxiosResponse<any, any>> {
      try {
        return await axios.get(url);
      }
      catch {
        return { 
              status: 521,
              statusText: "network error"
        } as any;
      }
  }
  async checkHealth() {
    let result = await this.safe_get("/health");
    if (result.status != 200) {
      this.registerEvent();
      console.log(`health check failed: `, result);
    } 
    else this.goToBack();
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