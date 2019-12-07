<template>
  <div class="error">
    <h1>Error.</h1>
    <h2>Something went wrong with the form submission.</h2>

    <article>
      <p>
        Thanks for supporting me in my weight loss journey! I will check out
        what is going wrong with the form and I'll fix it as soon as I can.
      </p>

      <iframe
        src="https://www.youtube.com/embed/SIaFtAKnqBU?rel=0&controls=0&autoplay=1&loop=1&modestbranding=1&playsinline=1"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <p>
        Go back <router-link to="/">home</router-link>. This sheep will keep
        screaming.
      </p>
    </article>
  </div>
</template>

<script>
export default {
  name: "Error"
};
</script>
<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";
.error {
  width: 100%;
  max-width: rem(600px);
  margin: rem(40px auto 0);
  text-align: center;

  h1 {
    margin: rem(0 0 16px 0);
  }

  h2 {
    font-size: rem(18px);
  }

  article {
    width: 80%;
    margin: rem(20px auto);

    iframe {
      width: 100%;
      height: rem(270px);
    }
  }
}
</style>
