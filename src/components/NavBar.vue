<template>
    <div class="center examplex" style="height: 70px;">
      <div class="gradient"></div>
      <vs-navbar center-collapsed v-model="active" style="top: 5px; border-radius: 15px 15px 15px 15px; z-index: 5;">
        <template #left>
          <img v-on:click="$router.push({ path: '/' }).catch(()=>{})" class="pointer" src="@/assets/logo.png" 
            height="64" width="64" alt="vein-registry-logo"/>
        </template>

        
        <vs-navbar-item :active="active == 'Home'" id="Home">
          <router-link style="color: white" to="/">Home</router-link>
        </vs-navbar-item>
        <vs-navbar-item :active="active == 'UploadView'" id="upload">
          <router-link style="color: white" to="/upload">Upload</router-link>
        </vs-navbar-item>
        <vs-navbar-item
          :active="active == 'profile'" 
          id="Profile">
          <router-link v-if="$store.state.isAuthed" to="/profile" style="color: white">Profile</router-link>
          <a style="color: gray;" v-if="!$store.state.isAuthed">Profile</a>
        </vs-navbar-item>

        <template #right v-if="!$store.state.isLoading">
          <vs-button v-if="!$store.state.isAuthed" v-on:click="login" flat>
            Log in with GitHub
          </vs-button>
          <vs-avatar history history-gradient v-if="$store.state.isAuthed && $store.state.user">
            <img :src="$store.state.user.photoURL" class="pointer" alt="" v-on:click="goToProfile">
          </vs-avatar>
        </template>
      </vs-navbar>
    </div>
</template>

<script lang="ts">
import "reflect-metadata";
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import { Route } from "vue-router";
@Component
export default class NavBar extends Vue {
  active: string = 'primary';

  async login() {
    await this.$auth.login();
  }
  logout() {
    this.$auth.logout();
    this.$router.push({ path: "/" });
  }
  goToProfile() {
    this.$router.push({ path: "/profile" });
  }
  @Watch('$route', { immediate: true, deep: true })
  onRouteChange (to: Route, from: any) {
    console.log(to);
    if (to.name) this.active = to.name;
  }
}
</script>
