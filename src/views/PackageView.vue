<template>
  <div style="padding-top: 100px; padding-left: 20px" ref="content">
    <not-found v-if="isNotFound" />
    <vs-row v-if="!isNotFound && !isLoading">
      <vs-col v-if="currentPackage"
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        w="8"
        style="padding: 15px; padding-top: 0px"
      >
        <h1>
          <vs-tooltip
            style="display: inline"
            v-if="currentPackage.hasMetapackage"
          >
            <i class="bx bxs-memory-card" style="color: #525252"></i>
            <template #tooltip> This is a metapackage! </template>
          </vs-tooltip>
          <i class="bx bxs-package" style="color: #525252" v-else></i>
          {{ packageName }}
          <verified-badge v-if="currentPackage.isVerified" />
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
            <span v-if="currentPackage"
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
        <vs-divider
          color="warning"
          v-if="currentPackage.hasServicedPackage"
        ></vs-divider>
        <vs-alert color="warn" v-if="currentPackage.hasServicedPackage">
          <template #icon>
            <i class="bx bxs-error"></i>
          </template>
          <template #title> Alert! </template>
          This is a technical package, do not install it directly!
        </vs-alert>
        <br />
        <vs-button-group>
          <vs-button
            color="warn"
            :flat="activeTab != 'readme'"
            v-on:click="activeTab = 'readme'"
            block
          >
            <i class='bx bx-notepad'></i> Readme
          </vs-button>
          <vs-button
            color="warn"
            :flat="activeTab != 'versions'"
            v-on:click="activeTab = 'versions'"
            block
          >
            <i class='bx bxs-baguette' ></i> Versions
          </vs-button>
        </vs-button-group>
        <vs-divider color="warning"> {{ activeTab }} </vs-divider>
        <div id="markdown" v-if="activeTab == 'readme'">
          <div v-html="readmeMarkdown"></div>
        </div>
        <div v-if="activeTab == 'versions'">
          <vs-table striped>
            <template #thead>
              <vs-tr>
                <vs-th> <i class='bx bxs-baguette' ></i> Version </vs-th>
                <vs-th> <i class='bx bx-cloud-download' ></i> Downloads </vs-th>
                <vs-th> <i class='bx bxs-time' ></i> Date </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i" v-for="(v, i) in versions.versions">
                <vs-td>
                  <router-link :to="templateVersionLink(versions.versions[i])"> 
                    {{ versions.versions[i] }} 
                  </router-link>
                </vs-td>
                <vs-td>
                  {{ versions.downloads[i] }}
                </vs-td>
                <vs-td>
                  {{ getTimeAgo(versions.dates[i]) }}
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </vs-col>
      <vs-col v-if="currentPackage" vs-type="flex" vs-justify="center" vs-align="center" w="3">
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
                <verified-badge v-if="currentPackage.isVerified" />
              </h3>
            </template>
            <template #text>
              <div style="margin-right: 80px">
                <marquee
                  scrolldelay="120"
                  behavior="alternate"
                  v-if="
                    currentPackage.description &&
                    currentPackage.description.length > 60
                  "
                >
                  {{ currentPackage.description }}
                </marquee>
                <p v-else-if="currentPackage.description">
                  {{ currentPackage.description }}
                </p>
                <p v-else style="color: #565656; font-style: italic">
                  no description
                </p>
                <p style="color: #565656">v{{ currentPackage.version }}</p>
              </div>
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
                <i class="bx bx-shield-quarter"></i>
                {{ currentPackage.license }} License
              </p>
              <p style="padding-top: 15px; text-align: center">
                <i class="bx bxs-download"></i>
                {{ currentPackage.downloads }} downloads
              </p>
            </template>
          </vs-card>
          <vs-divider color="warning"> Authors </vs-divider>
          <vs-avatar-group max="5">
            <div :key="i" v-for="(author, i) in getAuthors()">
              <vs-tooltip>
                <vs-avatar v-if="author.github">
                  <img
                    :src="`https://github.com/${author.github}.png`"
                    :alt="author.github"
                  />
                </vs-avatar>
                <vs-avatar v-else>
                  <template #text>
                    {{ author.name }}
                  </template>
                </vs-avatar>
                <template #tooltip>
                  {{ author.name }}
                </template>
              </vs-tooltip>
            </div>
          </vs-avatar-group>
          <div v-if="getDependecies()" class="center">
            <vs-divider color="warning"> Dependencies </vs-divider>

            <vs-button
              :key="i"
              v-for="(dep, i) in getDependecies()"
              size="small"
              block
              gradient
              black :href="templateDependencyLink(dep)"
            >
              <i class="bx bx-package"></i>{{ dep.name }}@{{ dep.version }}
            </vs-button>
          </div>

          <vs-divider v-if="getSocials()" color="warning"> Social </vs-divider>
          <div v-if="getSocials()" class="center social">
            <div v-for="(url, name) in getSocials()" :key="name">
              <vs-tooltip v-if="name == 'discord'">
                <vs-button icon color="discord" blank :href="url">
                  <i class="bx bxl-discord"></i>
                </vs-button>
                <template #tooltip>
                  {{ name }}
                </template>
              </vs-tooltip>
              <vs-tooltip v-if="name == 'homepage'">
                <vs-button icon color="github" blank :href="url">
                  <i class="bx bxl-github"></i>
                </vs-button>
                <template #tooltip>
                  {{ name }}
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
import { Author, PackageReference, PackageVersions } from "@/models/VeinShard";
import axios from "axios";
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
      title: `${this.packageName} ${this.packageVersion}`,
      meta: [
        {
          name: "description",
          content: this.currentPackage?.description ?? "",
        },
      ],
    };
  }
  activeTab = "readme";
  constructor() {
    super();
    (window as any)["PackageView"] = this;
  }
  readmeMarkdown: string = "<h2>No readme detected</h2>";

  get packageName() {
    return this.$route.params["id"];
  }
  get packageVersion() {
    return this.$route.params["version"];
  }
  set packageVersion(v: string) {
    this.$route.params["version"] = v;
  }

  isLoading: boolean = true;
  currentPackage?: VeinShard;
  isNotFound: boolean = false;
  downloadPackageActive: boolean = false;

  getSocials(): Record<string, string> | null {
    if (!this.currentPackage?.urls) return null;
    if (this.currentPackage?.urls.other)
      return {
        ...this.currentPackage?.urls,
        ...JSON.parse(this.currentPackage?.urls.other),
      };
    else return { ...this.currentPackage?.urls } as any;
  }

  getDependecies(): PackageReference[] | null {
    if (!this.currentPackage?.dependencies) return null;
    if (this.currentPackage?.dependencies.length == 0) return null;
    return this.currentPackage.dependencies;
  }

  goToUrl(s: string) {
    window.open(s);
  }

  getAuthors(): Author[] {
    return this.currentPackage?.authors ?? [];
  }


  templateDependencyLink(dep: PackageReference) {
    return `/package/${dep.name}/${dep.version}`;
  }

  templateVersionLink(ver: string) {
    return `/package/${this.currentPackage?.name}/${ver}`;
  }

  async created() {
    this.init();
  }

  async init() {
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

    console.warn(`[package]`, result);

    loading.close();
    this.currentPackage = result.data;
    this.packageVersion = this.currentPackage!.version;
    this.isLoading = false;
    if (this.currentPackage?.hasEmbbededReadme)
      this.$axios
        .$get(`@/packages/${this.packageName}/${this.packageVersion}/readme`)
        .then((x) => {
          this.readmeMarkdown = x.data;
        });

    await this.checkoutVersions();
  }


  versions: PackageVersions = {
    versions: [],
    downloads: [],
    dates: []
  };

  async checkoutVersions() {
    let result = await this.$axios.$get(
      `@/packages/${this.packageName}/version.json`
    );
    if (result.status == 404) {
      return;
    }
    this.versions = result.data;
  }

  downloadPackage() {
    if (this.downloadPackageActive) return;
    this.downloadPackageActive = true;
    setTimeout(() => {
      this.downloadPackageActive = false;
      this.currentPackage!.downloads++;
    }, 4500);
    this.downloadItem({
      url: `@/packages/${this.packageName}/${this.packageVersion}`,
      label: `${this.packageName}-${this.packageVersion}.shard`,
    });
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

  getTimeAgo(p: VeinShard | string) {
    if (typeof p === "string")
      return this.$timeAgo.format(new Date(Date.parse(p)));
    let time = new Date(Date.parse(p.published));
    return this.$timeAgo.format(time);
  }

  copyCommand(p: VeinShard | undefined) {
    if (!p) return;
    navigator.clipboard.writeText(`vein add ${p.name} --version ${p.version}`);
    console.log(
      `Text '${`vein add ${p.name} --version ${p.version}`}' copied to clipboard`
    );

    this.$vs.notification({
      sticky: true,
      icon: `<i class='bx bx-select-multiple'></i>`,
      color: "warn",
      position: "bottom-left",
      duration: null,
      progress: "auto",
      title: "Command has been copied!",
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
.currentPackage-card > .vs-card {
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

#markdown p,
#markdown blockquote,
#markdown ul,
#markdown ol,
#markdown dl,
#markdown table,
#markdown pre,
#markdown details {
  margin-top: 0;
  margin-bottom: 16px;
}

#markdown table tr {
  background-color: #22272e;
  border-top: 1px solid #373e47;
}

#markdown table th,
#markdown table td {
  padding: 6px 13px;
  border: 1px solid #444c56;
}

.bx {
  padding-left: 2px;
  padding-right: 2px;
}
</style>
<style scoped>
.social {
  display: flex;
  justify-content: center;
  flex-flow: inherit;
}
</style>