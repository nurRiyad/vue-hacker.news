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
    getNewsId(context, payload) {
      console.log("GetTopNewsId Called", payload);
      axios
        .get(
          `https://hacker-news.firebaseio.com/v0/${payload}.json?print=pretty`
        )
        .then((res) => {
          if (payload == "topstories") context.commit("setTopNewsId", res.data);
          else context.commit("SetNewNewsId", res.data);
        })
        .catch((err) => {
          console.log("getNewsId Erros", err);
        });
    },
  },
});
