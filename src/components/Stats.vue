<template>
  <div class="stats">
    <span class="begin-weight">{{ startWeight }}kg</span>
    <span class="current-weight"> {{ showWeight }}<i>kg</i> </span>
    <span class="lost-weight">
      lost <span>{{ lost }}kg</span> since <br />
      {{
        new Date(startDate).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })
      }}
    </span>
    <span class="goal-weight">{{ goalWeight }}kg</span>
  </div>
</template>

<script>
import animateProp from "@/helpers/animateProp";

export default {
  name: "Stats",
  props: {
    startWeight: {
      type: Number,
      required: true
    },
    lostWeight: {
      type: Number,
      required: true
    },
    startDate: {
      type: String,
      required: true
    },
    goalWeight: {
      type: Number,
      required: true
    },
    currentWeight: {
      type: Number,
      required: true
    },
    animationSpeed: {
      type: Number,
      required: false,
      default: 1300
    },
    animationDelay: {
      type: Number,
      required: false,
      default: 700
    }
  },
  data() {
    return {
      propForAnimation: 0,
      animating: false,
      lost: 0.0,
      showWeight: 0.0
    };
  },

  watch: {
    currentWeight(newValue, oldValue) {
      this.propForAnimation = oldValue === 0 ? this.startWeight : oldValue;
      this.lost = (this.startWeight - newValue).toFixed(1);
      this.animate(newValue);
    }
  },

  created() {
    this.lost = this.lostWeight;
    this.propForAnimation = this.startWeight;
    this.showWeight = this.startWeight;
  },

  methods: {
    animate(animateToValue) {
      animateProp(
        this,
        "propForAnimation",
        animateToValue,
        this.animationSpeed,
        prop => {
          this.showWeight = prop.toFixed(1);
        }
      );
    }
  },

  mounted() {
    setTimeout(() => {
      this.animate(this.currentWeight);
    }, this.animationDelay);
  }
};
</script>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";
.stats {
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
    width: rem(150px);
    text-align: center;
    line-height: 1.5;

    span {
      color: $color2;
    }
  }

  i {
    font-size: 50%;
    font-style: normal;
  }
}
</style>
