<template>
  <div class="summary" v-if="majorObj">
    <div class="summary-header">
      <hr />
      <h1>{{ major }}</h1>
      <hr />
    </div>
    <p class="summary-subheader">
      Please select all major-related courses that you have taken, and enter the
      grade you received below!
      <br />
      Other courses, such as GEs, Breadths, Sci. Techs, etc. are handled
      separately at the bottom.
      <br />
      <br />
      <span
        >Disclaimer: this information is not saved and the results will only be
        available to you.</span
      >
    </p>
    <div class="courses">
      <div>
        <h2>Course Catalog</h2>
        <div class="course-container">
          <CourseList
            :isCatalog="true"
            :contents="courseCatalog"
            :onClick="handleCourseSelection"
          />
        </div>
      </div>
      <div>
        <h2>Completed Courses</h2>
        <div class="course-container">
          <CourseList
            :isCompleted="true"
            :contents="completedCourses"
            :onClick="handleCourseSelection"
            :grades="grades"
          />
        </div>
      </div>
    </div>
    <div class="misc">
      <div class="field">
        <label>GEs: </label>
        <input v-model="gesCompleted" />
        <p>/ {{ majorObj.numGEs }}</p>
      </div>
      <div class="misc-grades" v-if="gesCompleted > 0">
        <label>Grade{{ gesCompleted > 1 ? "s" : "" }}:</label>
        <select
          v-for="i in Math.min(majorObj.numGEs, parseInt(gesCompleted))"
          :key="i"
          v-model="geGrades[i - 1]"
        >
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
      </div>
      <div class="field" v-if="majorObj.numTechBreadths > 0">
        <label>Tech Breadths: </label>
        <input v-model="techBreadthsCompleted" />
        <p>/ {{ majorObj.numTechBreadths }}</p>
      </div>
      <div class="misc-grades" v-if="techBreadthsCompleted > 0">
        <label>Grade{{ techBreadthsCompleted > 1 ? "s" : "" }}:</label>
        <select
          v-for="i in Math.min(
            majorObj.numTechBreadths,
            parseInt(techBreadthsCompleted)
          )"
          :key="i"
          v-model="techBreadthGrades[i - 1]"
        >
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
      </div>
      <div class="field" v-if="majorObj.numSciTechs > 0">
        <label>Sci Techs: </label>
        <input v-model="sciTechsCompleted" />
        <p>/ {{ majorObj.numSciTechs }}</p>
      </div>
      <div class="misc-grades" v-if="sciTechsCompleted > 0">
        <label>Grade{{ sciTechsCompleted > 1 ? "s" : "" }}:</label>
        <select
          v-for="i in Math.min(
            majorObj.numSciTechs,
            parseInt(sciTechsCompleted)
          )"
          :key="i"
          v-model="sciTechGrades[i - 1]"
        >
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
      </div>
    </div>
    <button @click="handleCoursesSubmit">SUBMIT!</button>
    <div v-if="submitted" class="separator" />
    <div v-if="submitted" ref="data" class="data">
      <div class="data-headers">
        <div class="data-container">
          <h2>GPA:</h2>
          <p>{{ gpa }}</p>
        </div>
        <div class="data-container mid-container">
          <h2>Remaining Courses:</h2>
          <p>{{ courses }}</p>
        </div>
        <div class="data-container">
          <h2>Remaining Units:</h2>
          <p>{{ units }}</p>
        </div>
      </div>
      <div class="recommended-courses">
        <h2>Recommended Courses:</h2>
        <div>
          <CourseList
            :isRecommended="true"
            :contents="recommendedCourses"
            :onClick="dummyFunction"
          />
        </div>
      </div>
      <div class="remaining-courses">
        <h2>Courses to Take:</h2>
        <div>
          <CourseList
            :isRemaining="true"
            :contents="remainingCourses"
            :onClick="dummyFunction"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import CourseList from "@/components/CourseList";

