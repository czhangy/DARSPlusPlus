<template>
  <div class="summary">
    <div class="summary-header">
      <hr />
      <h1>{{ major }}</h1>
      <hr />
    </div>
    <div class="courses">
      <div>
        <h2>Course Catalog</h2>
        <div class="course-container"></div>
      </div>
      <div>
        <h2>Completed Courses</h2>
        <div class="course-container"></div>
      </div>
    </div>
    <button @click="handleCoursesSubmit">SUBMIT!</button>
    <div class="separator" />
    <div class="data">
      <div class="data-headers">
        <div class="data-container">
          <h2>GPA:</h2>
          <p>2.98</p>
        </div>
        <div class="data-container mid-container">
          <h2>Remaining Courses:</h2>
          <p>19</p>
        </div>
        <div class="data-container">
          <h2>Remaining Units:</h2>
          <p>76</p>
        </div>
      </div>
      <div class="recommended-courses">
        <h2>Recommended Courses:</h2>
        <div></div>
      </div>
      <div class="remaining-courses">
        <h2>Courses to Take:</h2>
        <div></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "Summary",
  computed: {
    ...mapGetters(["major"]),
  },
  methods: {
    handleCoursesSubmit: function () {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This feature is still under development.",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.summary {
  // Inner spacing
  padding: 5rem;
  // Flexbox for centering
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // Sizing
  width: 100%;

  .summary-header {
    // Flexbox for layout
    display: flex;
    justify-content: center;
    align-items: center;
    // Sizing
    width: 100%;

    h1 {
      // Typography
      color: $ucla-blue;
      font-size: $header-font;
      // Spacing
      margin: 0 3rem;
      // Centering
      text-align: center;
      // Sizing
      width: 20%;
    }

    hr {
      // Sizing
      width: 30%;
      height: $line;
      // Coloring
      background: $ucla-blue;
      // Remove default styling
      border: none;
    }
  }

  .courses {
    // Flexbox for layout
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    // Spacing
    margin: 5rem 0;
    // Sizing
    width: 100%;

    h2 {
      // Centering
      text-align: center;
    }

    .course-container {
      // Container sizing
      height: 70vh;
      width: 30vw;
      // Visualize container
      border: $line solid $ucla-blue;
      // Scroll for overflowing courses
      overflow-y: scroll;
    }
  }

  button {
    // Inner spacing
    padding: 1rem 2rem;
    // Typography
    font-size: $body-font;
    // Button styling
    border-radius: 10px;
  }

  .data {
    // Sizing
    width: 100%;

    .data-headers {
      // Flexbox for layout
      display: flex;
      justify-content: space-evenly;

      .data-container {
        // Container
        border: $line solid $ucla-blue;
        // Inner spacing
        padding: 2rem;
        // Flexbox for layout
        display: flex;
        align-items: center;
        flex: 1;

        h2,
        p {
          // Sizing
          width: 50%;
          // Centering
          text-align: center;
        }

        h2 {
          // Typography
          font-size: $header-font;
        }

        p {
          // Typography
          font-size: $title-font;
        }
      }

      .mid-container {
        // Spacing
        margin: 0 0.5rem;
      }
    }

    .recommended-courses {
      // Spacing
      margin: 3rem 0;

      div {
        // Sizing
        width: 100%;
        height: 10rem;
        // Container
        border: $line solid $ucla-blue;
        overflow-y: scroll;
      }
    }

    .remaining-courses {
      // Spacing
      margin: 3rem 0;

      div {
        // Sizing
        width: 100%;
        height: 20rem;
        // Container
        border: $line solid $ucla-blue;
        overflow-y: scroll;
      }
    }
  }
}
</style>