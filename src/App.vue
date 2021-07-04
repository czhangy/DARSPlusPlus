<template>
  <Navbar />
  <router-view />
  <Footer />
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
};
</script>


<style lang="scss">
// Get fonts
@import url("https://fonts.googleapis.com/css2?family=Fugaz+One&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,700;1,400;1,700&display=swap");

#app {
  font-family: "Fugaz One", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
}

html {
  height: 100%;
  overflow-x: hidden;
}

body {
  height: 100%;
  font-family: $alt-font;
}

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

.separator {
  // Sizing
  width: 100vw;
  height: 10rem;
  box-shadow: 0px 1px 10px $box-shadow-color inset,
    0px -1px 10px $box-shadow-color inset;
  // Flexbox for centering
  display: flex;
  justify-content: center;
  align-items: center;
  // Spacing
  margin: 5rem 0;
  background: $ucla-gold;
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
