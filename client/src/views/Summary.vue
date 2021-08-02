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
          <option v-for="(grade, i) of gradeLabels" :key="i">
            {{ grade }}
          </option>
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
          <option v-for="(grade, i) of gradeLabels" :key="i">
            {{ grade }}
          </option>
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
          <option v-for="(grade, i) of gradeLabels" :key="i">
            {{ grade }}
          </option>
        </select>
      </div>
    </div>
    <p class="error-message" v-if="gradeError">
      Please ensure all grades are entered properly!
    </p>
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
      <div class="data-courses">
        <h2>Recommended Courses:</h2>
        <div class="data-course-list">
          <CourseList :isRecommended="true" :contents="recommendedCourses" />
        </div>
      </div>
      <div class="data-courses">
        <h2>Courses to Take:</h2>
        <div class="data-course-list">
          <CourseList :isRemaining="true" :contents="remainingCourses" />
        </div>
      </div>
    </div>
  </div>
  <div class="loading-screen" v-else>
    <img src="@/assets/img/Summary/loading.gif" alt="" />
    <p class="loading-header">LOADING</p>
    <p class="loading-subheader">This may take up to 30 seconds</p>
  </div>
</template>

<script>
// Import global libraries
import { mapGetters } from "vuex";
import axios from "axios";

