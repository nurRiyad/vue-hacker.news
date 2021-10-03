<template>
  <ul>
    <li v-for="(val, ind) in newids" :key="ind">
      <Printlist :id="val"></Printlist>
      <hr />
    </li>
  </ul>
  <div id="pageChange">
    <button class="previous" @click="previousPage">Prev</button>
    <span>{{ pageNumber }}</span>
    <button class="next" @click="nextPage">Next</button>
  </div>
</template>

<script>
import Printlist from "../components/Printlist.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "New",
  data() {
    return {
      pageNumber: 1,
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
    nextPage() {
      if (this.pageNumber >= 50) {
        this.pageNumber = 50;
      } else this.pageNumber += 1;
    },
    previousPage() {
      if (this.pageNumber <= 1) {
        this.pageNumber = 1;
      } else this.pageNumber -= 1;
    },
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
