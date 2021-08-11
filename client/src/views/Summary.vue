<template>
  <!-- 000gg0000g00000000000000gg00hggr0000000000000000g0000000rrrrgggrigg00gggh0h00000 -->
  <div id="summary" v-if="majorObj">
    <div id="summary-header">
      <hr />
      <h1>{{ majorObj.name }}</h1>
      <hr />
    </div>
    <p id="summary-subheader">
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
    <div id="courses">
      <div class="course-section">
        <h2>Course Catalog</h2>
        <div class="course-container">
          <SearchBar :onInput="handleSearch" />
          <CourseList
            :isCatalog="true"
            :contents="filteredCourseCatalog"
            :onClick="handleSelect"
          />
        </div>
      </div>
      <div class="course-section">
        <h2>Completed Courses</h2>
        <div class="course-container">
          <CourseList
            :isCompleted="true"
            :contents="completedCourses"
            :onClick="handleSelect"
            :grades="grades"
          />
        </div>
      </div>
    </div>
    <div id="misc">
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
    <p id="error-message" v-if="gradeError">
      Please ensure all grades are entered properly!
    </p>
    <button @click="handleSubmit">SUBMIT!</button>
    <div v-if="submitted" class="separator" />
    <div v-if="submitted" ref="data" id="data">
      <div id="data-headers">
        <div class="data-container">
          <h2>GPA:</h2>
          <p>{{ gpa }}</p>
        </div>
        <div class="data-container" id="mid-container">
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
      <div id="hash-code">
        <p>{{ hashCode }}</p>
        <i class="fas fa-clipboard" @click="handleCopy"></i>
      </div>
      <p id="hash-message">Copy me to save your progress!</p>
    </div>
  </div>
  <div id="loading-screen" v-else>
    <img src="@/assets/img/Summary/loading.gif" alt="" />
    <p id="loading-header">LOADING</p>
    <p id="loading-subheader">This may take up to 30 seconds</p>
  </div>
</template>

<script>
// Import global libraries
import { mapGetters } from "vuex";
import axios from "axios";

// Import local components
import CourseList from "@/components/CourseList";
import SearchBar from "@/components/SearchBar";

