<template>
  <div class="weight-graph">
    <svg viewBox="0 0 100 50">
      <path
        :d="path"
        :stroke="backgroundColour"
        :stroke-width="backgroundStrokeWidth"
        fill-opacity="0"
      ></path>
      <path
        ref="path"
        :d="path"
        :stroke="foregroundColour"
        :stroke-width="foregroundStrokeWidth"
        fill-opacity="0"
        :style="{
          strokeDasharray: `${amount}, ${max}`,
          strokeDashoffset: 0
        }"
      ></path>
    </svg>
    <span class="begin-weight">{{ weightData.beginWeight }}kg</span>
    <span class="current-weight">
      {{ weightData.showCurrentWeight }}<i>kg</i>
    </span>
    <span class="lost-weight">
      lost <span>{{ weightData.lostWeight }}kg</span> since
      {{ weightData.startDate }}
    </span>
    <span class="goal-weight">{{ weightData.goalWeight }}kg</span>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "WeightGraph",
  props: {
    foregroundColour: String
  },
  data() {
    return {
      backgroundColour: "#fff",
      backgroundStrokeWidth: 1,
      foregroundStrokeWidth: 3,
      path: "M 50,50 m -47,0 a 47,47 0 1 1 94,0",
      max: 147.708,
      amount: 0,
      showCurrentWeight: 0
    };
  },

  watch: {
    weightData: {
      immediate: true,
      handler: function(weightData) {
        const easeInOutSine = progress => {
          return Math.sin((Math.PI / 2) * progress);
        };

        this.showCurrentWeight = weightData.showCurrentWeight;

        setTimeout(() => {
          this.animateProp(
            this,
            "amount",
            weightData.numberForScale,
            1300,
            easeInOutSine
          );

          this.animateProp(
            this,
            "showCurrentWeight",
            weightData.currentWeight,
            1300,
            easeInOutSine,
            prop => {
              weightData.showCurrentWeight = prop.toFixed(1);
            }
          );
        }, 700);
      }
    }
  },

  created() {
    this.getWeightData();
  },

  computed: mapGetters(["weightData"]),

  methods: {
    ...mapActions(["getWeightData"]),
    animateProp(
      object,
      propertyName,
      finalValue,
      duration,
      easing,
      onStep,
      callback
    ) {
      let startTime = Date.now();
      let endTime = startTime + duration;
      let initialValue = object[propertyName];
      let valueDelta = finalValue - initialValue;
      step();

      function step() {
        let progress = Math.min(
          (duration - (endTime - Date.now())) / duration,
          1
        );

        if (easing) {
          progress = easing(progress);
        }

        object[propertyName] = initialValue + valueDelta * progress;

        if (onStep) {
          onStep(object[propertyName]);
        }

        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else if (callback) {
          callback();
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.weight-graph {
  width: 80%;
  margin: 0 auto 100px;
  position: relative;
  max-width: 375px;

  .goal-weight,
  .current-weight,
  .begin-weight,
  .lost-weight {
    font-size: 80%;
    position: absolute;
    bottom: rem(-20px);
    left: rem(-5px);
  }

  .goal-weight {
    right: 0;
    left: auto;
  }

  .current-weight {
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    font-size: 280%;
    bottom: rem(20px);
    font-weight: 900;
  }

  .lost-weight {
    left: 50%;
    transform: translateX(-50%);
    right: auto;
    bottom: rem(-21px);
    width: rem(146px);
    text-align: center;
    line-height: 1.5;

    span {
      color: lighten($color2, 20);
    }
  }

  i {
    font-size: 50%;
    font-style: normal;
  }
}
</style>
