<template>
  <nav class="navigation" aria-label="Main Naviogation">
    <router-link to="/" title="Go to Fatty home" class="head-link">
      <figure style="--aspect-ratio:1/1;">
        <logo />
      </figure>
      <span>FATTY BY TIM BENNIKS</span>
    </router-link>

    <button
      id="button"
      :class="{ 'is-active': burgerActive }"
      :aria-expanded="burgerActive"
      class="hamburger hamburger--3dx"
      type="button"
      aria-haspopup="true"
      aria-controls="menu"
      aria-label="Navigation"
      @click="showMenu"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner" />
      </span>
    </button>
    <ul id="menu" class="dropdown-menu" tabindex="-1">
      <li>
        <router-link to="/progress" title="See my progressin a chart.">
          Progress.
        </router-link>
      </li>
      <li>
        <router-link to="/about" title="Read about Fatty.">About.</router-link>
      </li>
      <li>
        <a
          href="https://timbenniks.nl/"
          title="Go to timbenniks.nl"
          rel="noopener"
          target="_blank"
        >
          timbenniks.com.
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import Logo from "@/components/Logo";
export default {
  data() {
    return {
      burgerActive: false
    };
  },
  methods: {
    showMenu() {
      this.burgerActive = !this.burgerActive;
    }
  },
  components: {
    Logo
  }
};
</script>

<style scoped lang="scss">
@import "../styles/variables";
@import "../styles/mixins";

.navigation {
  position: -webkit-sticky;
  position: sticky;
  background: $color1;
  min-height: rem(64px);
  border-bottom: 1px solid $color1;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  box-shadow: 0 0 20px -5px rgba(#000, 0.6);

  ul {
    margin: 0;
  }

  li {
    display: inline;
  }

  .head-link {
    position: absolute;
    top: rem(8px);
    left: rem(8px);
    display: flex;
    padding: rem(4px 5px 3px 5px);
    text-decoration: none;

    span {
      align-self: center;
      color: $color3;
      font-weight: 900;
      font-size: rem(16px);
    }

    &:focus {
      outline: 1px solid;
    }

    figure {
      width: rem(39px);
      display: block;
      align-self: center;
      margin: rem(0 10px 0 0);

      img {
        border-radius: 100%;
      }
    }
  }

  .hamburger {
    position: absolute;
    top: rem(17px);
    right: rem(13px);
    padding: rem(7px 3px 0);

    // prettier-ignore
    @include responsive('display', (xs: block, m: none));

    &:focus {
      outline: 1px solid;
    }
  }

  .hamburger[aria-expanded="true"] + .dropdown-menu {
    display: block;
  }
}

.dropdown-menu {
  list-style: none;
  line-height: 2;
  left: 0;
  height: auto;

  // prettier-ignore
  @include responsive('width', (xs: 100%, m: auto));

  // prettier-ignore
  @include responsive('position', (xs: fixed));

  // prettier-ignore
  @include responsive('top', (xs: rem(65px), m: 0));

  // prettier-ignore
  @include responsive('left', (xs: 0, m: auto));

  // prettier-ignore
  @include responsive('right', (xs: auto, m: 0));

  // prettier-ignore
  @include responsive('background', (xs: rgba($color1, 0.97), m: none));

  // prettier-ignore
  @include responsive('box-shadow', (xs: 0 10px 22px -6px rgba(#000, 0.8), m: none));

  // prettier-ignore
  @include responsive('display', (xs: none, m: block));

  // prettier-ignore
  @include responsive('text-align', (xs: center, m: right));

  // prettier-ignore
  @include responsive('padding', (xs: rem(10px 10px 16px), m: rem(15px 0 0 0)));

  a {
    display: inline-block;
    margin: rem(0 11px 0 0);
    padding: rem(0 4px);
    font-weight: 400;
    letter-spacing: 0.1em;
    font-size: rem(16px);
    color: $color3;
    text-decoration: none;
    position: relative;
    z-index: 1;

    &.active {
      color: $color3;

      &:before {
        top: 0;
      }

      &:after {
        display: none;
      }
    }

    &:before {
      content: "";
      position: absolute;
      background: $color2;
      bottom: 0;
      left: 0;
      right: 0;
      top: 100%;
      z-index: -1;
      transition: top 100ms ease;
    }

    @include hover-supported() {
      color: $color3;
    }

    &:focus {
      outline: 1px solid;
    }

    @include hover-supported() {
      &:before {
        top: 0;
      }
    }

    &:hover:after,
    &:focus:after {
      display: none;
    }

    &:after {
      content: "";
      position: absolute;
      height: 1px;
      background: $color2;
      width: calc(100% - 8px);
      left: rem(4px);
      bottom: 0;
    }
  }
}
</style>
