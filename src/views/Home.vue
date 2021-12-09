<template>
  <div>
    <vs-row>
      <vs-col :w="4">
        <div class="pad-7">
          <vs-table>
          <template #thead>
            <vs-tr>
              <vs-th> Popular libraries </vs-th>
            </vs-tr>
          </template>
          <template #tbody>
            <vs-tr :key="i" v-for="(tr, i) in popular_packages" :data="tr">
              <vs-td>
                {{ tr.name }}
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
                {{ tr.name }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        </div>
      </vs-col>
      <vs-col :w="1"> </vs-col>
    </vs-row>
  </div>
</template>

<script>
import Hero from "../components/Hero";
import HomeContent from "../components/HomeContent";

export default {
  name: "home",
  components: {
    Hero,
    HomeContent,
  },
  data: () => ({
    popular_packages: [
      {
        id: 1,
        name: "corlib",
      },
      {
        id: 2,
        name: "react",
      },
      {
        id: 3,
        name: "rand",
      },
      {
        id: 4,
        name: "libc",
      },
      {
        id: 5,
        name: "sync",
      },
    ],
    latest_packages: [
      {
        id: 1,
        name: "xuy",
      },
      {
        id: 2,
        name: "react-the-shit",
      },
      {
        id: 3,
        name: "fuck-me",
      },
      {
        id: 4,
        name: "haskell-shit",
      },
      {
        id: 5,
        name: "blrlblrb",
      },
    ],
  }),
};
</script>

<style>
.vs-table table {
  min-width: auto !important;
}
.pad-7 {
  padding: 20px;
}
</style>