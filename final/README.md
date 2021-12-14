# TODO LIST APP
* This is an SPA, RESTful Web Application using React and Express, for any users to login/logout and store their todo list.
* Use session to keep the login users.
* They can list their tasks, add new tasks, mark completed tasks, and delete tasks.

## How To Run
1. Install Node.js (v17.0.1)
2. Open a terminal, type `npm install` to install all required library.
3. Type `npm run build` to generate the frontend codes as static codes.
4. Type `npm start` to run backend server.

## How To Use
1. Open browser, go to `http://localhost:4000`, you will see the login page.
2. Login your username to create your account. If logged in before, you don't have to log in again. It will automatically redirect to the page of your listing todo tasks.
3. On listing page, you can add new tasks, mark completed tasks, and delete tasks.
4. Click the logout button, and then you will go back to the login page.

## Library
* **Language**: JavaScript
* **Platform**: Node.js (v17.0.1), using `npm`
* **FrontEnd**: React
* **BackEnd**: Express.js
* **Library Used**:
  * cookie-parser
  * uuid
  * express
  * react
  * react-dom
  * react-scripts
