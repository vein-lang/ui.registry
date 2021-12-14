<template>
  <div>
    <vs-dialog
      :loading="isLoading"
      scroll
      overflow-hidden
      auto-width
      v-model="active"
    >
      <template #header>
        <div class="dialog-header">
          <h3>Api Keys</h3>
          <vs-button
            class="diaglog-title-button"
            v-on:click="creationActive = true"
            gradient
            warn
            animation-type="scale"
          >
            <i class="bx bx-plus-medical"></i>
            <template #animate> New </template>
          </vs-button>
        </div>
      </template>
      <div class="con-content">
        <div class="center">
          <vs-table ref="_table_apikeys">
            <template #thead>
              <vs-tr>
                <vs-th> Name </vs-th>
                <vs-th> End of life </vs-th>
              </vs-tr>
            </template>
            <template #tbody>
              <vs-tr :key="i" v-for="(tr, i) in apiKeys">
                <vs-td :ref="`fucking_expand_${tr.uid}`">
                  {{ tr.name }}
                </vs-td>
                <vs-td>
                  <i class="bx bx-timer"></i> Expires
                  {{ getExpTime(tr.expiresDate) }}
                </vs-td>

                <template #expand>
                  <div class="con-content">
                    <div>
                      <vs-avatar>
                        <i class="bx bxs-key"></i>
                      </vs-avatar>
                      <p>Expires Date: {{ tr.expiresDate }}</p>
                    </div>
                    <div>
                      <vs-button disabled flat icon> Increment life </vs-button>
                      <vs-button
                        border
                        danger
                        v-on:click="removeApiKey(tr.uid)"
                      >
                        <i class="bx bxs-trash"></i>
                      </vs-button>
                    </div>
                  </div>
                </template>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </vs-dialog>
    <vs-dialog v-model="creationActive" :loading="creationLoading">
      <template #header>
        <h4 class="not-margin">Create <b>API Key</b></h4>
      </template>

      <div class="con-form">
        <vs-input v-model="inputApiKeyName" placeholder="Name">
          <template #icon> <i class="bx bx-rename"></i> </template>
        </vs-input>
        <vs-select disabled v-model="the60Days">
          <vs-option label="60 Days" value="1"> 60 Days </vs-option>
        </vs-select>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button v-on:click="createApiKey" block> Create </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import Vue from "vue";
import { Component, Ref } from "vue-property-decorator";
import { VsTable } from "vuesax";
type apiKey = {
  uid: string;
  userOwner: string;
  creationDate: string;
  eol: string;
  expiresDate: string;
  name: string;
  destroyed: boolean;
};

@Component({
  components: {},
})
export default class ApiKeys extends Vue {
  active: boolean = false;
  apiKeyName: string = "";
  creationActive: boolean = false;
  creationLoading: boolean = false;
  isLoading: boolean = true;
  the60Days: number = 1;
  apiKeys: apiKey[] = [];
  @Ref("_table_apikeys") tableOfApiKeys: VsTable;

  constructor() {
    super();
  }

  toggleApiKeys() {
    this.isLoading = true;
    this.apiKeys = [];
    this.active = !this.active;
    this.load();
  }

  get inputApiKeyName() {
    return this.apiKeyName;
  }
  set inputApiKeyName(val: string) {
    this.apiKeyName = val;
  }

  async load() {
    let result = await this.$axios.$get("/@/me/token", this.$auth);
    this.apiKeys = result.data;
    this.isLoading = false;
    console.log(this.tableOfApiKeys);
  }

  async createApiKey() {
    this.creationLoading = true;
    console.log(this.apiKeyName);
    try {
      let result = await this.$axios.$post(
        `@/me/token/new?name=${encodeURIComponent(this.apiKeyName)}`,
        {},
        this.$auth
      );
      this.apiKeys.push(result.data);
      this.creationActive = false;
    } catch (e) {
      this.creationActive = true;
    }
  }

  async removeApiKey(uid: string) {
    this.isLoading = true;
    let key = this.apiKeys.find((x: apiKey) => x.uid == uid);

    if (!key) return;

    console.log(`Removing '${key.name}' api key...`);
    try {
      let result = await this.$axios.$delete(
        `@/me/token/${key.uid}`,
        this.$auth
      );
      console.log(result);
      if (result.data == true) {
        this.isLoading = false;
        // the shit, rly
        this.$refs[`fucking_expand_${uid}`]![0]!.$el.click();
        this.apiKeys = this.apiKeys.filter((x: apiKey) => x.uid != uid);
      }
    } catch (e) {
      console.error(e);
      this.isLoading = false;
    }
  }

  getExpTime(date: Date) {
    if (date instanceof Date)
      return this.$timeAgo.format(date.getTime(), { future: true });
    return this.$timeAgo.format(Date.parse(date), { future: true });
  }
}
</script>
<style scoped>
.dialog-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}
.diaglog-title-button {
  flex-shrink: 0;
  min-width: 60px;
  right: 280px;
}
</style>
<style>
.con-content,
.con-content > div {
  display: flex;
  align-items: center;
}
.con-content {
  justify-content: space-between;
  width: 100%;
}
.con-content > .center {
  min-width: 100%;
}

.not-margin {
  margin: 0px;
  font-weight: normal;
  padding: 10px;
}
.con-form {
  width: 100%;
}
.con-form .flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.con-form .flex a {
  font-size: 0.8rem;
  opacity: 0.7;
}
.con-form .flex a:hover {
  opacity: 1;
}
.con-form .vs-checkbox-label {
  font-size: 0.8rem;
}
.con-form .vs-input-content {
  margin: 10px 0px;
  width: calc(100%);
}
.con-form .vs-input-content .vs-input {
  width: 100%;
}
.footer-dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: calc(100%);
}
.footer-dialog .new {
  margin: 0px;
  margin-top: 20px;
  padding: 0px;
  font-size: 0.7rem;
}
.footer-dialog .new a {
  color: rgba(var(--vs-primary), 1) !important;
  margin-left: 6px;
}
.footer-dialog .new a:hover {
  text-decoration: underline;
}
.footer-dialog .vs-button {
  margin: 0px;
}
.con-form > .vs-select-content.vs-component--primary {
  min-width: 100%;
}
.vs-dialog > .vs-dialog__content { min-width: 600px; }
</style>