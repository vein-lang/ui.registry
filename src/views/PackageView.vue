<template>
  <div style="padding-top: 100px; padding-left: 20px" ref="content">
    <not-found v-if="isNotFound" />
    <vs-row v-if="!isNotFound && !isLoading">
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="8"
        style="padding: 15px; padding-top: 0px"
      >
        <h1>
          <i class='bx bxs-currentPackage' style="color: #525252" ></i> 
          {{ currentPackage.name }} 
          <verified-badge v-if="currentPackage.isVerified"/>
        </h1>

        <div
          class="
            vs-input-parent vs-input-parent--state-null
            vs-component--danger vs-component--is-color
          "
          placeholder="Danger icon after"
        >
          <div class="vs-input-content vs-input-content--has-color">
            <input
              placeholder=""
              disabled
              id="vs-input--2445"
              class="vs-input vs-input--has-icon vs-input--has-icon--after"
              style="min-width: 100%; opacity: 1"
            />
            <label for="vs-input--2445" class="vs-input__label">
              vein add {{ currentPackage.name }} --version {{ packageVersion }}
            </label>
            <span
              class="
                vs-input__icon vs-input__icon--after
                pointer
                vs-input__icon__copy
              "
              v-on:click="copyCommand(currentPackage)"
            >
              <i class="bx bxs-copy"></i>
            </span>
            <div class="vs-input__affects">
              <div class="vs-input__affects__1"></div>
              <div class="vs-input__affects__2"></div>
              <div class="vs-input__affects__3"></div>
              <div class="vs-input__affects__4"></div>
            </div>
          </div>
        </div>
        <vs-divider color="warning"> readme </vs-divider>
        <div id="markdown">
          <div v-html="readmeMarkdown"></div>
        </div>
      </vs-col>
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" w="3">
        <div style="padding-left: 10px">
          <vs-avatar
            size="100"
            style="position: absolute; right: -10px"
            badge
            badge-color="warn"
          >
            <img :src="currentPackage.icon" alt="" />
            <template #badge> public </template>
          </vs-avatar>
          <br />
          <vs-card class="no-pointer currentPackage-card">
            <template #title>
              <h3>
                {{ currentPackage.name }}
                <verified-badge v-if="currentPackage.isVerified"/>
              </h3>
            </template>
            <template #text>
              <p v-if="currentPackage.description">{{ currentPackage.description }}</p>
              <p v-else style="color: #565656; font-style: italic;">no description</p>
              <p>{{ packageVersion }}</p>
            </template>
          </vs-card>
          <br />
          <vs-button
            :loading="downloadPackageActive"
            warn
            gradient
            size="xl"
            block
            style="margin: 0"
            v-on:click="downloadPackage"
          >
            Download <i class="bx bxs-download"></i>
          </vs-button>
          <vs-divider color="warning"> About </vs-divider>
          <vs-card class="no-pointer currentPackage-card">
            <template #title> </template>
            <template #text>
              <p style="padding-top: 15px; text-align: center">
                <i class="bx bxs-time"></i>
                Published {{ getTimeAgo(currentPackage) }}
              </p>
              <p style="padding-top: 15px; text-align: center">
                <i class='bx bx-shield-quarter'></i>
                {{ currentPackage.license }} License
              </p>
              <p style="padding-top: 15px; text-align: center">
                <i class='bx bxs-download'></i>
                {{ currentPackage.downloads }} downloads
              </p>
            </template>
          </vs-card>
          <vs-divider color="warning"> Authors </vs-divider>
          <vs-avatar-group max="5">
            <div :key="i" v-for="(author, i) in getAuthors()">
              <vs-tooltip>
                <vs-avatar v-if="author.github">
                  <img :src="`https://github.com/${author.github}.png`" :alt="author.github" />
                </vs-avatar>
                <vs-avatar v-else>
                  <template #text>
                    {{author.name}}
                  </template>
                </vs-avatar>
                <template #tooltip>
                  {{author.name}}
                </template>
              </vs-tooltip>
              
            </div>
          </vs-avatar-group>
          <vs-divider color="warning"> Social </vs-divider>
          <div class="center social">
            <div v-for="(url, name) in getSocials()" :key="name">
              <vs-tooltip v-if="name == 'discord'">
                <vs-button icon color="discord"  v-on:click="goToUrl(url)">
                    <i class='bx bxl-discord'></i>
                </vs-button>
                <template #tooltip>
                  {{name}}
                </template>
              </vs-tooltip>
              <vs-tooltip v-if="name == 'homepage'">
                <vs-button icon color="github"  v-on:click="goToUrl(url)">
                  <i class='bx bxl-github'></i>
                </vs-button>
                <template #tooltip>
                  {{name}}
                </template>
              </vs-tooltip>
            </div>
          </div>
          
        </div>
      </vs-col>
    </vs-row>
  </div>
