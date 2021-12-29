<template>
    <div class="center examplex">
      <div class="gradient"></div>
      <vs-navbar center-collapsed v-model="active" style="top: 5px; border-radius: 15px 15px 15px 15px;">
        <template #left>
          <img v-on:click="$router.push({ path: '/' }).catch(()=>{})" class="pointer" src="@/assets/logo.png" 
            height="64" width="64" alt="vein-registry-logo"/>
        </template>

        
        <vs-navbar-item :active="active == 'Home'" id="Home" v-on:click="$router.push({ path: '/' }).catch(()=>{})">
          Home
        </vs-navbar-item>
        <vs-navbar-item 
          v-if="$auth.isAuthenticated" 
          :active="active == 'profile'" 
          id="Profile" 
          v-on:click="$router.push({ path: '/profile' }).catch(()=>{})">
          Profile
        </vs-navbar-item>
        <!-- 
          <vs-navbar-group>
          Docs
          <template #items>
            <vs-navbar-item :active="active == 'guide'" id="guide">
              Guide
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'docs'" id="docs">
              Documents
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'components'" id="components">
              Components
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
           <vs-navbar-group>
          Ecosystem

          <template #items>
            <h5 class="title">
              Social
            </h5>

            <vs-navbar-item :active="active == 'Github'" id="Github">
              Github
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'Discord'" id="Discord">
              Discord
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'Twitter'" id="Twitter">
              Twitter
            </vs-navbar-item>
            <vs-navbar-item :active="active == 'Medium'" id="Medium">
              Medium
            </vs-navbar-item>
          </template>
        </vs-navbar-group>

        <vs-navbar-item :active="active == 'Upload'" id="Upload">
          Upload
        </vs-navbar-item>
        -->

        <template #right v-if="!$auth.loading">
          <vs-button v-if="!$auth.isAuthenticated" v-on:click="login" flat>
            Log in with GitHub
          </vs-button>
          <vs-avatar history history-gradient v-if="$auth.isAuthenticated">
            <img :src="$auth.user.picture" class="pointer" alt="" v-on:click="goToProfile">
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

  login() {
    this.$auth.loginWithRedirect({});
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
