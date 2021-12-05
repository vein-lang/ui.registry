<template>
  <div>
    <button @click="callApi">Call</button>
    <p>{{ apiMessage }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "external-api",
  data() {
    return {
      apiMessage: ""
    };
  },
  methods: {
    async callApi() {
      // Get the access token from the auth wrapper
      const token = await this.$auth.getTokenSilently();
       window["console"].log(token);
      // Use Axios to make a call to the API
      const { data } = await axios.get("/@/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      this.apiMessage = data;
    }
  }
};
</script>