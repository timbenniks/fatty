<template>
  <div class="weight-graph">
    <graph
      :foreground-colour="foregroundColour"
      :number-for-scale="weightData.numberForScale"
    />
    <stats
      :start-weight="Number(weightData.startWeight)"
      :lost-weight="Number(weightData.lostWeight)"
      :start-date="weightData.startDate"
      :goal-weight="Number(weightData.goalWeight)"
      :current-weight="Number(weightData.currentWeight)"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Graph from "./Graph.vue";
import Stats from "./Stats.vue";

export default {
  name: "WeightGraph",
  props: {
    foregroundColour: String
  },
  components: {
    Graph,
    Stats
  },
  created() {
    this.getWeightData();
  },
  computed: mapGetters(["weightData"]),
  methods: {
    ...mapActions(["getWeightData"])
  }
};
</script>
