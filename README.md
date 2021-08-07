# Sticker!Me 
<img src="./client/src/assets/images/logo.png" height="100" width="100" />  

## Instruction to run for development:
You will have to run the front-end and back-end side seperately.  
**For the front-end:**
1. Open a new instance of command line
2. Enter the command `cd client`.
3. Enter the command `npm i`.
4. Enter the command `npm run dev`
5. You can now access the front-end (to see the website) through `http://localhost:8080/`  

**For the back-end: (skip steps 4-5 if you've already done them atleast 1 time)**
1. Open a new instance of command line
2. Enter the command `cd server`.
3. Enter the command `npm i`.
4. Make sure that you have <a href="https://www.mongodb.com/try/download/community">mongodb</a> installed in your computer
5. To insert the default dummy data, enter the command `npm run db-insert`.
6. Enter the command `npm run dev`
7. You can now access the back-end data (to access the database) through `http://localhost:3000/api/`  
You can view the users in `http://localhost:3000/api/users`

## Default Credentials
| username      | password   |
| ------------- | ---------- |
| moderator     | password   |
| customer      | password   |
| john          | password   |
| kyle          | password   |
| jacob         | password   |

## Tech Stack:
| Area                  | Tool                    |
| --------------------- | ----------------------- |
| Programming Languages | HTML, CSS, Javascript   |
| Framework             | ReactJS                 |
| Front-End Libraries   | Axios, ESLint, Prettier |
| Back-End Libraries    | ExpressJS, Mongoose     |
| Database              | MongoDB                 |

## Development Notes: 
### Coding Standards
ReactJS (JSX): https://github.com/airbnb/javascript/tree/master/react  
Javascript: https://github.com/airbnb/javascript  
CSS: https://github.com/airbnb/css  

### Folder Structure
#### client (contains all the code for the front-end part of the project)
- src  
  - assets  
    - images (contains all the images to be used in the project)  
    - styles (contains all the css code)  
      - components (contains the css code for the components)
      - pages (contains the css code for the pages)  
      - App.css (css code for App.jsx)
      - index.css (css code for index.jsx)
  - components (contains the component which is a subset feature of a page ex. ImageButton, ClassList, etc)  
    `NOTE: every single file here will be imported in the pages folder`
  - pages (contains the pages of the project)
  - services (contains the callable axios for accessing the back-end)  
    `NOTE: each service should only access 1 database. For example, UserService should only be able to access the Users database`
  - utils (contains the utitilities/helpers for the front-end)
  - App.jsx (contains the routing logic for the project)
  - index.jsx (connects App.jsx to HTML)
- public (contains the built application)  
  `NOTE: the files here will be the ones used for deployment` 
- package.json (contains the details of the project for the front-end)

#### server (contains all the code for the back-end part of the project)
- controllers (contains the functions to access the database)
- helpers (contains the helper functions such as inserting default data to the database, and dropping the database)
- models (contains the mongoose schema and database.js) 
  - database.js (contains the commands for creating, reading, updating, and deleting in the database) 
- routes
  - routes.js (contains all the routing for calling a specific controller function) 
- modules (contains the middlewares)
- index.js (the main file which contains the code responsible for every back-end functionality)
- package.json (contains the details of the project for the back-end)

## Features:
