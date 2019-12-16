<template>
  <svg viewBox="0 0 100 50" class="graph">
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
</template>

<script>
import animateProp from "@/helpers/animateProp";

export default {
  name: "Graph",
  props: {
    animationSpeed: {
      type: Number,
      required: false,
      default: 1300
    },
    foregroundColour: {
      type: String,
      required: true
    },
    numberForScale: {
      type: Number,
      required: true
    },
    animationDelay: {
      type: Number,
      required: false,
      default: 700
    }
  },
  data() {
    return {
      backgroundColour: "#fff",
      backgroundStrokeWidth: 1,
      foregroundStrokeWidth: 3,
      path: "M 50,50 m -47,0 a 47,47 0 1 1 94,0",
      max: 147.708,
      amount: 0
    };
  },

  watch: {
    numberForScale(newValue) {
      this.animate(newValue);
    }
  },

  methods: {
    animate(animateToValue) {
      animateProp(this, "amount", animateToValue, this.animationSpeed);
    }
  },

  mounted() {
    setTimeout(() => {
      this.animate(this.numberForScale);
    }, this.animationDelay);
  }
};
</script>
