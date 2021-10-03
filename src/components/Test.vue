<template>
  <div class="container">
    <div class="position">
      <span class="score">{{ score }}</span>
      <span class="title">
        <a :href="link">{{ title }}</a>
        <span class="time">by {{ creator }} || </span>
        <span class="comment">{{ tf }} ago || </span>
        <span> Comments </span>
      </span>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["index", "ids"],
  data() {
    return {
      title: null,
      time: null,
      score: null,
      kids: null,
      link: null,
      creator: null,
      id: this.ids,
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
    ids() {
      //console.log(newval, oldval);
      this.getData();
    },
  },
  methods: {
    setData(val) {
      this.title = val.title;
      this.time = val.time;
      this.score = val.score;
      this.kids = val.kids;
      this.link = val.url;
      this.creator = val.by;
    },
    async getData() {
      let url = `https://hacker-news.firebaseio.com/v0/item/${this.ids}.json?print=pretty`;
      console.log(url);
      let data = await axios.get(url);
      this.setData(data.data);
      this.tf();
      console.log("i amd here", data.data);
    },
  },
};
</script>

<style>
hr {
  margin: 0;
}
.container {
  background-color: white;
  padding-bottom: 10px;
  text-align: left;
  font-size: 0.85em;
  color: #828282;
}

.position {
  clear: both;
  margin: 10px 0 10px 0;
  padding: 0 10px 0 10px;
  width: 100%;
}
.score {
  font-size: 25px;
  margin-right: 10px;
  float: left;
  width: 80px;
  text-align: center;
  color: rgb(230, 113, 17);
}

.comment {
  clear: both;
}

.title a {
  display: block;
  text-decoration: none;
  font-size: 17px;
  color: #34495e;
  line-height: 20px;
}
</style>
