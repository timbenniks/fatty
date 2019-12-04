<template>
  <div id="app">
    <div class="bg-triangle"></div>
    <Navigation />

    <router-view />
  </div>
</template>
<script>
import Navigation from "@/components/Navigation";

export default {
  components: {
    Navigation
  }
};
</script>
