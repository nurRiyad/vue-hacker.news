<template>
  <div id="element" v-if="status == 'ok'">
    <a :href="obj.url">{{ obj.title }}</a>
    <div>
      <span>by {{ obj.by }} {{ obj.time }} ms ago | {{}} Comments </span>
      <span></span>
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

  methods: {
    async getData() {
      let url = `https://hacker-news.firebaseio.com/v0/item/${this.id}.json?print=pretty`;
      let data = await axios.get(url);
      //console.log(data.data);
      this.obj = data.data;
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
#element {
  list-style-type: none;
  padding: 0;
  margin: 30px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(119, 117, 117);
  text-align: left;
}
</style>
