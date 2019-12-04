import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    startWeight: 0,
    currentWeight: 0,
    goalWeight: 0,
    startDate: ""
  },
  mutations: {
    setDataForGraph(state, data) {
      state.startWeight = data.startWeight;
      state.currentWeight = data.currentWeight;
      state.goalWeight = data.goalWeight;
      state.startDate = data.startDate;
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
        .then(response => commit("setDataForGraph", response.data))
        .catch(error => console.error(error));
    }
  }
});
