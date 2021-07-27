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
      <p v-if="hashError">Please enter a valid hash code!</p>
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
        <option>Computer Science</option>
      </select>
      <p v-if="majorError">Please select a major!</p>
      <button @click="handleMajorSubmit">GO!</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      hashCode: "",
      hashError: false,
      majorError: false,
    };
  },
  methods: {
    handleHashSubmit: function () {
      return;
    },
    handleMajorSubmit: function () {
      // Handle error if no major has been selected
      if (this.major === "") {
        this.majorError = true;
        document.getElementsByTagName("select")[0].style.borderColor = "red";
      } else
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
  created() {
    // Reset global state
    this.selectedMajor = "";
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
      // Spacing
      margin: 0 2rem;
      // Centering
      text-align: center;
    }

    h2 {
      // Typography
      font-size: $header-font;
      // Spacing
      margin: 0 2rem;
      // Centering
      text-align: center;
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
    padding: calc(clamp(4rem, 2.400rem + 6.400vw, 8rem)) 0;

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
      // Border
      border: 1px solid black;
      border-radius: 4px;
    }

    p {
      // Typography
      color: red;
      // Spacing
      margin-top: 1rem;
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
      width: 90%;

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
        margin: 5rem calc(clamp(3rem, 2.200rem + 3.200vw, 5rem));
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
      // Border
      border: 1px solid black;
      border-radius: 4px;
    }
  }
}
</style>
