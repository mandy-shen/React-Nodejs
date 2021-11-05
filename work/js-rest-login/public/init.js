"use strict";

(function iife() {
  let people = {};

  const panelEl = document.querySelector('#panel');
  const statusEl = document.querySelector('#status');

  render(people);
  checkLogin();

  function checkLogin() {
      fetch('/api/v1/session/')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(err => Promise.reject(err));
      })
      .then(data => {
        people = data;
        statusEl.innerText = '';
        render(people);
      })
      .catch((err) => {
        people = {};
        render(people);
      });
  }

  function login() {
    const loginBtn = document.querySelector('#login-btn');
    loginBtn.addEventListener('click', () => {
      const inputEl = document.querySelector('#username');
      const username = inputEl.value;

      fetch('/api/v1/session', {
        method: 'POST',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({username: username})
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(err => Promise.reject(err));
      })
      .then(data => {
        people = data;
        statusEl.innerText = '';
        render(people);
      })
      .catch((err) => {
        statusEl.innerText = err.error
      });
    });
  }

  function logout() {
    const logoutBtn = document.querySelector('#logout-btn');
    logoutBtn.addEventListener('click', () => {
      const username = people.username;

      fetch('/api/v1/session', {
        method: 'DELETE',
        headers: new Headers({
          'content-type': 'application/json'
        }),
        body: JSON.stringify({username: username})
      })
      .then(response => {
        people = {};
        statusEl.innerText = '';
        render(people);
      });
    });
  }

  function render(people) {
    const panel = `
        <div class="logout-panel ${people.islogin? 'islogin':''}">
            ${people.username} is logged in.
            <button id="logout-btn">Logout</button>
        </div><br/>
        <div class="login-panel ${people.islogin? 'islogin':''}">
            <label for="username">User Name:</label>
            <input type="text" id="username" name="username">
            <button id="login-btn">Login</button>
        </div>
      `;
    panelEl.innerHTML = panel;
    login();
    logout();
  }


})();


