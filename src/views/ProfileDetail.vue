<template>
  <h1>User Name: {{ id }}</h1>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      name: this.id,
      time: null,
      karma: null,
      about: null,
    };
  },
  watch: {
    // id: {
    //   immediate: true,
    //   handler() {
    //     //console.log("called");
    //     this.getData();
    //   },
    // },
  },
  methods: {
    setData(val) {
      if (val?.data) {
        this.time = val.created;
        this.karma = val.karma;
        this.about = val.about;
      }
    },
    async getData() {
      let url = ` https://hacker-news.firebaseio.com/v0/user/${this.id}/jl.json?print=pretty`;
      console.log("Urs is = ", url);
      let d = await axios.get(url);
      this.setData(d);
    },
  },
};
</script>

<style></style>
