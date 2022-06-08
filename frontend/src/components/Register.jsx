import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register({ handleRegister }) {
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

    handleRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
      </form>
      <Link
        to="/sign-in"
        className="auth__link"
      >
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;