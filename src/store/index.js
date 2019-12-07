import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startWeight: 0,
    currentWeight: 0,
    goalWeight: 0,
    startDate: "",
    showCurrentWeight: 0,
    lostWeight: 0,
    percentageLost: 0,
    numberForScale: 0,
    max: 147.708,
    amount: 0,
    submissions: []
  },
  mutations: {
    setDataForGraph(state, data) {
      state.startWeight = data.startWeight;
      state.currentWeight = data.weight[data.weight.length - 1].weight;
      state.goalWeight = data.goalWeight;
      state.startDate = data.startDate;
      state.showCurrentWeight = data.startWeight;
      state.lostWeight = (data.startWeight - state.currentWeight).toFixed(1);

      state.percentageLost =
        (state.lostWeight * 100) / (data.startWeight - Number(data.goalWeight));

      state.numberForScale = (state.percentageLost * state.max) / 100;
    },

    setSubmissions(state, data) {
      state.submissions = data.map(submission => {
        return {
          handle: submission.data.handle,
          url: `https://twitter.com/${submission.data.handle.substr(1)}`
        };
      });
    }
  },
  getters: {
    weightData(state) {
      return {
        startWeight: state.startWeight,
        currentWeight: state.currentWeight,
        goalWeight: state.goalWeight,
        startDate: state.startDate,
        showCurrentWeight: state.showCurrentWeight,
        lostWeight: state.lostWeight,
        percentageLost: state.percentageLost,
        numberForScale: state.numberForScale,
        max: state.max,
        amount: state.amount
      };
    },

    submissions(state) {
      return state.submissions;
    }
  },
  actions: {
    getWeightData({ commit }) {
      commit("setDataForGraph", require("../assets/content/weight"));
    },

    getSubmissions({ commit }) {
      axios
        .get(
          `https://api.netlify.com/api/v1/sites/${process.env.VUE_APP_SITE_ID}/submissions?access_token=${process.env.VUE_APP_TOKEN}`
        )
        .then(function(response) {
          commit("setSubmissions", response.data);
        });
    }
  }
});
