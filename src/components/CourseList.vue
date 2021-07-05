<template>
  <ul v-if="contents.length">
    <li v-for="(content, i) in contents" :key="i">
      <p>{{ content }}</p>
      <i
        v-if="enableSelect"
        class="fas fa-check"
        :style="{ color: 'lightgreen' }"
        @click="onClick(content)"
      ></i>
      <div v-if="enableDelete">
        <label>Grade:</label>
        <select v-model="grades[i]">
          <option>A/A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B</option>
          <option>B-</option>
          <option>C+</option>
          <option>C</option>
          <option>C-</option>
          <option>D+</option>
          <option>D</option>
          <option>D-</option>
          <option>F</option>
          <option>P</option>
        </select>
        <i
          class="far fa-trash-alt"
          :style="{ color: 'red' }"
          @click="handleDelete(i)"
        ></i>
      </div>
      <i v-if="enableInfo" class="fas fa-paw" :style="{ color: '#2774AE' }"></i>
      <i
        v-if="enableInfo"
        class="far fa-question-circle"
        :style="{ color: 'grey' }"
      ></i>
    </li>
  </ul>
  <div class="empty-text" v-else>
    <p>Nothing to see here!</p>
  </div>
</template>

<script>
export default {
  name: "CourseList",
  props: {
    contents: {
      type: Array,
      default: [],
    },
    enableSelect: {
      type: Boolean,
      default: false,
    },
    enableDelete: {
      type: Boolean,
      default: false,
    },
    enableInfo: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      grades: [],
    };
  },
  methods: {
    handleDelete(i) {
        // Keep grade selections consistent on deletion
      while (i + 1 < this.contents.length) {
        this.grades[i] = this.grades[i + 1];
        i++;
      }
      // Clear grade data
      this.grades[i] = "";
      this.onClick(this.contents[i]);
    },
  },
};
</script>

<style lang="scss" scoped>
ul {
  // Sizing
  width: 100%;
  // Typography
  font-family: $alt-font;
  font-weight: bold;

  li {
    // Flexbox for layout
    display: flex;
    justify-content: space-between;
    align-items: center;
    // Inner spacing
    padding: 2rem;
    // Separator
    border-bottom: $line solid $ucla-blue;
    // Background
    background: white;

    p {
      // Typography
      font-size: $header-font;
      // Spacing
      margin-right: 2rem;
    }

    div {
      // Flexbox for layout
      display: flex;
      justify-content: center;
      align-items: center;

      select {
        // Spacing
        margin-left: 1rem;
        margin-right: 2rem;
        // Sizing
        width: 4rem;
        // Tpography
        font-size: $body-font;
        font-family: $alt-font;
      }
    }

    .fa,
    .far,
    .fas {
      // Sizing
      font-size: 2rem;
      // Clickable
      cursor: pointer;
    }
  }
}

.empty-text {
  // Flexbox for centering
  display: flex;
  justify-content: center;
  align-items: center;
  // Take up container to center vertically
  height: 100%;
  // Inner spacing
  padding: 5rem;

  p {
    // Typography
    font-family: $alt-font;
    font-size: $title-font;
    font-weight: bold;
    color: white;
    // Centering
    text-align: center;
  }
}

// Sticky hover
@media (hover: hover) {
  .fa,
  .fas,
  .far {
    transition: transform 0.2s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>