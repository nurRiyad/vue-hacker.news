<template>
  <div id="userD">
    <h1>User Name: {{ id }}</h1>
    <p>Accout Created {{ tf }} ago.</p>
    <p>Karma : {{ karma }}</p>
    <div>
      <p>About</p>
      <span v-html="about"></span>
    </div>
  </div>
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
  computed: {
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
        //console.log("called");
        this.getData();
      },
    },
  },
  methods: {
    setData(val) {
      if (val?.data) {
        //console.log("calling from setdata", val.data);
        this.time = val.data.created;
        this.karma = val.data.karma;
        this.about = val.data.about;
      }
    },
    async getData() {
      let url = ` https://hacker-news.firebaseio.com/v0/user/${this.id}.json?print=pretty`;
      let d = await axios.get(url);
      this.setData(d);
    },
  },
};
</script>

<style></style>
