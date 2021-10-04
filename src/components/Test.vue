<template>
  <div class="container">
    <div class="position">
      <span class="score">{{ score }}</span>
      <span class="ttl">
        <a :href="link" target="blank">{{ title }}</a>
      </span>
      <span>
        <router-link
          :to="{ name: 'ProfileDetail', params: { id: creator || '-' } }"
        >
          <span>by {{ creator }} </span>
        </router-link>
        <span class="comment"> || {{ tf }} ago || </span>
        <span>{{ cmntCount }} Comments </span>
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
      title: "",
      time: 0,
      score: 0,
      kids: 0,
      link: "",
      creator: "",
      id: this.ids,
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
    userName() {
      return this.creator;
    },
  },
  watch: {
    ids: {
      immediate: true,
      handler() {
        //console.log("called");
        this.getData();
      },
    },
  },
  methods: {
    setData(val) {
      //console.log("setdata", val);
      //console.log("Riyad called");
      if (val?.data) {
        this.title = val.data.title;
        this.time = val.data.time;
        this.score = val.data.score;
        this.kids = val.data.kids;
        this.link = val.data.url;
        this.creator = val.data.by;
      }
    },
    async getData() {
      let url = `https://hacker-news.firebaseio.com/v0/item/${this.ids}.json?print=pretty`;
      //console.log(url);
      let data = await axios.get(url);
      //console.log("here", data.data);
      this.setData(data);
      //this.tf();
      //console.log("i amd here", data.data);
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

.ttl a {
  display: block;
  text-decoration: none;
  font-size: 17px;
  color: #34495e;
  line-height: 20px;
}
a {
  text-decoration: none;
  color: #34495e;
}
</style>
