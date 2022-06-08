import React, { useState } from 'react';

function Login({ handleLogin }) {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  function handleChange(event) {
    const {name, value} = event.target;
    setState(prev => (
      {
        ...prev,
        [name]: value
      }
    ));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const {email, password} = state;

    handleLogin(email, password);
  }

  return (
  <div className="auth">
    <h2 className="auth__title">Вход</h2>
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        className="auth__input"
        placeholder="Email"
        required
        value={state.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        className="auth__input"
        placeholder="Пароль"
        required
        value={state.password}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="auth__button-submit"
      >
        Войти
      </button>
    </form>
  </div>
  );
}

export default Login;