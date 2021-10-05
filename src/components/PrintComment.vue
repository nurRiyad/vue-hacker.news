<template>
  <div id="cmt">
    <p><span v-html="text"></span></p>
    <p id="by">by {{ creator }} || {{ tf }} age</p>
    <hr />
    <div id="child" v-for="kid in kids" :key="kid.key">
      <print-comment :id="kid"></print-comment>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      text: "",
      time: 0,
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
        this.text = val.data.text;
        this.time = val.data.time;
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
#cmt {
  text-align: left;
  padding: 5px;
}
#by {
  text-align: right;
}
#child {
  padding-left: 30px;
}
</style>