export default {
  name: "Summary",
  components: {
    CourseList,
    SearchBar,
  },
  computed: {
    ...mapGetters(["major", "hash"]),
  },
  data() {
    return {
      // Local state info
      courseList: [],
      courseCatalog: [],
      filteredCourseCatalog: [],
      completedCourses: [],
      recommendedCourses: [],
      remainingCourses: [],
      query: "",
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
      hashCode: "",
      // Page state
      majorObj: null,
      submitted: false,
      // Form handling
      gradeError: false,
      // Hard coded value
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
    // Custom Sorts
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
    // User functions
    handleSelect: function (course, isSelect) {
      // Handle select
      if (isSelect) {
        // Remove from master list
        let ind = this.courseCatalog.indexOf(course);
        if (ind > -1) this.courseCatalog.splice(ind, 1);
        else console.log("Something went wrong");
        // Remove from functional list, if it exists
        ind = this.filteredCourseCatalog.indexOf(course);
        if (ind > -1) this.filteredCourseCatalog.splice(ind, 1);
        this.completedCourses.push(course);
        // Handle delete
      } else {
        // Remove from completed list
        const ind = this.completedCourses.indexOf(course);
        if (ind > -1) this.completedCourses.splice(ind, 1);
        else console.log("Something went wrong");
        // Insert into master list
        this.courseCatalog.push(course);
        // Insert into functional list if necessary
        this.handleSearch(this.query);
        // Sort both source lists
        this.courseCatalog.sort(this.sortCourses);
        this.filteredCourseCatalog.sort(this.sortCourses);
      }
    },
    handleSearch: function (query) {
      // Standardize query
      this.query = query.toUpperCase();
      // Filter our master list
      const arr = this.courseCatalog.filter((course) =>
        course.name.includes(this.query)
      );
      // Set functional list to filtered list
      this.filteredCourseCatalog = [...arr];
    },
    handleSubmit: function () {
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
      // Generate the hash code
      this.handleHashGeneration();
      // Load and scroll to next section
      this.submitted = true;
    },
    // Data processing
    handleFormChecking: function () {
      // Check for invalid grades
      for (let i in this.completedCourses)
        if (this.grades[i] === "" || this.grades[i] == null) return false;
      for (let i in parseInt(this.gesCompleted))
        if (this.geGrades[i] === "" || this.geGrades[i] == null) return false;
      for (let i in parseInt(this.techBreadthsCompleted))
        if (
          this.techBreadthGrades[i] === "" ||
          this.techBreadthGrades[i] == null
        )
          return false;
      for (let i in parseInt(this.sciTechsCompleted))
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
      for (let i in parseInt(this.gesCompleted))
        if (this.geGrades[i] !== "P") {
          units += 5;
          gradePoints += 5 * gradeMapping[this.geGrades[i]];
        }
      // Get grade points for tech breadths
      for (let i in parseInt(this.techBreadthsCompleted))
        if (this.techBreadthGrades[i] !== "P") {
          units += 4;
          gradePoints += 4 * gradeMapping[this.techBreadthGrades[i]];
        }
      // Get grade points for sci techs
      for (let i in parseInt(this.sciTechsCompleted))
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
    // Hash code handling
    handleHashGeneration: function () {
      // Clear hash
      this.hashCode = "";
      // Encode the major
      let majorHash = parseInt(this.majorObj.hashNum).toString(16);
      // Pad 0s
      this.hashCode += majorHash.length === 1 ? "0" + majorHash : majorHash;
      // Encode the courses + grades
      for (let course of this.courseList) {
        // Check if course is completed
        let ind = this.completedCourses.findIndex(
          (cc) => cc.name === course.name
        );
        // Set base-32 value
        this.hashCode +=
          ind === -1
            ? "0"
            : (this.gradeLabels.indexOf(this.grades[ind]) + 16).toString(32);
      }
      // Encode GE grades
      for (let i = 0; i < this.majorObj.numGEs; i++)
        this.hashCode +=
          i + 1 > this.gesCompleted
            ? "0"
            : (this.gradeLabels.indexOf(this.geGrades[i]) + 16).toString(32);
      // Encode TB grades
      for (let i = 0; i < this.majorObj.numTechBreadths; i++)
        this.hashCode +=
          i + 1 > this.techBreadthsCompleted
            ? "0"
            : (
                this.gradeLabels.indexOf(this.techBreadthGrades[i]) + 16
              ).toString(32);
      // Encode ST grades
      for (let i = 0; i < this.majorObj.numSciTechs; i++)
        this.hashCode +=
          i + 1 > this.sciTechsCompleted
            ? "0"
            : (this.gradeLabels.indexOf(this.sciTechGrades[i]) + 16).toString(
                32
              );
    },
    handleHashRead: function () {
      const len =
        this.hash.length -
        this.majorObj.numGEs -
        this.majorObj.numTechBreadths -
        this.majorObj.numSciTechs;
      let i;
      // Error check
      if (len !== this.courseList.length)
        // Send to error screen
        this.$router
          .replace({ path: "/error" })
          .then(() => window.scrollTo(0, 0));
      // Handle normal courses
      for (i = 2; i < len; i++) {
        if (this.hash[i] === "0") continue;
        if (this.hash[i] == null)
          this.$router
            .replace({ path: "/error" })
            .then(() => window.scrollTo(0, 0));
        // Adjust course catalog
        let course = this.courseList[i - 2];
        let ind = this.courseCatalog.findIndex((cc) => cc.name === course.name);
        // Error checking
        if (ind > -1) {
          this.courseCatalog.splice(ind, 1);
          this.completedCourses.push(course);
        } else console.log("Something went wrong");
        // Adjust filtered course catalog
        ind = this.filteredCourseCatalog.findIndex(
          (cc) => cc.name === course.name
        );
        // Error checking
        if (ind > -1) this.filteredCourseCatalog.splice(ind, 1);
        else console.log("Something went wrong");
        // Extract grade
        this.grades.push(this.gradeLabels[parseInt(this.hash[i], 32) - 16]);
      }
      // Handle GEs
      for (let j = 0; j < this.majorObj.numGEs; i++, j++) {
        if (this.hash[i] === "0") continue;
        if (this.hash[i] == null)
          this.$router
            .replace({ path: "/error" })
            .then(() => window.scrollTo(0, 0));
        this.gesCompleted++;
        this.geGrades.push(this.gradeLabels[parseInt(this.hash[i], 32) - 16]);
      }
      // Handle TBs
      for (let j = 0; j < this.majorObj.numTechBreadths; i++, j++) {
        if (this.hash[i] === "0") continue;
        if (this.hash[i] == null)
          this.$router
            .replace({ path: "/error" })
            .then(() => window.scrollTo(0, 0));
        this.techBreadthsCompleted++;
        this.techBreadthGrades.push(
          this.gradeLabels[parseInt(this.hash[i], 32) - 16]
        );
      }
      // Handle STs
      for (let j = 0; j < this.majorObj.numSciTechs; i++, j++) {
        if (this.hash[i] === "0") continue;
        if (this.hash[i] == null)
          this.$router
            .replace({ path: "/error" })
            .then(() => window.scrollTo(0, 0));
        this.sciTechsCompleted++;
        this.sciTechGrades.push(
          this.gradeLabels[parseInt(this.hash[i], 32) - 16]
        );
      }
    },
    handleCopy: function () {
      const e = document.createElement("textarea");
      e.value = this.hashCode;
      document.body.appendChild(e);
      e.select();
      document.execCommand("copy");
      document.body.removeChild(e);
    },
  },
  created() {
    try {
      // Return to homepage if user refreshes on summary page to account for non-persistent Vuex state
      if (this.major === "" && this.hash === "")
        this.$router.replace({ path: "/" }).then(() => window.scrollTo(0, 0));
      // Fetch courses
      let uri = "/api/courses";
      axios.get(uri).then((response) => {
        // Map to course catalog, make sure to sort by name of course
        this.courseList = response.data.sort(this.sortCourses);
        // Get a shallow copy of the course list
        this.courseCatalog = [...this.courseList];
        this.filteredCourseCatalog = [...this.courseList];
      });
      // Fetch major
      uri =
        this.hash === ""
          ? `/api/majors/name/${this.major}`
          : `/api/majors/hash/${parseInt(
              this.hash.substring(0, 2),
              16
            ).toString(10)}`;
      axios.get(uri).then((response) => {
        this.majorObj = response.data;
        // Set courses from hash if necessary
        if (this.hash !== "") this.handleHashRead();
      });
    } catch {
      // Send to error screen
      this.$router
        .replace({ path: "/error" })
        .then(() => window.scrollTo(0, 0));
    }
  },
};
</script>

<style lang="scss" scoped>
#summary {
  // Inner spacing
  padding: calc(clamp(2rem, 1.143rem + 3.429vw, 5rem));
  // Flexbox for centering
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // Sizing
  width: 100%;

  button {
    // Inner spacing
    padding: 1rem 2rem;
    // Typography
    font-size: 1rem;
    // Button styling
    border-radius: 10px;
  }

  #summary-header {
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
      margin: 0 2rem;
      // Centering
      text-align: center;
      // Sizing
      width: 50%;
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

  #summary-subheader {
    // Typography
    font-family: $alt-font;
    font-size: $subheader-font;
    // Centering
    text-align: center;
    // Spacing
    padding: 0 2rem;
    margin-top: calc(clamp(2.5rem, 1.5rem + 4vw, 5rem));

    span {
      // Typography
      font-weight: bold;
    }
  }

  #courses {
    // Flexbox for layout
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    // Spacing
    margin: calc(clamp(2.5rem, 1.5rem + 4vw, 5rem));
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
      // Positioning for search bar
      position: relative;
    }
  }

  #misc {
    // Border
    border: $line solid $ucla-blue;
    // Sizing
    width: 60vw;
    // Spacing
    margin-bottom: calc(clamp(2.5rem, 1.5rem + 4vw, 5rem));

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

      &:last-child {
        // Remove border from bottom element
        border-bottom: none;
      }

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

  #error-message {
    // Typography
    color: red;
    font-family: $alt-font;
    // Spacing
    margin-bottom: 1rem;
  }

  #data {
    // Sizing
    width: 100%;
    // Flexbox for centering
    display: flex;
    flex-direction: column;
    align-items: center;

    #data-headers {
      // Flexbox for layout
      display: flex;
      justify-content: space-evenly;
      // Sizing
      width: 100%;

      .data-container {
        // Container
        border: $line solid $ucla-blue;
        // Inner spacing
        padding: 2rem;
        // Flexbox for layout
        display: flex;
        align-items: center;
        // Give all elements equal widths
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

      #mid-container {
        // Spacing
        margin: 0 0.5rem;
      }
    }

    .data-courses {
      // Spacing
      margin: 3rem 0;
      width: 100%;

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

    #hash-code {
      // Box styling
      border: $line solid $ucla-blue;
      // Sizing
      max-width: 20rem;
      // Container spacing
      padding: 0.5rem;
      // Typography
      font-size: $subheader-font;
      // Flexbox for layout
      display: flex;
      justify-content: space-between;
      align-items: center;
      // Spacing
      margin-bottom: 0.5rem;

      p {
        // Typography
        font-family: $alt-font;
        // Handle overflow
        overflow-x: scroll;
        // Hide scrollbar on IE and Edge
        -ms-overflow-style: none;
        // Hide scrollbar on Firefox
        scrollbar-width: none;
      }

      p::-webkit-scrollbar {
        // Hide scrollbar on Chrome, Safari, and Opera
        display: none;
      }

      .fa-clipboard {
        // Icon styling
        color: $ucla-blue;
        // Clickable
        cursor: pointer;
        // Spacing
        margin-left: 0.5rem;
      }
    }

    #hash-message {
      // Typography
      font-size: $subheader-font;
    }
  }
}

#loading-screen {
  // Sizing
  height: calc(100vh - 220px);
  width: 100%;
  // Flexbox for centering
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  #loading-header {
    // Typography
    font-size: $title-font;
    // Spacing
    margin-top: 2rem;
  }

  #loading-subheader {
    // Typography
    font-size: $header-font;
    font-family: $alt-font;
  }
}

// Data section on smaller screens
@media screen and (max-width: $large-laptop) {
  #summary {
    #data {
      .data-headers {
        // Column layout instead of row
        flex-direction: column;

        #mid-container {
          // Redo spacing for column layout
          margin: 0.5rem 0;
        }
      }
    }
  }
}

// Selection section on smaller screens
@media screen and (max-width: $laptop) {
  #summary {
    #courses {
      // Column layout instead of row
      flex-direction: column;

      .course-section {
        &:last-child {
          // Spacing
          margin-top: calc(clamp(2.5rem, 1.5rem + 4vw, 5rem));
        }

        .course-container {
          // Resize
          width: 70vw;
        }
      }
    }

    #misc {
      // Resize
      width: 70vw;
    }
  }
}
</style>