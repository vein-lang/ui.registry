<template>
  <div style="padding-top: 100px; padding-left: 20px" ref="content">
    <div class="flex-container">
      <h1 class="row">Upload a package</h1>
      <h4>
        Your package file will be uploaded and on the Vein Gallery (<a
          href="https://vein.gallery"
          >https://vein.gallery</a
        >).
      </h4>
    </div>
    <vs-divider color="warning" />
    <div
      class="flex-container"
      style="padding: 100px"
      v-if="!$store.state.isAuthed"
    >
      <div class="vs-card-content type-5 row" id="login-card">
        <div class="vs-card">
          <div class="vs-card__img" v-on:click="login">
            <img src="./../assets/github-card.jpg" alt="github-card" />
          </div>

          <div
            class="vs-card__text"
            style="
              opacity: 1 !important;
              transform: translate(0, 25px);
              padding-top: 5px;
              padding-left: 5px;
              padding-bottom: 5px;
            "
          >
            <vs-button block flat v-on:click="login" color="none">
              <i class="bx bxl-github"></i> Sign in with github
            </vs-button>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>

    <div
      class="flex-container"
      style="padding: 100px"
      v-if="$store.state.isAuthed"
    >
      <div class="con-input-upload">
        <input type="file" /> <span class="text-input"> Temporary disabled </span>
        <span class="input-progress" style="width: 0%"></span>
        <button
          disabled="disabled"
          type="button"
          title="Upload"
          class="btn-upload-all vs-upload--button-upload"
        >
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NotFound from "./../components/NotFound.vue";
import vsDivider from "./../components/vsDivider.vue";
import VerifiedBadge from "@/components/VerifiedBadge.vue";

@Component({
  components: {
    "not-found": NotFound,
    "vs-divider": vsDivider,
    "verified-badge": VerifiedBadge,
  },
})
export default class PackageView extends Vue {
  metaInfo() {
    return {
      title: `Upload `,
      meta: [
        {
          name: "description",
          content: "Upload vein package",
        },
      ],
    };
  }
  constructor() {
    super();
    (window as any)["UploadView"] = this;
  }
  async created() {}

  async login() {
    await this.$auth.login();
  }
}
</script>
<style>
.flex-container {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.row {
  width: auto;
}
.flex-item {
  font-weight: bold;
  font-size: 2em;
  text-align: center;
}
#login-card > .vs-card {
  background: none;
}
.vs-input-content--has-color .vs-input {
  border-bottom: 2px solid rgba(125, 51, 255, 1);
}
.vs-input__icon__copy {
  cursor: pointer !important;
  top: -15px;
  pointer-events: auto;
}
.vs-input__icon__copy:hover {
  top: -20px;
  right: -2px;
}
.vs-input__icon__copy:active {
  top: -15px;
  right: -2px;
}
.con-input-upload {
    background: #1e2023;
    width: 200px;
    height: 200px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 8px;
    position: relative;
    -webkit-transition: all .25s ease;
    transition: all .25s ease;
    border: 1px dashed rgba(0,0,0,.1);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    margin: 15px;
}
.con-input-upload input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    left: 0;
    top: 0;
    cursor: pointer;
}
.con-input-upload .text-input {
    min-width: 200px;
    display: block;
    text-align: center;
    margin: 0!important;
    padding: 0!important;
    width: 100%;
    font-weight: 700;
}
</style>