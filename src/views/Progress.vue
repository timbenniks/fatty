<template>
  <div class="progress">
    <h1>{{ date }}</h1>

    <div class="weight-graph">
      <graph
        foreground-colour="#c50d0d"
        :number-for-scale="progress"
        :animation-speed="400"
        :animation-delay="10"
      />
      <stats
        :start-weight="Number(weightData.startWeight)"
        :lost-weight="Number(lost)"
        :start-date="weightData.startDate"
        :goal-weight="Number(weightData.goalWeight)"
        :current-weight="Number(current)"
        :animation-speed="400"
        :animation-delay="10"
      />
    </div>

    <p class="tip">Tip: hover or tap me to see more information</p>
    <TrendChart
      v-if="weightData"
      :datasets="weightData.formData"
      :grid="grid"
      :labels="weightData.labels"
      :min="weightData.currentWeight - 1"
      :interactive="true"
      @mouse-move="onMouseMove"
    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Graph from "@/components/Graph.vue";
import Stats from "@/components/Stats.vue";

export default {
  name: "Progress",
  components: {
    Stats,
    Graph
  },
  data() {
    return {
      grid: {
        verticalLines: true,
        horizontalLines: true
      },

      date: false,
      current: 0,
      progress: 0,
      lost: 0,
      dateOptions: {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric"
      }
    };
  },

  created() {
    this.getWeightData();
  },

  computed: mapGetters(["weightData"]),

  watch: {
    weightData: {
      immediate: true,
      handler: function(weightData) {
        if (weightData.startWeight === 0) {
          return;
        }

        this.current = weightData.currentWeight.toFixed(1);
        this.lost = weightData.lostWeight;
        this.progress = weightData.numberForScale;

        this.date = new Date(
          this.weightData.weight[this.weightData.weight.length - 1].date
        ).toLocaleDateString("en-US", this.dateOptions);
      }
    },

    current(newValue) {
      this.lost = (this.weightData.startWeight - newValue).toFixed(1);

      const percentageLost =
        (this.lost * 100) /
        (this.weightData.startWeight - Number(this.weightData.goalWeight));

      this.progress = (percentageLost * this.weightData.max) / 100;
    }
  },

  methods: {
    ...mapActions(["getWeightData"]),

    onMouseMove(data) {
      if (data !== null) {
        const weight = data.data[0];
        const measurementObject = this.weightData.weight[data.index];

        if (measurementObject) {
          this.current = weight;
          this.date = new Date(measurementObject.date).toLocaleDateString(
            "en-US",
            this.dateOptions
          );
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.progress {
  width: 95%;
  max-width: rem(600px);
  margin: rem(40px auto 0);
  text-align: center;

  h1 {
    margin: rem(0 0 30px 0);
  }

  .tip {
    margin: 0;
  }

  .vtc {
    .x-labels .label text {
      transform: rotate(-35deg) translateY(-7px);
      transform-origin: 0 15%;
    }

    .label text {
      font-size: 12px;
      fill: $color2;
    }

    .curve {
      .fill {
        fill: $color4;
        opacity: 0.3;
      }

      .stroke {
        stroke: $color4;
        stroke-width: 2;
      }

      .point {
        fill: $color4;
        stroke: $color4;
      }
    }

    .active-line {
      stroke: rgba($color4, 0.5);
    }

    .grid .line {
      stroke: rgba($color2, 0.1);
    }
  }
}
</style>
