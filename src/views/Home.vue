<template>
  <div class="home">
    <weight-graph foreground-colour="#c50d0d" />

    <support-form>
      <div class="logo-wrapper">
        <logo />
        <h1>Fatty.</h1>
      </div>
    </support-form>
  </div>
</template>

<script>
import WeightGraph from "@/components/WeightGraph";
import Logo from "@/components/Logo";
import SupportForm from "@/components/SupportForm";

export default {
  name: "home",
  components: {
    WeightGraph,
    Logo,
    SupportForm
  }
};
</script>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";
.home {
  margin: rem(50px auto);

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
