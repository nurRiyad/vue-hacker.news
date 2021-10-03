import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      topNewsId: [],
      newNewsId: [],
    };
  },
  mutations: {
    setTopNewsId(state, payload) {
      state.topNewsId = payload;
    },
    SetNewNewsId(state, payload) {
      state.newNewsId = payload;
    },
  },
  actions: {
    async getNewsId(context, payload) {
      //console.log("GetTopNewsId Called", payload);
      try {
        let res = await axios.get(
          `https://hacker-news.firebaseio.com/v0/${payload}.json?print=pretty`
        );
        if (payload == "topstories") context.commit("setTopNewsId", res.data);
        else context.commit("SetNewNewsId", res.data);
      } catch (err) {
        console.log("called from getNewsId", err);
      }
    },
  },
});
