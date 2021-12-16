<template>
  <div class="package">
    <vs-card 
    v-on:click="goToPackageView(c)"
    :key="c.name" 
    v-for="c in getPackages.slice(page-1, getPageSize)" 
    style="padding: 10px" 
    type="3">
      <template #img>
        <img width="94" height="94" style="min-width: 94px;" :src="c.icon" alt="">
      </template>
      <template #title>
        <h3 style="display: inline-flex;">
          {{ c.name }}
          <text v-if="showVersion">
            <div style="padding-left: 5px; padding-right: 5px; color: #464646;">•</div>
            {{ c.version }}
          </text> 
          <div v-if="c.isVerified" style="padding-left: 5px; padding-right: 5px; color: #464646;">•</div>
          <verified-badge v-if="c.isVerified"/>
        </h3>
      </template>
      <template #text>
        <div class="card-text">
          <p v-if="c">
            <span v-if="!c.description" style="color: #565656; font-style: italic;">no description</span>
            <marquee scrolldelay="120" behavior="alternate" v-if="c.description && c.description.length > 20">
              {{ c.description }}
            </marquee>
            <span v-else-if="c.description">{{ c.description }}</span>
          </p>
          <p class="card-time"> <i class='bx bxs-baguette' ></i> {{ getTimeAgo(c) }}</p>
        </div>
      </template>
    </vs-card>
    <vs-pagination 
      v-if="(getPackages ? getPackages.length : 0) != 0" 
      color="success" 
      v-model="page" 
      :length="Math.ceil((getPackages ? getPackages.length : 0) / getPageSize)" />
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { VeinShard } from "./../models";
import VerifiedBadge from "./VerifiedBadge.vue";

@Component({
  components: {
    "verified-badge": VerifiedBadge
  },
})
export default class PackageList extends Vue {
  @Prop() packages!: VeinShard[];
  page: number = 1;
  @Prop() readonly pageSize!: Number;
  @Prop() showVersion!: boolean;

  goToPackageView(c: VeinShard) {
    this.$router.push(`/package/${c.name}/${c.version}`);
  }

  get getPageSize(){
    return this.pageSize ?? 4;
  }

  get getPackages(): VeinShard[] {
    return this.packages ?? [];
  }

  getTimeAgo(p: VeinShard) {
    let time = new Date(Date.parse(p.published)); 
    return this.$timeAgo.format(time);
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