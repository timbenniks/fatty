<template>
  <div class="home">
    <weight-graph foreground-colour="#c50d0d" />

    <div class="logo-wrapper">
      <logo />
      <h1>Fatty.</h1>
    </div>
  </div>
</template>

<script>
import WeightGraph from "@/components/WeightGraph";
import Logo from "@/components/Logo";

export default {
  name: "home",
  components: {
    WeightGraph,
    Logo
  }
};
</script>

<style lang="scss">
.home {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  .logo-wrapper {
    width: rem(100px);
    margin: 0 auto;
    text-align: center;

    .logo {
      margin: rem(0 0 10px 0);
    }
  }
}
</style>
