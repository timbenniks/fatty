<template>
  <div class="support-form">
    <div class="support-form-action">
      <div
        class="support-form-action-logo-wrap"
        @keydown.enter="toggleForm"
        @keydown.space="toggleForm"
        @click="toggleForm"
        aria-role="button"
        tabindex="0"
        :aria-pressed="showForm"
        aria-haspopup="support-form"
        :aria-expanded="showForm"
        aria-labelledby="exp_elem exp_button"
      >
        <slot />
      </div>

      <button
        class="sr-only"
        aria-label="click this button to support me in losing weight"
        @click="toggleForm"
        aria-haspopup="support-form"
        :aria-expanded="showForm"
        aria-labelledby="exp_elem exp_button"
        id="exp_button"
        :tabindex="showForm ? -1 : false"
      >
        Support Tim on his #roadtoamsterdam
      </button>

      <p @click="toggleForm" class="support">
        Support me by <span>clicking</span> on my belly!
      </p>

      <div class="supporters">
        <h3>Proud supporters</h3>
        <ul>
          <li v-for="submission in submissions" :key="submission.handle">
            <a :href="submission.url" rel="noopener" target="_blank">{{
              submission.handle
            }}</a>
          </li>
        </ul>
      </div>

      <div v-show="showForm" class="support-form-wrapper">
        <form
          id="support-form"
          name="support"
          method="post"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          @submit.prevent="handleSubmit"
        >
          <label for="handle" id="exp_elem"
            >Please provide a Twitter handle</label
          >
          <button
            class="close-form"
            aria-label="click this button to close the form"
            @click.prevent="toggleForm"
          >
            +
          </button>

          <div class="support-form-field-wrapper">
            <div class="form-field handle">
              <input
                ref="handle"
                name="handle"
                type="text"
                id="handle"
                placeholder="@username"
                pattern="^@[A-Za-z0-9_]{1,15}$"
                @invalid="handleError"
                @input="ev => (form.handle = ev.target.value)"
                title="Only Twitter handles allowed"
                required
                value="@"
              />
            </div>
            <div class="form-field submit">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SupportForm",
  data() {
    return {
      showForm: false,
      form: {
        handle: ""
      }
    };
  },
  watch: {
    showForm() {
      if (this.show === false) {
        window.removeEventListener("keyup", this.onEscapeKeyUp);
      } else {
        window.addEventListener("keyup", this.onEscapeKeyUp);
        this.$nextTick(() => this.$refs.handle.focus());
      }
    }
  },

  created() {
    this.getSubmissions();
  },

  computed: mapGetters(["submissions"]),

  methods: {
    ...mapActions(["getSubmissions"]),

    toggleForm() {
      this.showForm = !this.showForm;
    },

    handleError(error) {
      error.target.classList.add("error");
    },

    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.showForm = false;
      }
    },

    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },

    handleSubmit() {
      axios
        .post("/", this.encode({ "form-name": "support", ...this.form }), {
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        })
        .then(() => {
          this.$router.push("thanks");
        })
        .catch(() => {
          this.$router.push("error");
        });
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables";
@import "../styles/mixins";
.support-form {
  position: relative;
  width: rem(330px);
  margin: 0 auto;
  text-align: center;

  .support {
    margin: rem(0 0 40px 0);
    cursor: pointer;

    span {
      color: $color2;
      text-decoration: underline;
    }

    &:hover {
      span {
        color: $color4;
      }
    }
  }

  .support-form-wrapper {
    position: absolute;
    top: rem(160px);
    left: 50%;
    width: rem(330px);
    height: auto;
    background: $color2;
    padding: 1rem;
    transform: translateX(-50%);
    border-bottom: 2px solid $color3;
    box-shadow: 0 10px 20px 5px rgba(0, 0, 0, 0.5);

    label {
      display: block;
      font-size: rem(14px);
      margin: rem(0 0 3px 0);
    }

    .close-form {
      position: absolute;
      right: 0;
      top: 0;
      width: 13px;
      background: none;
      border: none;
      color: $color3;
      font-weight: bold;
      font-size: rem(23px);
      transform: rotate(45deg);
      cursor: pointer;
      -webkit-appearance: none;
      transform-origin: center;
      height: rem(24px);
      width: rem(24px);
      line-height: 1;
      padding: 0;
      margin: 0;

      &:hover {
        color: $color1;
      }

      &:focus {
        outline: 1px solid $color3;
      }
    }

    .support-form-field-wrapper {
      display: flex;
      justify-content: center;
    }

    .handle input {
      width: rem(100%);
      line-height: 1;
      padding: rem(6px);
      background: $color1;
      border-bottom: solid $color3;
      border-width: 0 0 2px 0;
      font-family: $font;
      font-size: rem(17px);
      color: $color3;
      -webkit-appearance: none;
      border-radius: 0;

      &:focus {
        outline: none;
      }
    }

    .submit button {
      background: $color4;
      border-bottom: solid $color3;
      border-width: 0 0 2px 0;
      font-family: $font;
      font-size: rem(14px);
      color: $color3;
      font-weight: bold;
      text-transform: uppercase;
      height: rem(34.8px);
      cursor: pointer;
      -webkit-appearance: none;
      line-height: 1;
      padding: rem(0 8px);

      &:hover,
      &:focus {
        background: $color1;
      }
    }
  }
}

.support-form-action-logo-wrap {
  cursor: pointer;
  margin: rem(0 auto 20px);

  .logo {
    animation: shake 4s ease;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
    animation-iteration-count: infinite;
  }

  &:focus {
    outline: none;

    .logo-wrapper {
      outline: 1px solid $color3;
    }
  }
}

input.error {
  outline: none;
  border-color: 1px solid $color4;

  &:valid {
    border-style: auto;
    border-color: inherit;
  }
}

.supporters ul {
  list-style: none;
  text-align: center;
  padding: 0;

  a {
    color: $color2;
  }
}

@keyframes shake {
  0% {
    transform: translate3d(0, 0, 0);
  }
  2% {
    transform: translate3d(-3px, 0, 0);
  }
  4% {
    transform: translate3d(5px, 0, 0);
  }
  6% {
    transform: translate3d(-8px, 0, 0);
  }
  8% {
    transform: translate3d(8px, 0, 0);
  }
  10% {
    transform: translate3d(-5px, 0, 0);
  }
  12% {
    transform: translate3d(3px, 0, 0);
  }
  14% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
