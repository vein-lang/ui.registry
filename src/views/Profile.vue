<template>
  <div class="top-pad" v-if="$store.state.user">
    <vs-row>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        <div style="padding-right: 10px;">
          <vs-avatar size="70" badge badge-color="success">
            <img :src="$store.state.user.photoURL" alt="" v-on:click="changeAvatar" />
          </vs-avatar>
          <br />
          <vs-card class="no-pointer">
            <template #title>
              <h3>{{ $store.state.user.displayName }}</h3>
            </template>
            <template #text>
              <p>{{ $store.state.user.email }}</p>
            </template>
          </vs-card>
          <br/>
          <vs-button warn gradient size="xl" block style="margin: 0;" v-on:click="openApiKeysWindow">
            API Keys <i class='bx bxs-key'></i>
          </vs-button>
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="8">
        <h1>Packages</h1>
        <package-list v-if="packages && packages.length != 0" :packages="packages"/>
        <div ref="pod" style="width: 100%; height: 450px; text-align: center;" 
          v-if="!packages || packages.length == 0">
          <h3 style="padding-top: 200px; color: #242424;">No packages</h3>
        </div>
      </vs-col>
    </vs-row>
    <api-keys :ref="'_apiKeys_window_'" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import PackageList from "./../components/PackageList.vue";
import ApiKeys from "./../components/ApiKeys.vue";
import { VeinShard } from "./../models";

@Component({
  components: {
    "package-list": PackageList,
    "api-keys": ApiKeys
  }
})
export default class Profile extends Vue {
  metaInfo() {
    return  {
      title: `${this.$store.state.user?.displayName}`
    }
  }

  @Ref("_apiKeys_window_") readonly apiKeysWindow!: ApiKeys
  me2Packages: VeinShard[] = [];
  async created() {
    let result = await this.$axios.$get("/@/me/packages");
    this.me2Packages = result.data;
    console.log(this.me2Packages);
  }

  get packages(): VeinShard[] {
    return this.me2Packages;
  }

  changeAvatar() {
    console.log("trying change avatar...");
    throw new Error();
  }

  openApiKeysWindow() {
    this.apiKeysWindow.toggleApiKeys();
  }
  
}
</script>
<style scoped>
.top-pad {
  padding-top: 150px;
  padding-left: 20px;
}
.card-text {
  display: flex; 
  align-items: flex-end; 
  justify-content: space-between;
}
.card-time {
  flex-shrink: 0;
  padding-left: 10px;
}
</style>
<style>
.package>.vs-card-content.type-3>.vs-card {
  max-width: 100% !important;
}
.package>.vs-card-content.type-3>.vs-card>.vs-card__img {
  min-width: 94px !important;
}
.package>.vs-card-content.type-3>.vs-card>.vs-card__text {
  width: 100% !important;
}

</style>