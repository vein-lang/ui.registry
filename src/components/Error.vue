<template>
  <div id="error" class="center content-inputs" vs-justify="center" vs-align="center">
    <vs-alert :color="'danger'" v-if="msg" shadow relief style="max-width: 50%;">
        <template #title>
          App error
        </template>
        {{msg}}
      </vs-alert>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class Error extends Vue {
  get msg() {
      return this.$auth.error;
  }
}
</script>

<style scoped>
#error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>