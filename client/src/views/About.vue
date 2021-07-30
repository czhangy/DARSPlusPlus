<template>
  <div>
    <div class="section">
      <div class="section-text">
        <p class="section-header">What is DARS++?</p>
        <p class="section-content">
          <p class="section-subheader">Masterpiece. Perfection. Beautiful.</p>
          <br />
          The greatest minds of our world have called it many things, but above
          all else, <em>DARS++ is a work in progress</em>.
          <br />
          <br />
          All jokes aside, this site is home to a platform that I designed to
          help UCLA students with course planning. This application focuses on
          making all important information accessible to the student, while
          maintaining the same level of accuracy and privacy that the original
          DARS platform does. In addition, extra work has been put in to
          directly connect students with helpful resources, such as Bruinwalk
          reviews, and a rudimentary algorithm has been put in place to help
          recommend courses to students for their upcoming quarters.
        </p>
      </div>
      <div class="section-img">
        <img src="@/assets/img/About/logo.jpg" alt="" />
      </div>
    </div>
    <div class="section">
      <div class="section-text">
        <p class="section-header">How Does DARS++ Work?</p>
        <p class="section-content">
          The data that this application is based on is sourced from a read-only database.
          All contents of the database were scraped from official UCLA resources,
          most notably the course descriptions found using
          <a
            href="https://registrar.ucla.edu/academics/course-descriptions"
            target="_blank"
            >UCLA's Registrar</a
          >. This data is used in tandem with information that the user inputs
          to calculate a user's GPA and future coursework.
          <br />
          <br />
          In an effort to preserve the user's privacy, none of the data the user
          inputs is saved. Instead of forcing the user to restart every time
          they load the application, a hash code is generated for each session
          that the application can then translate at a later date. This is up to
          the user to save client-side, and I will <em>never</em> have access to
          it.
        </p>
      </div>
      <div class="section-img">
        <img src="@/assets/img/About/gears.png" alt="" />
      </div>
    </div>
    <div class="section">
      <div class="section-text">
        <p class="section-header">Project Goals</p>
        <p class="section-content">
          The main goal of this project was simple: use my amateur full-stack
          experience to create something of my own that served a purpose.
          From a frontend perspective, this project has allowed me to get
          experience in designing an application from scratch, moving from
          concept to wireframe to product. Meanwhile, I was able to refine my
          coding style and get much needed practice with responsive design. In
          terms of the backend, this project has allowed me to become much more
          familiar with Node/Express/MongoDB logic.
          <br />
          <br />
          For the future, this project aims to have completed logic for all
          majors in HSSEAS as a way to provide a bit more utility. In addition,
          I hope to add more quality-of-life changes, such as a GPA calculator
          or a more automated class-detection algorithm.
        </p>
      </div>
      <div class="section-img">
        <img src="@/assets/img/About/target.png" alt="" />
      </div>
    </div>
    <div class="section">
      <div class="section-text">
        <p class="section-header">Meet the Developer</p>
        <p class="section-content">
          Hi, I'm Charles, and I'm a Computer Science major in the UCLA Class of
          '23!
          <br />
          <br />
          I began learning web development in the summer following my freshman
          year and I'm trying to get better at it everyday. If you have any
          feedback for me, or just want to learn more about me, feel free to
          check out my personal site
          <a href="https://czhangy.io" target="_blank">here</a>.
        </p>
      </div>
      <div class="section-img">
        <img src="@/assets/img/About/me.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    this.handleStyling();
    window.addEventListener("resize", this.handleStyling);
  },
  methods: {
    handleStyling: function () {
      // Set section backgrounds + layouts + text alignment
      let arr = document.getElementsByClassName("section");
      for (let i = 0; i < arr.length; i++)
        if (i % 2 !== 0) {
          arr[i].style.background = "lightgrey";
          arr[i].style.boxShadow =
            "0px 1px 10px grey inset, 0px -1px 10px grey inset";
          arr[i].style.flexDirection = "row-reverse";
          if (window.innerWidth >= 1024) arr[i].style.textAlign = "right";
          else arr[i].style.textAlign = "left";
        }
      // Set margins

      arr = document.getElementsByClassName("section-text");
      for (let i = 0; i < arr.length; i++) {
        if (window.innerWidth >= 1024) {
          if (i % 2 !== 0) arr[i].style.marginLeft = "4rem";
          else arr[i].style.marginRight = "4rem";
        } else {
          arr[i].style.marginLeft = '0';
          arr[i].style.marginRight = '0';
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  // Container spacing
  padding: calc(clamp(2rem, 1.200rem + 3.200vw, 4rem)) calc(clamp(2rem, -0.286rem + 9.143vw, 10rem));
  // Flexbox for alignment
  display: flex;
  align-items: center;

  .section-text {
    .section-header {
      // Typography
      font-size: calc(clamp(2.1rem, 1.74rem + 1.44vw, 3rem));
      text-decoration: underline;
      letter-spacing: 2px;
    }

    .section-content {
      // Typography
      font-size: $subheader-font;
      font-family: $alt-font;
      // Spacing
      line-height: 1.6;

      .section-subheader {
        // Typography
        font-size: $header-font;
        line-height: 1.8;
        font-weight: bold;
      }

      a {
        // Remove default styling
        color: black;
      }
    }
  }

  .section-img {
    // Flexbox for centering
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      // Sizing
      max-height: calc(clamp(20rem, -7.234rem + 42.553vw, 30rem));
      max-width: calc(clamp(20rem, -7.234rem + 42.553vw, 30rem));
    }
  }
}

// Media queries
@media screen and (max-width: 1023px) {
  .section {
    .section-text {
      // Resize
      width: 100%;

      .section-header {
        // Centering
        text-align: center;
      }

      .section-content {
        .section-subheader {
          text-align: center;
        }
      }
    }

    .section-img {
      // Hide image display
      display: none;
    }
  }
}
</style>