// Import local components
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
      reqCourses: null,
      grades: [],
      // Misc course state info
      gesCompleted: 0,
      techBreadthsCompleted: 0,
      sciTechsCompleted: 0,
      electivesCompleted: 0,
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
      // Form handling
      gradeError: false,
      // Preset value
      gradeLabels: [
        "A/A+",
        "A-",
        "B+",
        "B",
        "B-",
        "C+",
        "C",
        "C-",
        "D+",
        "D-",
        "F",
        "P",
      ],
    };
  },
  methods: {
    sortCourses: function (i, j) {
      if (i.name < j.name) return -1;
      else if (i.name > j.name) return 1;
      else return 0;
    },
    sortRecommendedCourses: function (i, j) {
      if (i.reqFor.length > j.reqFor.length) return -1;
      else if (i.reqFor.length < j.reqFor.length) return 1;
      else return 0;
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
      // Sort left list if necessary
      if (!isSelect) this.courseCatalog.sort(this.sortCourses);
    },
    handleCoursesSubmit: function () {
      // Check for user errors in the form
      if (!this.handleFormChecking()) {
        this.gradeError = true;
        this.submitted = false;
        return;
      }
      // Remove existing errors
      this.gradeError = false;
      // Calculate GPA
      this.handleGPACalculation();
      // Mark courses that have been completed
      this.handleCourseChecking();
      // Load and scroll to next section
      this.submitted = true;
    },
    handleFormChecking: function () {
      // Check for invalid grades
      for (let i in this.completedCourses)
        if (this.grades[i] === "" || this.grades[i] == null) return false;
      for (let i in this.gesCompleted)
        if (this.geGrades[i] === "" || this.geGrades[i] == null) return false;
      for (let i in this.techBreadthsCompleted)
        if (
          this.techBreadthGrades[i] === "" ||
          this.techBreadthGrades[i] == null
        )
          return false;
      for (let i in this.sciTechsCompleted)
        if (this.sciTechGrades[i] === "" || this.sciTechGrades[i] == null)
          return false;
      return true;
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
      for (let i in this.completedCourses)
        if (this.grades[i] !== "P") {
          units += this.completedCourses[i].units;
          gradePoints +=
            this.completedCourses[i].units * gradeMapping[this.grades[i]];
        }
      // Get grade points for GEs
      for (let i in this.gesCompleted)
        if (this.geGrades[i] !== "P") {
          units += 5;
          gradePoints += 5 * gradeMapping[this.geGrades[i]];
        }
      // Get grade points for tech breadths
      for (let i in this.techBreadthsCompleted)
        if (this.techBreadthGrades[i] !== "P") {
          units += 4;
          gradePoints += 4 * gradeMapping[this.techBreadthGrades[i]];
        }
      // Get grade points for sci techs
      for (let i in this.sciTechsCompleted)
        if (this.sciTechGrades[i] !== "P") {
          units += 4;
          gradePoints += 4 * gradeMapping[this.sciTechGrades[i]];
        }
      // Calculate average
      this.gpa = units === 0 ? "N/A" : (gradePoints / units).toFixed(2);
    },
    handleCourseChecking: function () {
      // Establish self
      const self = this;
      // Reset values
      this.units = 0;
      this.remainingCourses = [];
      // Get copy of reqCourses
      this.reqCourses = this.handleDeepCopy(this.majorObj.reqCourses);
      for (let label of this.majorObj.labels) {
        if (label === "electives") {
          this.handleElectiveChecking(this.reqCourses);
          continue;
        }
        for (let i in this.reqCourses[label]) {
          if (this.reqCourses[label][i] === null) continue;
          // Handle requirements satisfied by multiple courses
          if (Array.isArray(this.reqCourses[label][i])) {
            let complete = false;
            // Set requirement to complete
            for (let j in this.reqCourses[label][i])
              if (
                this.completedCourses.filter(function (course) {
                  return course._id === self.reqCourses[label][i][j]._id;
                }).length > 0
              ) {
                complete = true;
                this.handleTopoSort(this.reqCourses[label][i][j]);
                this.reqCourses[label][i] = null;
                break;
              }
            // Handle incomplete reqs
            if (!complete) {
              for (let option of this.reqCourses[label][i])
                this.remainingCourses.push(option);
              this.units += this.reqCourses[label][i][0].units;
            }
            // Handle regular courses
          } else {
            // Set course to complete
            if (
              this.completedCourses.filter(function (course) {
                return course._id === self.reqCourses[label][i]._id;
              }).length > 0
            ) {
              this.handleTopoSort(this.reqCourses[label][i]);
              this.reqCourses[label][i] = null;
              // Set course as incomplete
            } else {
              this.remainingCourses.push(this.reqCourses[label][i]);
              this.units += this.reqCourses[label][i].units;
            }
          }
        }
      }
      // Count remaining courses
      this.handleNumCourses();
      // Set recommended courses
      this.handleRecommendedCourses();
      // Account for misc. units
      this.units +=
        5 * (this.majorObj.numGEs - this.gesCompleted) +
        4 * (this.majorObj.numTechBreadths - this.techBreadthsCompleted) +
        4 * (this.majorObj.numSciTechs - this.sciTechsCompleted) +
        4 * (this.majorObj.numElectives - this.electivesCompleted);
      // Sort resultant array
      this.remainingCourses.sort(this.sortCourses);
    },
    // Helper functions
    handleDeepCopy: function (obj) {
      let deepCopy = Array.isArray(obj) ? [] : {};
      // Handle edge case --> don't iterate over strings
      if (typeof obj == "string") return obj;
      // Iterate through object fields
      for (let i in obj) {
        // Field is an array
        if (obj[i] != null && Array.isArray(obj[i])) {
          let arr = [];
          for (let j in obj[i]) arr.push(this.handleDeepCopy(obj[i][j]));
          deepCopy[i] = arr;
          // If field contains an object, recursive call
        } else if (obj[i] != null && typeof obj[i] === "object")
          deepCopy[i] = this.handleDeepCopy(obj[i]);
        // Primitives can be copied using =
        else deepCopy[i] = obj[i];
      }
      return deepCopy;
    },
    handleTopoSort: function (course) {
      // Iterate through the courses that course is a prereq for (course.reqFor) to remove indegrees
      for (let courseName of course.reqFor) {
        // Set flag
        let flag = true;
        // Iterate through the course types
        for (let label of this.majorObj.labels) {
          // Check flag
          if (!flag) break;
          // Iterate through an individual course type
          for (let i in this.reqCourses[label]) {
            // Ignore completed courses
            if (this.reqCourses[label][i] === null) continue;
            // For individual courses
            else if (!Array.isArray(this.reqCourses[label][i])) {
              if (this.reqCourses[label][i].name === courseName) {
                let ind = -1;
                // Iterate through prereqs to get target index
                for (let j in this.reqCourses[label][i].prereqs) {
                  if (ind !== -1) break;
                  // Handle normal case
                  if (!Array.isArray(this.reqCourses[label][i].prereqs[j])) {
                    if (this.reqCourses[label][i].prereqs[j] === course.name)
                      ind = j;
                    // Handle array edge case
                  } else {
                    for (let prereq of this.reqCourses[label][i].prereqs[j])
                      if (prereq === course.name) ind = j;
                  }
                }
                // Error checking
                if (ind > -1)
                  // Remove element from array
                  this.reqCourses[label][i].prereqs.splice(ind, 1);
                else
                  console.log(
                    `Something went wrong: ${course.name} | ${this.reqCourses[label][i].name}`
                  );
                // Use flag to terminate loop early
                flag = false;
                break;
              }
              // For grouped courses
            } else {
              // Iterate through the options
              for (let j in this.reqCourses[label][i]) {
                // Same code as individual course case
                if (this.reqCourses[label][i][j].name === courseName) {
                  const ind = this.reqCourses[label][i][j].prereqs.indexOf(
                    course.name
                  );
                  if (ind > -1)
                    this.reqCourses[label][i][j].prereqs.splice(ind, 1);
                  else
                    console.log(
                      `Something went wrong: ${course.name} | ${this.reqCourses[label][i][j].name}`
                    );
                  flag = false;
                  break;
                }
              }
            }
          }
        }
      }
    },
    handleElectiveChecking: function () {
      // Establish self
      const self = this;
      // Reset value
      this.electivesCompleted = 0;
      for (let i = 0; i < this.reqCourses.electives.length; i++)
        // Mark electives as completed
        if (
          this.completedCourses.filter(function (course) {
            return course._id === self.reqCourses.electives[i]._id;
          }).length > 0
        ) {
          this.electivesCompleted++;
          this.reqCourses.electives[i] = null;
          if (this.electivesCompleted === this.majorObj.numElectives) break;
        }
      // If elective req isn't done
      if (this.electivesCompleted !== this.majorObj.numElectives)
        for (let i = 0; i < this.reqCourses.electives.length; i++)
          if (this.reqCourses.electives[i] !== null)
            this.remainingCourses.push(this.reqCourses.electives[i]);
    },
    handleNumCourses: function () {
      // Zero this value out
      this.courses = 0;
      // Count number of reqs left unsatisfied
      for (let label of this.majorObj.labels) {
        // Electives are handled separately
        if (label === "electives") continue;
        for (let req of this.reqCourses[label])
          if (req !== null) this.courses++;
      }
      // Account for misc. courses
      this.courses +=
        this.majorObj.numGEs -
        this.gesCompleted +
        (this.majorObj.numTechBreadths - this.techBreadthsCompleted) +
        (this.majorObj.numSciTechs - this.sciTechsCompleted) +
        (this.majorObj.numElectives - this.electivesCompleted);
    },
    handleRecommendedCourses: function () {
      // Clear existing courses out
      this.recommendedCourses = [];
      // Find sources and append to recommended courses
      for (let label of this.majorObj.labels) {
        // Handle electives edge case
        if (
          label === "electives" &&
          this.electivesCompleted === this.majorObj.numElectives
        )
          continue;
        for (let req of this.reqCourses[label]) {
          // Handle array edge case
          if (Array.isArray(req))
            for (let reqCourse of req) {
              if (reqCourse !== null && reqCourse.prereqs.length === 0)
                this.recommendedCourses.push(reqCourse);
            }
          // Handle normal courses
          else if (req !== null && req.prereqs.length === 0)
            this.recommendedCourses.push(req);
        }
      }
      // Sort courses by the prerequisites they satisfy
      this.recommendedCourses.sort(this.sortRecommendedCourses);
    },
  },
  created() {
    // Return to homepage if user refreshes on summary page to account for non-persistent Vuex state
    if (this.major === "")
      this.$router.replace({ path: "/" }).then(() => window.scrollTo(0, 0));
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

  .error-message {
    // Typography
    color: red;
    font-family: $alt-font;
    // Spacing
    margin-bottom: 1rem;
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

    .data-courses {
      // Spacing
      margin: 3rem 0;

      .data-course-list {
        // Sizing
        width: 100%;
        height: 20rem;
        // Container
        border: $line solid $ucla-blue;
        overflow-y: scroll;
        // Background
        background: $ucla-blue;
      }
    }
  }
}

.loading-screen {
  // Sizing
  height: calc(100vh - 220px);
  width: 100%;
  // Flexbox for centering
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading-header {
    // Typography
    font-size: $title-font;
    // Spacing
    margin-top: 2rem;
  }

  .loading-subheader {
    // Typography
    font-size: $header-font;
    font-family: $alt-font;
  }
}
</style>