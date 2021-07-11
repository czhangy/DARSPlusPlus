<template>
  <div class="home">
    <div class="landing-page">
      <h1>Welcome to DARS++</h1>
      <h2>A student solution to course planning at UCLA</h2>
      <button
        @click="() => $refs['form'].scrollIntoView({ behavior: 'smooth' })"
      >
        Get Started!
      </button>
    </div>
    <div class="form-section" ref="form">
      <h3>Resume your progress</h3>
      <label>Paste your hash code here:</label>
      <input v-model="hashCode" />
      <button @click="handleHashSubmit">GO!</button>
      <div class="divider">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <h3>Start from scratch</h3>
      <label>Select your major:</label>
      <select v-model="selectedMajor">
        <option disabled value="">Select your major</option>
        <option>Aerospace Engineering</option>
        <option>Bioengineering</option>
        <option>Chemical Engineering</option>
        <option>Civil Engineering</option>
        <option>Computer Engineering</option>
        <option>Computer Science</option>
        <option>Computer Science and Engineering</option>
        <option>Electrical Engineering</option>
      </select>
      <button @click="handleFormSubmit">GO!</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Home",
  data() {
    return {
      hashCode: "",
    };
  },
  methods: {
    handleHashSubmit: function () {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This feature is still under development.",
      });
    },
    handleFormSubmit: function () {
      if (this.major == "Testing" || this.major == null)
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please select a major to proceed.",
        });
      else
        this.$router
          .push({ path: "summary" })
          .then(() => window.scrollTo(0, 0));
    },
  },
  computed: {
    ...mapGetters(["major"]),
    selectedMajor: {
      get() {
        return this.$store.state.major;
      },
      set(value) {
        this.$store.commit("setMajor", value);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  .landing-page {
    // Set background image
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url("../assets/img/Home/landing-page.jpg");
    // Sizing
    height: calc(100vh - 110px);
    width: 100%;
    // Parallax effect
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    // Typography
    color: white;
    font-family: $alt-font;
    // Flexbox for centering
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
      // Typography
      font-size: $title-font;
    }

    h2 {
      // Typography
      font-size: $header-font;
    }

    button {
      // Outer spacing
      margin-top: 5rem;
      // Inner spacing
      padding: 1rem 2rem;
      // Typography
      font-size: $subheader-font;
      // Button styling
      background: $ucla-blue;
      border-radius: 30px;
      opacity: 0.85;
    }
  }

  .form-section {
    // Typography
    color: $font-color;
    font-family: $alt-font;
    // Flexbox for centering
    display: flex;
    flex-direction: column;
    align-items: center;
    // Inner spacing
    padding: 8rem 0;

    h3 {
      // Typography
      font-size: $subheader-font;
      text-decoration: underline;
    }

    label {
      // Spacing
      margin-top: 3rem;
      margin-bottom: 1rem;
      // typography
      font-size: $body-font;
    }

    input {
      // Typography
      color: $font-color;
      font-size: $subheader-font;
      font-family: $alt-font;
      // Inner spacing
      padding: 0.2rem 0.5rem;
    }

    button {
      // Outer spacing
      margin-top: 1rem;
      // Inner spacing
      padding: 1rem 2rem;
      // Typography
      font-size: $body-font;
      // Button styling
      border-radius: 10px;
    }

    .divider {
      // Flexbox for layout and centering
      display: flex;
      justify-content: center;
      align-items: center;
      // Sizing
      width: 100%;

      hr {
        // Sizing
        width: 35%;
        height: $line;
        // Coloring
        background: $ucla-blue;
        // Remove default styling
        border: none;
      }

      span {
        // Spacing
        margin: 5rem;
        // Typography
        font-weight: bold;
        font-size: $subheader-font;
        color: $ucla-blue;
      }
    }

    select {
      // Typography
      color: $font-color;
      font-size: $subheader-font;
      font-family: $alt-font;
      // Inner spacing
      padding: 0.2rem 0.5rem;
    }
  }
}
</style>