export default {
  name: "Summary",
  components: {
    CourseList,
  },
  computed: {
    ...mapGetters(["major"]),
  },
  data() {
    return {
      // Local state info
      courseCatalog: [],
      completedCourses: [],
      recommendedCourses: [],
      remainingCourses: [],
      grades: [],
      // Misc course state info
      gesCompleted: 0,
      techBreadthsCompleted: 0,
      sciTechsCompleted: 0,
      geGrades: [],
      techBreadthGrades: [],
      sciTechGrades: [],
      // Calculated values
      gpa: "N/A",
      courses: 0,
      units: 0,
      // Page state
      majorObj: null,
      submitted: false,
    };
  },
  methods: {
    dummyFunction: function () {
      console.log("lol");
    },
    sortCourses: function (i, j) {
      if (i.name < j.name) return -1;
      else if (i.name > j.name) return 1;
      else return 0;
    },
    handleFormChecking: function () {
      // Check for invalid grades
      for (let i in this.completedCourses)
        if (this.grades[i] === "" || this.grades[i] == null) return false;
      for (let i = 0; i < this.gesCompleted; i++)
        if (this.geGrades[i] === "" || this.geGrades[i] == null) return false;
      for (let i = 0; i < this.techBreadthsCompleted; i++)
        if (
          this.techBreadthsCompleted[i] === "" ||
          this.techBreadthsCompleted[i] == null
        )
          return false;
      for (let i = 0; i < this.sciTechsCompleted; i++)
        if (
          this.sciTechsCompleted[i] === "" ||
          this.sciTechsCompleted[i] == null
        )
          return false;
      return true;
    },
    handleCourseSelection: function (course, isSelect) {
      // Set source and destination lists
      let src = isSelect ? this.courseCatalog : this.completedCourses;
      let dest = !isSelect ? this.courseCatalog : this.completedCourses;
      // Get index of element
      const index = src.indexOf(course);
      // Remove from source
      if (index > -1) src.splice(index, 1);
      else console.log("Error in handleCourseSelection in Summary.vue");
      // Insert destination
      dest.push(course);
      console.log(course.prereqs);
      // Sort left list if necessary
      if (!isSelect) this.courseCatalog.sort(this.sortCourses);
    },
    handleCourseChecking: function () {
      // Reset values
      this.units = 0;
      this.remainingCourses = [];
      let lowerDivs = this.majorObj.reqCourses.lowerDivs;
      // Parse through lower divs and set courses to null if completed
      for (let i in lowerDivs) {
        if (!lowerDivs[i]) continue;
        if (
          this.completedCourses.filter(function (course) {
            return course._id === lowerDivs[i]._id;
          }).length > 0
        )
          this.majorObj.reqCourses.lowerDivs[i] = null;
        // Add courses that haven't been completed to their proper data sections
        else {
          this.remainingCourses.push(lowerDivs[i]);
          this.units += lowerDivs[i].units;
        }
      }
      this.courses =
        this.remainingCourses.length +
        (this.majorObj.numGEs - this.gesCompleted) +
        (this.majorObj.numTechBreadths - this.techBreadthsCompleted) +
        (this.majorObj.numSciTechs - this.sciTechsCompleted);
      this.units +=
        5 * (this.majorObj.numGEs - this.gesCompleted) +
        4 * (this.majorObj.numTechBreadths - this.techBreadthsCompleted) +
        4 * (this.majorObj.numSciTechs - this.sciTechsCompleted);
    },
    handleGPACalculation: function () {
      let units = 0,
        gradePoints = 0;
      let gradeMapping = {
        "A/A+": 4,
        "A-": 3.7,
        "B+": 3.3,
        B: 3,
        "B-": 2.7,
        "C+": 2.3,
        C: 2,
        "C-": 1.7,
        "D+": 1.3,
        D: 1,
        "D-": 0.7,
        F: 0,
      };
      // Get grade points for major courses, ignoring P grades
      for (let i in this.completedCourses) {
        if (this.grades[i] !== "P") {
          units += this.completedCourses[i].units;
          gradePoints +=
            this.completedCourses[i].units * gradeMapping[this.grades[i]];
        }
      }
      // Get grade points for GEs
      for (let i = 0; i < this.gesCompleted; i++) {
        if (this.grades[i] !== "P") {
          units += 5;
          gradePoints += 5 * gradeMapping[this.geGrades[i]];
        }
      }
      // Get grade points for tech breadths
      for (let i = 0; i < this.techBreadthsCompleted; i++) {
        if (this.grades[i] !== "P") {
          units += 4;
          gradePoints += 4 * gradeMapping[this.techBreadthGrades[i]];
        }
      }
      // Get grade points for sci techs
      for (let i = 0; i < this.sciTechsCompleted; i++) {
        if (this.grades[i] !== "P") {
          units += 4;
          gradePoints += 4 * gradeMapping[this.sciTechGrades[i]];
        }
      }
      // Calculate average
      this.gpa = units === 0 ? "N/A" : (gradePoints / units).toFixed(2);
    },
    handleCoursesSubmit: function () {
      // Check for user errors in the form
      if (!this.handleFormChecking()) {
        alert("Fuck you");
        return;
      }
      // Mark courses that have been completed
      this.handleCourseChecking();
      // Calculate GPA
      this.handleGPACalculation();
      // Load and scroll to next section
      this.submitted = true;
    },
  },
  created() {
    // Fetch courses
    let uri = "/api/courses";
    axios.get(uri).then((response) => {
      // Map to course catalog, make sure to sort by name of course
      this.courseCatalog = response.data.sort(this.sortCourses);
    });
    // Fetch major
    uri = `/api/majors/${this.major}`;
    axios.get(uri).then((response) => {
      this.majorObj = response.data;
    });
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

  .summary-subheader {
    // Typography
    font-family: $alt-font;
    font-size: $subheader-font;
    // Centering
    text-align: center;
    // Spacing
    padding: 0 5rem;
    margin-top: 5rem;

    span {
      // Typography
      font-weight: bold;
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
      width: 40vw;
      // Visualize container
      border: $line solid $ucla-blue;
      // Scroll for overflowing courses
      overflow-y: scroll;
      // Background
      background: $ucla-blue;
    }
  }

  .misc {
    // Border
    border: $line solid $ucla-blue;
    // Sizing
    width: 40%;
    // Spacing
    margin-bottom: 5rem;

    .field {
      // Flexbox for layout
      display: flex;
      align-items: center;
      // Typography
      font-size: $subheader-font;
      // Spacing
      margin: 2rem;

      label {
        // Spacing
        margin-right: 1rem;
      }

      input {
        // Sizing
        width: 2rem;
        // Spacing
        margin-right: 0.7rem;
        // Typography
        font-family: $alt-font;
        font-size: $subheader-font;
        // Centering
        text-align: center;
      }

      p {
        // Typography
        font-family: $alt-font;
      }
    }

    .misc-grades {
      // Flexbox for alignment
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      // Container styling
      background: lighten(lightgrey, 10);
      border-top: $line solid $ucla-blue;
      border-bottom: $line solid $ucla-blue;
      // Inner spacing
      padding: 1rem 0;

      label {
        // Typography
        font-weight: bold;
        font-family: $alt-font;
      }

      select {
        // Typography
        font-family: $alt-font;
        font-size: 1rem;
      }
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