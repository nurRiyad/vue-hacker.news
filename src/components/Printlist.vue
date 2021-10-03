<template>
  <div class="container" id="element" v-if="status == 'ok'">
    <div class="position">
      <span class="score">{{ obj.score }}</span>
      <span class="title">
        <a :href="obj.url">{{ obj.title }}</a>
      </span>
      <span class="time">by {{ obj.by }} || </span>
      <span class="comment">{{ tf(obj.time) }} ago || </span>
      <span> Comments </span>
    </div>
  </div>
  <div v-else-if="status == 'loading'">
    <p>Element Is Loading</p>
  </div>
  <div v-else>
    <p>Sorry Could Not Fetch Tethc The Data</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      obj: null,
      status: "loading",
    };
  },
  computed: {},
  methods: {
    async getData() {
      let url = `https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`;
      let data = await axios.get(url);
      //console.log(data.data);
      this.obj = data.data;
    },
    tf(unixTime) {
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
  created() {
    this.getData()
      .then(() => {
        this.status = "ok";
      })
      .catch(() => {
        this.status = "failed";
      });
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
