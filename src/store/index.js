import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state() {
    return {
      topNewsId: [],
      topNews: [],
      newNewsId: [],
      newNews: [],
    };
  },
  mutations: {
    setTopNewsId(state, payload) {
      state.topNewsId = payload;
    },
    setTopNews(state, payload) {
      state.topNews.push(payload);
    },
  },
  actions: {
    getTopNewsId(context) {
      //console.log("GetTopNewsId Called");
      axios
        .get(
          "https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty"
        )
        .then((res) => {
          context.commit("setTopNewsId", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getDataById(context) {
      //console.log("called");
      context.state.topNews = [];
      for (let i = 0; i < 10; i++) {
        let id = context.state.topNewsId[i];
        let url = `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`;
        axios
          .get(url)
          .then((res) => {
            context.commit("setTopNews", res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
});
