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
      <div class="separator">
        <hr />
        <span>or</span>
        <hr />
      </div>
      <h3>Start from scratch</h3>
      <label>Select your major:</label>
      <select v-model="major">
        <option disabled value="">Select your major</option>
        <option value="CE">Computer Engineering</option>
        <option value="COMSCI">Computer Science</option>
        <option value="CSE">Computer Science and Engineering</option>
      </select>
      <button @click="handleFormSubmit">GO!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      hashCode: "",
      major: "",
      courses: [],
    };
  },
  methods: {
    handleHashSubmit: function () {
      alert(`The handleHashSubmit() function in Home.vue must still be implemented, here are the relevant data points for testing:\n
            hashCode = "${this.hashCode}"`);
    },
    handleFormSubmit: function () {
      alert(`The handleHashSubmit() function in Home.vue must still be implemented, here are the relevant data points for testing:\n
            major = "${this.major}"
            courses = "${this.courses}"`);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  button {
    // Remove default styling
    border: none;
    // Typography
    font-family: $alt-font;
    color: white;
    // Button styling
    background: $ucla-blue;
    // Clickable
    cursor: pointer;
  }

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

    .separator {
      // Flexbox for layout and centering
      display: flex;
      justify-content: center;
      align-items: center;
      // Sizing
      width: 100%;

      hr {
        // Sizing
        width: 35%;
        height: 3px;
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

// Protect against sticky hover
@media (hover: hover) {
  button {
    &:hover {
      // Animate button on hover
      transform: scale(1.05);
      transition: transform 0.2s ease;
    }
  }
}
</style>
