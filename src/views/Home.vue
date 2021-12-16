<template>
  <div>
    <div id="search" class="center content-inputs" vs-justify="center" vs-align="center">
      <h1>The Vein community’s shards registry</h1>
      <vs-input v-model="search_text"
        primary :loading="searchLoading"
        placeholder="Serach packages">
        <template #icon>
          <i class='bx bx-search-alt-2' ></i>
        </template>
        </vs-input>
    </div>
    <vs-divider color="warning"> </vs-divider>
    <vs-row>
      <vs-col :w="4">
        <div class="pad-7" >
          <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th ref="content"> <i class='bx bx-package' ></i> Popular libraries </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in popular_packages" :data="tr">
              <vs-td>
                {{ tr }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        </div>
      </vs-col>
      <vs-col :w="4"> 
        <div class="pad-7">
          <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> Latest update libraries </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in latest_packages" :data="tr">
              <vs-td>
                {{ tr }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        </div>
      </vs-col>
      <vs-col :w="4"> 
        <div class="pad-7">
          <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> Packages state </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in packages_state" :data="tr">
              <vs-td>
                {{ tr.key }} <br/> {{ tr.value }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        </div>
      </vs-col>
    </vs-row>
    <vs-divider v-if="isSearchBegin" color="warning">Search result</vs-divider>
    <div v-if="isSearchBegin && !searchLoading" class="package-list-wrapper">
      <package-list :packages="result_search" pageSize="8"/>
    </div>
    <div v-if="isSearchBegin && searchLoading">
      <vs-button style="width: 99%; height: 100px;"
        upload
        color="dark"
        flat
        :active="false"
      />
      <vs-button style="width: 99%; height: 100px;"
        upload
        color="dark"
        flat
        :active="false"
      />
      <vs-button style="width: 99%; height: 100px;"
        upload
        color="dark"
        flat
        :active="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { VeinShard } from "@/models";
import axios, { AxiosResponse } from "axios";
import Vue from 'vue'
import { Component, Watch } from "vue-property-decorator";
import PackageList from "./../components/PackageList.vue";
import vsDivider from "./../components/vsDivider.vue";

async function getState()
{
  let result = await axios.get("/@/state");
  return result.data;
}

@Component({
  components: {
    "package-list": PackageList,
    "vs-divider": vsDivider
  }
})
export default class home extends Vue
{
  popular_packages = [];
  packages_state = [];
  latest_packages = [];

  search_packages_result?: VeinShard[] = [];

  search_text: string = "";
  searchTimer: number = -1;
  searchLoading: boolean = false;
  searchAborter?: AbortController;

  isSearchBegin: boolean = false;

  get result_search(): VeinShard[] {
    return this.search_packages_result ?? [];
  }
  set result_search(o: VeinShard[]){
    this.search_packages_result = o;
  }

  async created() 
  {
    this.$self_render.navbarEnable = true;
    let result = await getState();

    this.popular_packages = result.popular_packages;
    this.latest_packages = result.latest_packages;
    this.packages_state = result.packages_state;
  }

  abortSearch() {
    clearTimeout(this.searchTimer);
    this.searchAborter?.abort();
    this.searchLoading = false;
  }

  @Watch('search_text')
  onSearchBegin(val: string, _: string) {
    if (this.searchTimer !== -1) 
      this.abortSearch();
    if (val === "" || val.length < 3)
      return this.abortSearch();
    this.isSearchBegin = true;
    this.searchTimer = setTimeout(() => {
      this.searchLoading = true;
      this.searchAborter = new AbortController();
      this.$axios.$getCancelable(`@/search/index?q=${encodeURIComponent(val)}&take=100`, 
        this.searchAborter).then(this.populateResult);
    }, 750);
  }

  populateResult(o: AxiosResponse<any, any>){
    console.log(o);
    if (o.status != 200) return;
    this.result_search = (o.data as VeinShard[]);
    this.searchLoading = false;
  }
}
</script>

<style>
.vs-table table {
  min-width: auto !important;
}
.pad-7 {
  padding: 20px;
}
#search {
  flex-direction: column;
}
.package-list-wrapper {
  padding-left: 20px;
  padding-right: 20px;
}
</style>