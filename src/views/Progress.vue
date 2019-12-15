<template>
  <div class="progress">
    <logo />
    <h1>Fatty.</h1>

    <TrendChart
      v-if="weightData"
      :datasets="weightData.formData"
      :grid="grid"
      :labels="weightData.labels"
      :min="weightData.currentWeight - 1"
      :interactive="true"
      padding="5 5 0"
      @mouse-move="onMouseMove"
    />
  </div>
</template>

<script>
import Logo from "@/components/Logo";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Progress",
  components: {
    Logo
  },
  data() {
    return {
      grid: {
        verticalLines: true,
        horizontalLines: true
      }
    };
  },

  created() {
    this.getWeightData();
  },

  computed: mapGetters(["weightData"]),

  methods: {
    ...mapActions(["getWeightData"]),

    onMouseMove(data) {
      console.log(data);
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

  .logo {
    margin: rem(0 auto 20px);
    width: rem(130px);
  }

  h1 {
    margin: rem(0 auto 50px);
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
