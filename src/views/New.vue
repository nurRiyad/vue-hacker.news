<template>
  <ul>
    <li v-for="(val, ind) in newids" :key="ind">
      <Test :ids="val" :index="ind"></Test>
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
import Test from "../components/Test.vue";
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
      let f = (this.pageNumber - 1) * 10;
      let l = this.pageNumber * 10 - 1;
      let d = [];
      for (let i = f; i <= l; i++) {
        d.push(this.newNewsId[i]);
      }
      return d;
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
    this.getNewsId("newstories");
  },
  components: {
    Test,
  },
};
</script>

<style></style>
