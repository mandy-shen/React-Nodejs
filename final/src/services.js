/*
 this file is for frontend listing all the fetch API to backend.

 use Promise to make：
  1. improves code readability.
  2. better handling of asynchronous operations.
  3. Better flow of control definition in asynchronous logic.
  4. better error handling.
 */

  // fetch backend api to create certain task
  function fetchAddTodo(task) {
    return fetch('/api/todos', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( { task } ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // fetch backend api to delete certain task
  function fetchDeleteTodo(id) {
    return fetch(`/api/todos/${id}`, {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // fetch backend api to update certain task via patch
  function fetchUpdateTodo( id, todoUpdates ) {
    return fetch(`/api/todos/${id}`, {
      method: 'PATCH',
      headers: new Headers({
        'content-type': 'application/json',
      }),
      body: JSON.stringify( todoUpdates ),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // fetch backend api to get todos
  function fetchTodos() {
    return fetch('/api/todos')
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // fetch backend api to get sessions
  function fetchSession() {
    return fetch('/api/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // fetch backend api to delete session
  function fetchLogout() {
    return fetch('/api/session', {
      method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // fetch backend api to create session
  function fetchLogin(username) {
    return fetch('/api/session', {
      method: 'POST',
      headers: new Headers({
        'content-type': 'application/json'
      }),
      body: JSON.stringify({ username }),
    })
    .catch( () => Promise.reject({ error: 'networkError' }) )
    .then( response => {
      if (response.ok) {
        return response.json();
      }
      return response.json()
      .catch( error => Promise.reject({ error }) )
      .then( err => Promise.reject(err) );
    });
  }

  // export all fetch methods for outer files to import
  module.exports = {
    fetchAddTodo,
    fetchDeleteTodo,
    fetchUpdateTodo,
    fetchTodos,
    fetchSession,
    fetchLogout,
    fetchLogin,
  };
