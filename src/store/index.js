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
    amount: 0
  },
  mutations: {
    setDataForGraph(state, data) {
      state.startWeight = data.startWeight;
      state.currentWeight = data.currentWeight;
      state.goalWeight = data.goalWeight;
      state.startDate = data.startDate;
      state.showCurrentWeight = data.startWeight;
      state.lostWeight = (data.startWeight - data.currentWeight).toFixed(1);

      state.percentageLost =
        (state.lostWeight * 100) / (data.startWeight - Number(data.goalWeight));

      state.numberForScale = (state.percentageLost * state.max) / 100;
    }
  },
  getters: {
    weightData(state) {
      return state;
    }
  },
  actions: {
    getWeightData({ commit }) {
      axios
        .get(process.env.VUE_APP_WEIGHT_ENDPOINT)
        .then(response => {
          commit("setDataForGraph", response.data);
        })
        .catch(error => console.error(error));
    }
  }
});
