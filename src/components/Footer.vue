<template>
  <div class="footer">
    <div>
      This site was created by
      <a href="https://czhangy.io/" target="_blank">Charles Zhang</a> using
      <br />
      <a href="https://vuejs.org/" target="_blank">Vue</a> |
      <a href="https://expressjs.com/" target="_blank">Express</a> |
      <a href="https://www.mongodb.com/" target="_blank">MongoDB</a> |
      <a href="https://www.netlify.com/" target="_blank">Netlify</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  // Sizing
  width: 100%;
  height: $navbar-height;
  // Background color
  background: $ucla-blue;
  // Give footer a shadow
  box-shadow: 0 -2px 10px $box-shadow-color;
  // Inner spacing
  padding: 0.5rem 2rem;
  // Flexbox for layout
  display: flex;
  justify-content: center;
  align-items: center;
  // Typography
  color: white;
  text-align: center;

  a {
    // Typography
    color: $ucla-gold;
    // Clickable
    cursor: pointer;
    // Remove default styling
    text-decoration: none;
  }
}
</style>