<template>
  <div class="thanks">
    <h1>Thanks!</h1>

    <article>
      <p>
        Thanks for supporting me in my weight loss journey!
      </p>
      <p>
        To be able to loose weight I need a good incentive. And for me that
        incentive is public accountability.
      </p>
      <p>
        This little app shows how much weight I have lost and it tweets an
        update into the world every time I step on the scale.
      </p>
      <p>
        In February 2020 I'm speaking at the
        <a
          href="https://frontenddeveloperlove.com/"
          rel="noopener"
          target="_blank"
          title="Front-end Developer Love conference website."
          >Front-end Developer Love</a
        >
        conference and by that time I want to weigh ~95kg.
      </p>
      <p>
        I lost a
        <a
          href="https://timbenniks.nl/writings/my-fitness-story/"
          rel="noopener"
          target="_blank"
          title="Tim's Fitness Story"
          >bunch of weight in the past</a
        >
        but the stress of life caught up to me. I shall loose these kilo's
        again!
      </p>
    </article>
  </div>
</template>

<script>
export default {
  name: "Thanks"
};
</script>
<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";
.thanks {
  width: 100%;
  max-width: rem(600px);
  margin: rem(40px auto 0);
  text-align: center;

  article {
    width: 80%;
    margin: rem(40px auto);
  }
}
</style>
