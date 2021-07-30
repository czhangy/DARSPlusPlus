<template>
  <div class="navbar">
    <router-link to="/">DARS++</router-link>
    <div class="page-links">
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
.navbar {
  // Sizing
  width: 100%;
  height: $navbar-height;
  // Background color
  background: $ucla-blue;
  // Give navbar a shadow
  box-shadow: 0 2px 10px $box-shadow-color;
  // Inner spacing
  padding: 0.5rem 2rem;
  // Flexbox for layout
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    // Typography
    color: white;
    font-size: $title-font;
    // Remove default styling
    text-decoration: none;
  }

  .page-links > a {
      // Typography
      font-size: $header-font;
      // Spacing
      margin-left: 3rem;
  }
}
</style>