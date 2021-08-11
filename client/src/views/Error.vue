<template>
  <div id="error">
    <p id="icon">:(</p>
    <p>Something went wrong!</p>
    <router-link to="/">Return to Home</router-link>
  </div>
</template>

<script>
export default {
  name: "Error",
};
</script>

<style lang="scss" scoped>
#error {
  // Sizing
  height: calc(100vh - 220px);
  width: 100%;
  // Flexbox for centering
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #icon {
    // Typography
    font-size: 12rem;
    font-family: $alt-font;
    text-align: center;
    // Spacing
    margin-bottom: 2rem;
  }

  p {
    // Typography
    font-size: $title-font;
  }

  a {
    // Typography
    font-size: $header-font;
    font-family: $alt-font;
    color: white;
    text-decoration: none;
    // Spacing
    margin-top: 3rem;
    // Button styling
    background: $ucla-blue;
    border-radius: 50px;
    padding: 2rem;
  }
}

// Handle sticky hover
@media (hover: hover) {
  #error > a {
    &:hover {
      background: $ucla-dark-blue;
    }
  }
}
</style>