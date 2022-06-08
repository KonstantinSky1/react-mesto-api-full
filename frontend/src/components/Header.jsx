import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import headerLogo from '../images/headerLogo.svg';

function Header({ handleSignOut, email }) {
  return (
    <header className="header container">
      <img
        className="header__logo"
        src={headerLogo}
      />
      <Switch>
        <Route path="/sign-up">
          <Link
            to="/sign-in"
            className="header__link"
          >
            Войти
          </Link>
        </Route>

        <Route path="/sign-in">
          <Link
            to="/sign-up"
            className="header__link"
          >
            Регистрация
          </Link>
        </Route>

        <Route path="/">
          <div className="header__signout">
            <p className="header__email">
              {email}
            </p>
            <Link
              to="/sign-in"
              className="header__link"
              onClick={handleSignOut}
            >
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;