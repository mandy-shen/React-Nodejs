# TODO-LIST-APP
* This is an SPA, RESTful Web Application using React and Express, for any users to login/logout and store their todo list.
* Use session to keep the login users.
* They can list their tasks, add new tasks, mark completed tasks, and delete tasks.

## Required
* Node.js (v17.0.1) (LTS version), [download url](https://nodejs.org/en/download/).
* Terminal
* Web Browser (eg. Chrome)

## How To Run App
1. Open a terminal. Type `npm install` to install all required libraries.
4. Type `npm run build` to generate the frontend codes as static codes.
5. Type `PORT=80 npm start` to run entire app (backend server + static frontend).

## How To Use
1. Open web browser, go to `http://localhost:80`, you will see the login page.
2. Login your username to create your account. If logged in before, you don't have to log in again. It will automatically redirect to the page of your listing todo tasks.
3. On listing page, you can add new tasks, mark completed tasks, and delete tasks.
4. Click the logout button, and then you will go back to the login page.

## Tech Stack
* Language: `JavaScript`
* Platform: `Node.js` (v17.0.1), using `npm`
* FrontEnd: `React`
* BackEnd: `Express.js`

## Libraries
  * cookie-parser
  * uuid
  * express
  * react
  * react-dom
  * react-scripts
