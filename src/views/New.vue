<template>
  <h1>{{ data }}</h1>
  <div v-for="(val, ind) in newids" :key="ind">
    <Printlist :id="val"></Printlist>
  </div>
</template>

<script>
import Printlist from "../components/Printlist.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "New",
  data() {
    return {
      data: "This is New Page",
    };
  },
  computed: {
    ...mapState(["newNewsId"]),
    newids() {
      return this.newNewsId.filter((val, ind) => {
        if (ind < 10) return true;
        else return false;
      });
    },
  },
  methods: {
    ...mapActions(["getNewsId"]),
  },
  created() {
    //console.log("I am here");
    this.getNewsId("newstories");
  },
  components: {
    Printlist,
  },
};
</script>

<style>
#element {
  list-style-type: none;
  margin: 30px;
  padding: 10px;
  padding-left: 0;
  border-bottom: 2px solid rgb(0, 0, 0);
  text-align: left;
}
</style>