</template>

<script lang="ts">
import { VeinShard } from "@/models";
import Vue from "vue";
import { Component } from "vue-property-decorator";
import NotFound from "./../components/NotFound.vue";
import vsDivider from "./../components/vsDivider.vue";
import { Author } from "@/models/VeinShard";
import axios from "axios";
import VerifiedBadge from "@/components/VerifiedBadge.vue";


@Component({
  components: {
    "not-found": NotFound,
    "vs-divider": vsDivider,
    "verified-badge": VerifiedBadge
  },
})
export default class PackageView extends Vue {

  constructor() {
    super();
    (window as any)["PackageView"] = this;
  }
  log(i, x) {  console.log(i, x); return false; }
  readmeMarkdown: string = "<h2>No readme detected</h2>";

  get packageName() {
    return this.$route.params["id"];
  }
  get packageVersion() {
    return this.$route.params["version"];
  }
  isLoading: boolean = true;
  currentPackage?: VeinShard;
  isNotFound: boolean = false;
  downloadPackageActive: boolean = false;
  getSocials(): Record<string, string> {
    if (this.currentPackage?.urls.other)
      return { ...this.currentPackage?.urls, ...JSON.parse(this.currentPackage?.urls.other) };
    else 
      return { ...this.currentPackage?.urls } as any;
  }

  goToUrl(s: string) {
    window.open(s);
  }
  getAuthors(): Author[]
  {
    return (this.currentPackage?.authors) ?? [];
  }

  async created() {
    if (!this.packageVersion || !this.packageName) {
      this.isNotFound = true;
      return;
    }
    const loading = this.$vs.loading({
      target: this.$refs.content,
      scale: "0.6",
      background: "primary",
      opacity: 1,
      color: "#fff",
    });

    let result = await this.$axios.$get(
      `@/package/${this.packageName}/${this.packageVersion}`
    );

    if (result.status == 404) {
      this.isNotFound = true;
      loading.close();
      return;
    }

    loading.close();
    this.currentPackage = result.data;
    console.log(this.currentPackage);
    this.isLoading = false;
    if (this.currentPackage?.hasEmbbededReadme)
      this.$axios.$get(`@/packages/${this.packageName}/${this.packageVersion}/readme`)
        .then(x => { this.readmeMarkdown = x.data; });
  }

  downloadPackage() {
    if (this.downloadPackageActive) return;
    this.downloadPackageActive = true;
    setTimeout(() => {
      this.downloadPackageActive = false;
      this.currentPackage!.downloads++;
    }, 4500);
    this.downloadItem({ url: `@/packages/${this.packageName}/${this.packageVersion}`, 
    label: `${this.packageName}-${this.packageVersion}.shard`});
  }

  async downloadItem({ url, label }) {
      const response = await axios.get(url, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "binary/octet-stream" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = label;
      link.click();
      URL.revokeObjectURL(link.href);
  }

  getTimeAgo(p: VeinShard) {
    let time = new Date(Date.parse(p.published));
    return this.$timeAgo.format(time);
  }

  copyCommand(p: VeinShard) {
    navigator.clipboard.writeText(`vein add ${p.name} --version ${p.version}`);
    console.log(`Text '${`vein add ${p.name} --version ${p.version}`}' copied to clipboard`);

    this.$vs.notification({
      sticky: true,
      icon: `<i class='bx bx-select-multiple'></i>`,
      color: 'warn',
      position: 'bottom-left',
      duration: null,
      progress: 'auto',
      title: 'Command has been copied!'
    });
  }
}
</script>
<style>
#markdown {
  box-sizing: border-box;
  background: rgba(var(--vs-background), 1);
  color: rgba(var(--vs-text), 1);
  width: 100%;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, var(--vs-shadow-opacity));
  border-radius: 20px;
  transition: all 0.25s ease;
  cursor: pointer;
  min-height: 500px;
}
#markdown > div {
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
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
.currentPackage-card>.vs-card {
  max-width: initial;
}

#markdown code {
  padding: 2px 4px;
  font-size: 90%;
  color: #c7254e;
  background-color: #444c56;
  border-radius: 0;
}
#markdown table {
    display: block;
    width: 100%;
    width: max-content;
    max-width: 100%;
    overflow: auto;
}

#markdown p, #markdown blockquote, 
#markdown ul, #markdown ol, 
#markdown dl, #markdown table, 
#markdown pre, #markdown details {
    margin-top: 0;
    margin-bottom: 16px;
}

#markdown table tr {
    background-color: #22272e;
    border-top: 1px solid #373e47;
}

#markdown table th, #markdown table td {
    padding: 6px 13px;
    border: 1px solid #444c56;
}

</style>
<style scoped>
.social {
  display: flex;
  justify-content: center;
  flex-flow: inherit;
}
</style>