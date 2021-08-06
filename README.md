# DARS++

## Project Summary

DARS++ is a course planning platform intended for use by UCLA students. It aims to provide convenient access to the most important facets of course planning, presented through a user-friendly interface designed using Vue, with all data being handled by Node/Express/MongoDB.

The most up-to-date version of DARS++ is currently deployed at: https://darsplusplus.herokuapp.com/.



## Tools Used
<img src="https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D" /> <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />   <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" />  <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" />  <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />



## Project Status

This project is currently under development. All basic logic and functionality is implemented, however users are only capable of planning courses for the Computer Science major. Further data collection is needed to expand the application to other majors.



#### To Do:

- [ ] Implement a hash code system to allow users to save their progress
- [ ] Improve page redirection for better UX
- [ ] Fix scroll behavior
- [ ] Collect further data to enable users to access all HSSEAS majors



## Installation and Setup

Tools Required:

- NPM
- Node



1. Clone the repository onto your local machine:

   ```bash
   git clone https://github.com/czhangy/darsplusplus.git
   ```

2. Install all required dependencies:

   ```bash
   npm i
   ```

3. Start the server:

   ```bash
   npm run server
   ```

4. Start the application:

   ```bash
   npm run client
   ```

5. Open the application in your browser:

   `https://localhost:8080`

   

## Project Reflection

This project was intended as a way for me to test my own web development abilities over the opening months of Summer '21. It was inspired by the ongoing struggles of classmates around me to plan and manage their courseloads over the school year. I chose to set off to develop a platform to both help those struggling students, and learn more about building a full-stack application from the ground up.



This project was originally intended to cover the full scope of majors at UCLA, however, the complexity of major requirements and course listings made data collection too burdensome. As a result, I quickly reduced my scope to cover the majors in the School of Engineering, allowing me to spend less time sifting through UCLA major documentation, and more time building. 



This project centers around the MEVN stack, where Vue is used to create a user-friendly, responsive interface and MongoDB is used to act as a read-only database from which I can pull data from using Node and Express. Much of this project's workload was centered in the backend of the code, and I believe undertaking this project gave me a very valuable perspective on how full-stack applications operate as a whole.



The largest challenge I ran into was data collection, as UCLA has no consistent source of major or course data. Other than that, the user's privacy also played a significant role in the development of the project, as it would be unreasonable to ask users to save sensitive data, such as grades and GPA, in a database under my control.

