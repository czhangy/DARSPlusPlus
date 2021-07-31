<template>
  <div class="course-list">
    <ul v-if="contents.length > 0">
      <li v-for="(content, i) in contents" :key="i">
        <p>{{ content.name }}</p>
        <i
          v-if="isCatalog"
          class="fas fa-check"
          :style="{ color: 'lightgreen' }"
          @click="onClick(content, true)"
        ></i>
        <div v-if="isCompleted">
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
            @click="handleDelete(i, false)"
          ></i>
        </div>
        <a
          v-if="isRecommended || isRemaining"
          :href="handleBruinwalkLink(content.name)"
          target="_blank"
        >
          <i class="fas fa-paw" :style="{ color: '#2774AE' }"></i>
        </a>
        <!-- <i
        v-if="isRecommended"
        class="far fa-question-circle"
        :style="{ color: 'grey' }"
      ></i> -->
      </li>
    </ul>
    <div class="empty-text" v-else>
      <p>Nothing to see here!</p>
    </div>
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
    isCatalog: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
    isRemaining: {
      type: Boolean,
      default: false,
    },
    onClick: {
      type: Function,
    },
    grades: {
      type: Array,
      default: null,
    },
  },
  methods: {
    handleDelete: function (i) {
      // Keep grade selections consistent on deletion
      while (i + 1 < this.contents.length) {
        this.grades[i] = this.grades[i + 1];
        i++;
      }
      // Clear grade data
      this.grades[i] = "";
      this.onClick(this.contents[i]);
    },
    handleBruinwalkLink: function (course) {
      // Format course name to Bruinwalk URL format
      course = course.replace(/\s+|&/g, "-").toLowerCase();
      // Append to base link
      return `http://bruinwalk.com/classes/${course}`;
    },
  },
  created() {
    console.log(this.contents);
  },
};
</script>

<style lang="scss" scoped>
.course-list {
  height: 100%;

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