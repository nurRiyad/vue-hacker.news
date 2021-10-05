<template>
  <div id="header">
    <h3>{{ title }}</h3>
    <span
      >Totall Points: {{ score }} || Created by {{ creator }} ||
      {{ tf }} age</span
    >
    <hr />
  </div>
  <div v-for="id in kids" :key="id.key">
    <print-comment :id="id"></print-comment>
  </div>
</template>

<script>
import axios from "axios";
import PrintComment from "../components/PrintComment.vue";
export default {
  components: { PrintComment },
  props: ["id"],
  data() {
    return {
      title: "",
      time: 0,
      score: 0,
      kids: [],
      creator: "",
    };
  },
  computed: {
    cmntCount() {
      let x = 0;
      for (let kid in this.kids) {
        if (kid) x += 1;
      }
      return x;
    },
    tf() {
      let unixTime = this.time;
      let finaltime = "";
      let createdate = new Date(unixTime * 1000);
      let currentDate = Date.now();
      let time = currentDate - createdate;
      let s = time / 1000;
      let m = s / 60;
      let h = m / 60;
      let d = h / 24;
      //console.log(d, h, m, s);
      if (d >= 1) finaltime = `${parseInt(d)} days`;
      else if (h >= 1) finaltime = `${parseInt(h)} Hours`;
      else if (m >= 1) finaltime = `${parseInt(m)} minutes`;
      else finaltime = `${parseInt(s)} seconds`;
      return finaltime;
    },
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.getData();
      },
    },
  },
  methods: {
    setData(val) {
      if (val?.data) {
        //console.log("called");
        this.title = val.data.title;
        this.time = val.data.time;
        this.score = val.data.score;
        this.kids = val.data.kids;
        this.creator = val.data.by;
      }
    },
    async getData() {
      let url = `https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`;
      let data = await axios.get(url);
      this.setData(data);
    },
  },
};
</script>

<style>
#header {
  text-align: left;
  padding-left: 5px;
}
</style>
