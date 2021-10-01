<template>
  <h1>{{ data }}</h1>
  <div v-for="(val, ind) in topids" :key="ind">
    <Printlist :id="val"></Printlist>
  </div>
</template>

<script>
import Printlist from "../components/Printlist.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Top",
  data() {
    return {
      data: "This is Top Page",
    };
  },
  computed: {
    ...mapState(["topNewsId"]),
    topids() {
      return this.topNewsId.filter((val, ind) => {
        if (ind < 10) return true;
        else return false;
      });
    },
  },
  methods: {
    ...mapActions(["getTopNewsId"]),
  },
  created() {
    this.getTopNewsId();
  },
  components: {
    Printlist,
  },
};
</script>

<style>
#element {
  list-style-type: none;
  padding: 0;
  margin: 30px;
  padding: 20px;
  border-bottom: 2px solid rgb(0, 0, 0);
  text-align: left;
}
</style>
