<template>
  <div id="search-bar">
    <input placeholder="Find a course" v-model="query" @input="onInput(query)" />
    <div id="search-icon">
      <i class="fa fa-search" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  props: {
    onInput: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      query: "",
    };
  },
};
</script>

<style lang="scss" scoped>
#search-bar {
  // Sizing
  width: 100%;
  // Container styling
  background: $ucla-blue;
  // Position fixed for scroll
  position: sticky;
  top: 0;
  // Flexbox for layout + centering
  display: flex;
  justify-content: center;
  align-items: center;
  // Inner spacing
  padding: 1rem 0;

  input {
    // Typography
    font-family: $alt-font;
    font-size: $subheader-font;
    // Inner spacing
    padding: 0 1rem;
    // Container shaping
    border-radius: 30px 0 0 30px;
    // Remove default styling
    border: none;
    // Sizing
    width: 70%;
    height: 3rem;
  }

  #search-icon {
    // Container styling
    background: white;
    // Sizing
    height: 3rem;
    // Flexbox for centering
    display: flex;
    justify-content: center;
    align-items: center;
    // Container shaping
    border-radius: 0 30px 30px 0;
    // Inner spacing
    padding-right: 0.7rem;

    .fa-search {
      // Icon styling
      font-size: 1.5rem;
    }
  }
}
</style>